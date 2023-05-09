import { createTimeline } from './timeline.js'
import { createBarChart } from './barchart.js'
import { BubbleChart } from './bubbles.js'


d3.csv(
    "https://gist.githubusercontent.com/makaylalerner/6e13282b20c8c4b11355ecd583e47f2e/raw/b7245f5122c539eafd29beb02bf6f5dea37456db/data_taylors_version2.csv", 
    (d) => {
        d.year = new Date(d.year); 
        return d;
    }
    ).then((data) => {
    const updateTimeline = createTimeline('#timeline', data); 
    const updateBarChart = createBarChart('#bar-chart', data); 
    const chart = BubbleChart(data, {
        name: (d) => d.era, 
        value: (d) => d.popularity, 
        group: (d) => d.era
    })

    // init bar chart using popularity as default 

    updateBarChart('popularity'); 

    // event listener for dropdown menu

    d3.select('#criteria-select').on('change', function() {
        const criteria = this.value;
        updateBarChart(criteria);
    }); 

    // event listener for slider 

    d3.select('#era-slider').on('input', function() {
        const eraIndex = +this.value; 
        const era = eraIndex > 0 ? data[eraIndex - 1].era : null; 
        updateBarChart(d3.select('#criteria-select').value, era); 

    d3.select('#era-label').text(era ? era : 'All'); 
    }); 

    // updates bar chart when timeline point is called 

    updateTimeline((era) => {
        const selectedIndex = data.findIndex((d) => d.era === era); 
        d3.select('#era-slider').property('value', selectedIndex + 1); 
        d3.select('#era-label').text(era); 
        updateBarChart('popularity', era); 
    });

    document.getElementById("bubble-chart-container").appendChild(chart);

});