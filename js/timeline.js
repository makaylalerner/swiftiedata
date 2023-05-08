/* d3.csv("https://gist.githubusercontent.com/makaylalerner/7e710a423a5157167c1b5b044ef85778/raw/ea194d1e0701346e62d2d5731c1dc8996a6eaa23/data_taylors_version2.csv").then((data) => {
  createTimeline(data);
}); */

export function createTimeline(data) {
    const nestedData = d3.group(data, (d) => d.era);
    const timelineData = Array.from(nestedData, ([era, values]) => {
      return {
        era: era,
        year: d3.min(values, (d) => new Date(d.year)),
      };
    });
  
    // Create timeline and other components

  const margin = { top: 20, right: 20, bottom: 20, left: 100 };
  const width = 500 - margin.left - margin.right;
  const height = 1000 - margin.top - margin.bottom;

  const xScale = d3.scaleTime().range([0, width]);
  const yScale = d3.scaleBand().range([0, height]);

  xScale.domain(d3.extent(data, (d) => d.year));
  yScale.domain(data.map((d) => d.era));

  const svg = d3
    .select("#timeline")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  svg
    .selectAll(".timeline-point")
    .data(data)
    .join("circle")
    .attr("class", "timeline-point")
    .attr("r", 5)
    .attr("cx", (d) => xScale(d.year))
    .attr("cy", (d) => yScale(d.era))
    .on("click", (event, d) => {
      // Open another data view or do something else
      console.log(d); })
      .append("g")
      .attr("transform", `translate(0, $[height})`)
}

