

export function createTimeline(
    containerSelector,
    data,
    colors,
    {
        onSetEra,
        onClearEra,
    }
) {
    const nestedData = d3.group(data, (d) => d.era);
    const timelineData = Array.from(nestedData, ([era, values]) => {
      return {
        era: era,
        year: d3.min(values, (d) => new Date(d.year)),
      };
    });

    timelineData.sort((a,b) => a.year - b.year);

    // grouping to avoid overlapping 
const yearGroup = d3.group(timelineData, (d) => d.year);
  yearGroup.forEach((values, key) => {
    values.forEach((d, i) => {
      d.index = i;
    });
  });
  
    // Create timeline and other components

  const margin = { top: 20, right: 30, bottom: 20, left: 0 };
  const width = 300 - margin.left - margin.right;
  const height = 1000 - margin.top - margin.bottom;

  const yScale = d3.scaleLinear().range([0, height]);  

  yScale.domain([0, timelineData.length -1]);

  const svg = d3
    .select("#timeline")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// add vertical line 
    svg
    .append("line")
    .attr("x1", width / 2)
    .attr("y1", 0)
    .attr("x2", width / 2)
    .attr("y2", height);

// add circles along the line 
  svg
    .selectAll(".timeline-point")
    .data(timelineData)
    .join("circle")
    .attr("class", "timeline-point")
    .attr("fill", (d) => colors[d.era])
    .attr("r", 8)
    .attr("cx", width / 2)
    .attr("cy", (d, i) => yScale(i) + d.index*10)
    .on("click", ({ target }, d) => {
        if (target.classList.contains("active-era")) {
            target.classList.remove("active-era");
            onClearEra();
        } else {
            d3.selectAll(".active-era").classed("active-era", false)
            target.classList.add("active-era");
            onSetEra(d.era);
        }
    })
    .on("mouseover", (event) => {
        event.target.setAttribute("r", 10);
    })
    .on("mouseleave", (event) => {
        event.target.setAttribute("r", 8);
    })
   
    // era labels 
    svg
        .selectAll(".era-label")
        .data(timelineData)
        .join("text")
        .attr("class", "era-label")
        .attr("x", (d) => width / 2 + 15)
        .attr("y", (d, i) => yScale(i) + d.index * 10)
        .text((d) => d.era);

    // year labels 
    svg 
        .selectAll(".year-label")
        .data(timelineData)
        .join("text")
        .attr("class", "year-label")
        .attr("x", (d) => width / 2 + 15)
        .attr("y", (d, i) => yScale(i) + 15 + d.index*10 )
        .text((d) => d3.timeFormat("%B %Y")(d.year));

}

