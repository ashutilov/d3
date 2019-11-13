import * as d3 from "d3";
import quotes from "../data/quotes";
import birthData from "../data/birth";
import birthData2011 from "../data/birthData2011";

let color = {
  G: "#3cff00",
  PG: "#f9ff00",
  "PG-13": "#ff9000",
  R: "#ff0000"
};

d3.select("#quotes")
  .style("list-style", "none")
  .selectAll("li")
  .data(quotes)
  .enter()
  .append("li")
  .text(d => d.quote)
  .style("padding", "10px")
  .style("margin", "15px")
  .style("font-size", "18px")
  .style("background-color", d => color[d.rating])
  .style("border-radius", "8px");

console.log(d3.selectAll("p").data([1, 2, 3, 4]));

/* range birth block */
// let minYear = d3.min(birthData, d => d.year);
// let maxYear = d3.max(birthData, d => d.year);
// let width = 600;
// let height = 600;
// let barPadding = 10;
// let numBars = 10;
// let barWidth = width / numBars - barPadding;
// let maxBirths = d3.max(birthData, d => d.births);
// let yScale = d3
//   .scaleLinear()
//   .domain([0, maxBirths])
//   .range([height, 0]);

// d3.select("#range")
//   .property("min", minYear)
//   .property("max", maxYear)
//   .property("value", minYear);

// d3.select("#chart-area")
//   .attr("width", width)
//   .attr("height", height)
//   .selectAll("rect")
//   .data(birthData.filter(d => d.year === minYear))
//   .enter()
//   .append("rect")
//   .attr("width", barWidth)
//   .attr("height", d => height - yScale(d.births))
//   .attr("y", d => yScale(d.births))
//   .attr("x", (d, i) => (barWidth + barPadding) * i)
//   .attr("fill", "orange");

// d3.select("#range").on("input", () => {
//   var year = +d3.event.target.value;
//   d3.selectAll("rect")
//     .data(birthData.filter(d => d.year === year))
//     .attr("height", d => height - yScale(d.births))
//     .attr("y", d => yScale(d.births));
// });

/* scatterplots block */
let width = 500;
let height = 500;
let padding = 30;

let yScale = d3
  .scaleLinear()
  .domain(d3.extent(birthData2011, d => d.lifeExpectancy))
  .range([height - padding, padding]);

let xScale = d3
  .scaleLinear()
  .domain(d3.extent(birthData2011, d => d.births / d.population))
  .range([padding, width - padding]);

let xAxis = d3
  .axisBottom(xScale)
  .tickSize(-height + 2 * padding)
  .tickSizeOuter(0);

let yAxis = d3
  .axisLeft(yScale)
  .tickSize(-width + 2 * padding)
  .tickSizeOuter(0);

let colorScale = d3
  .scaleLinear()
  .domain(d3.extent(birthData2011, d => d.population / d.area))
  .range(["lightgreen", "black"]);

let radiusScale = d3
  .scaleLinear()
  .domain(d3.extent(birthData2011, d => d.births))
  .range([2, 40]);

d3.select("#chart-area-2")
  .append("g")
  .attr("transform", "translate(0, " + (height - padding) + ")")
  .call(xAxis);

d3.select("#chart-area-2")
  .append("g")
  .attr("transform", "translate(" + padding + ",0)")
  .call(yAxis);

d3.select("#chart-area-2")
  .attr("width", width)
  .attr("height", height)
  .selectAll("circle")
  .data(birthData2011)
  .enter()
  .append("circle")
  .attr("cx", d => xScale(d.births / d.population))
  .attr("cy", d => yScale(d.lifeExpectancy))
  .attr("fill", d => colorScale(d.population / d.area))
  .attr("r", d => radiusScale(d.births));

d3.select("#chart-area-2")
  .append("text")
  .attr("x", width / 2)
  .attr("y", height - padding)
  .attr("dy", "1.5em")
  .style("text-anchor", "middle")
  .text("Birth per Capital");

d3.select("#chart-area-2")
  .append("text")
  .attr("x", width / 2)
  .attr("y", padding)
  .style("text-anchor", "middle")
  .style("font-size", "1.5em")
  .text("Data on Births by Country in 2011");

d3.select("#chart-area-2")
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("x", - height / 2)
  .attr("y", padding)
  .attr("dy", "-1.1em")
  .style("text-anchor", "middle")
  .text("Life Expectancy");
