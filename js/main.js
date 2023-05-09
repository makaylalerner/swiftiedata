import { createTimeline } from './timeline.js'
import { createBarChart } from './barchart.js'
import { BubbleChart } from './bubbles.js'

const eraColors = {
    Debut: "#97e9c1",
    Lover: "#8a5066",
    SpeakNow: "#813c60",
    Fearless: "#d9c78f",
    Evermore: "#7e5c43",
    Folklore: "#bababa",
    Reputation: "#8a8",
    Red: "#a02b48",
    "1989": "#d6e9ff",
    TaylorsVersion: "#907763",
    Midnights: "#87a6bb"
}

d3.csv(
    "https://gist.githubusercontent.com/makaylalerner/6e13282b20c8c4b11355ecd583e47f2e/raw/b7245f5122c539eafd29beb02bf6f5dea37456db/data_taylors_version2.csv", 
    (d) => {
        d.year = new Date(d.year); 
        return d;
    }
    ).then((data) => {
    const updateBarChart = createBarChart('#bar-chart', data, eraColors); 
    
    const updateBubbleChart = (criteria, era) => {
        const chart = BubbleChart(
            data.filter((d) => (era) ? d.era === era : true),
            {
                name: (d) => parseFloat(d[criteria]).toFixed(2),
                title: (d) => d.normalized_song_name,
                value: (d) => d.popularity, 
                group: (d) => d.era,
                groups: Object.keys(eraColors),
                colors: Object.values(eraColors),
            }
        )
        const el = document.getElementById("bubble-chart-container")
        el.innerHTML = ''
        el.appendChild(chart);
    }

    const getCurrentCriteria = () => (
        d3.select('#criteria-select').property('value')
    )

    const updateCriteriaCharts = (criteria, era) => {
        updateBubbleChart(criteria, era)
        updateBarChart(criteria, era)
    }

    updateCriteriaCharts(getCurrentCriteria(), null)

    // event listener for dropdown menu

    d3.select('#criteria-select').on('change', function() {
        const criteria = this.value;
        updateCriteriaCharts(criteria);
    });

    // updates bar chart when timeline point is called 

    createTimeline(
        '#timeline',
        data,
        eraColors,
        {
            onSetEra: (era) => {
                updateCriteriaCharts(getCurrentCriteria(), era)
            },
            onClearEra: () => {
                updateCriteriaCharts(getCurrentCriteria(), null)
            }
        }
    )
});