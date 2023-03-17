async function loadData(url) {
    const data = await d3.csv(url)
    return prepData(data)
}

function loadChart(id) {
    return d3.select(`#${id}`)
}

function setCityCount(number) {
    d3.select('#city-count').text(number)
}

function prepData(data) {
    return data
        .map(({ population, x, y, area, ...rest }) => ({ population: +population, x: +x, y: +y, area: +area, ...rest }))
}

function getScales(data) {
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, ({ population }) => population)])
        .range([30, 690])

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, ({ area }) => area)])
        .range([540, 10])

    return { xScale, yScale }
}

function drawCircles(data, chart, baseRadius = 4, sizeCutOff = 1_000_000) {
    const { xScale, yScale } = getScales(data)
    chart.selectAll()
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'city')
        .attr('cx', ({ population }) => xScale(population))
        .attr('cy', ({ area }) => yScale(area))
        .attr('r', ({ population }) => (population > sizeCutOff ? baseRadius * 2 : baseRadius))
        .attr('fill', 'red')
        .attr('stroke', 'black')
        .attr('stroke-width', 1)
    
    const xAxis = d3.axisBottom(xScale)
    const yAxis = d3.axisLeft(yScale)
    xAxis(chart.append('g').attr('transform', 'translate(0, 540)'))
    yAxis(chart.append('g').attr('transform', 'translate(30, 0)'))
    chart.selectAll()
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'city-label')
        .attr('x', ({ population }) => xScale(population))
        .attr('y', ({ area }) => yScale(area) - 10)
        .text(({ city }) => city)
}

async function main() {
    const chart = loadChart('chart')
    const cities = await loadData(
        'https://raw.githubusercontent.com/makaylalerner/d3_csvs/master/cities_and_population_area.csv'
    )

    setCityCount(cities.length)
    drawCircles(cities, chart)
}

main()