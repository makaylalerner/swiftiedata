export function createBarChart(containerSelector, data) {
    const margin = {top: 30, right: 60, bottom: 30, left: 10} 
    const width = 600 - margin.left - margin.right; 
    const height = 200 - margin.top - margin.bottom; 

    const svg = d3
    .select("#bar-chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`); 

    const xScale = d3.scaleLinear().range([0, width]);
    const yScale = d3.scaleBand().range([0, height]).padding(0.3);

    function updateBarChart(criteria, era) {
        let filteredData = era ? data.filter((d) => d.era === era) : data;

        if (filteredData.length === 0) {
            console.error("No songs found for selected era")
            return;
        }

        if (!criteria) {
            console.error("No criteria set for selected era")
        }

        const topSongs = filteredData
        .sort((a, b) => b[criteria] - a[criteria])
        .slice(0,3);

        xScale.domain([0, d3.max(topSongs, (d) => d[criteria])]); 
        yScale.domain(topSongs.map((d) => d.normalized_song_name)); 

        // make the bars 

        console.log(criteria)
        const bars = svg.selectAll(".bar").data(topSongs, (d) => d.normalized_song_name); 
        bars
            .enter() 
            .append("rect")
            .attr("class", "bar")
            .merge(bars)
            .transition()
            .duration(1000)
            .attr("x", 0)
            .attr("y", (d) => yScale(d.normalized_song_name))
            .attr("width", (d) => xScale(d[criteria] || 0))
            .attr("height", yScale.bandwidth()); 

        bars.exit().remove(); 

        // song labels 
        
        const songLabels = svg.selectAll(".song-label").data(topSongs, (d) => d.normalized_song_name); 

        songLabels 
            .enter()
            .append("text")
            .attr("class", "song-label") 
            .merge(songLabels)
            .transition()
            .duration(1000)
            .attr("x", 5)
            .attr("y", (d) => yScale(d.normalized_song_name) + yScale.bandwidth() / 2)
            .attr("dy", ".35em")
            .text((d) => d.normalized_song_name); 
        
        songLabels.exit().remove(); 

        // value labels 

        const valueLabels = svg.selectAll(".value-label").data(topSongs, (d) => d.normalized_song_name); 

        valueLabels
            .enter()
            .append("text")
            .attr("class", "value-label")
            .merge(valueLabels)
            .transition()
            .duration(1000)
            .attr("x", (d) => xScale(d[criteria]) + 5)
            .attr("y", (d) => yScale(d.normalized_song_name) + yScale.bandwidth() / 2)
            .attr("dy", ".35em")
            .text((d) => parseFloat(d[criteria]).toFixed(2)); 

        valueLabels.exit().remove(); 
    }
    return updateBarChart;


    }
