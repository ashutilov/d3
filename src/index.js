import * as d3 from "d3";
import quotes from "../data/quotes";
import birthData from "../data/birth";

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
let minYear = birthData[0].year;
let maxYear = birthData[birthData.length - 1].year;
let width = 600;
let height = 600;
let barPadding = 10;
let numBars = 10;
let barWidth = width / numBars - barPadding;

d3.select("#range")
  .property("min", minYear)
  .property("max", maxYear)
  .property("value", minYear);

d3.select("#chart-area")
  .attr("width", width)
  .attr("height", height)
  .selectAll("rect")
  .data(birthData.filter(d => d.year === minYear))
  .enter()
  .append("rect")
  .attr("width", barWidth)
  .attr("height", d => (d.births / 2.5e6) * height)
  .attr("y", d => height - (d.births / 2.5e6) * height)
  .attr("x", (d, i) => (barWidth + barPadding) * i)
  .attr("fill", "orange");

d3.select("#range").on("input", () => {
  var year = +d3.event.target.value;
  d3.selectAll("rect")
    .data(birthData.filter(d => d.year === year))
    .attr("height", d => (d.births / 2.5e6) * height)
    .attr("y", d => height - (d.births / 2.5e6) * height);
});
