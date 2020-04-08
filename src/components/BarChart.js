import React, { useEffect } from "react";
import * as d3 from "d3";

const BarChart = ({ leagueLeadersOffense }) => {
  useEffect(() => {
    let dataToChart = [];
    leagueLeadersOffense.totaloffense.map((x) => dataToChart.push(x.teamStat));

    drawBarChart(dataToChart);
  }, []);

  const drawBarChart = (data) => {
    const canvasHeight = 400;
    const canvasWidth = 600;
    const scale = 20;

    const svgCanvas = d3
      .select("#canvas")
      .append("svg")
      .attr("width", canvasWidth)
      .attr("height", canvasHeight)
      .style("border", "1px solid pink");

    svgCanvas
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("width", 40)
      .attr("height", (d) => d * 0.9)
      .attr("fill", "orange")
      .attr("x", (d, i) => i * 45)
      .attr("y", (d) => canvasHeight - d * 0.9);

    svgCanvas
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("x", (d, i) => i * 45 + 5)
      .attr("y", (d, i) => canvasHeight - d / 10 - 10)
      .text((d) => d);
  };

  return <div id="canvas"></div>;
};

export default BarChart;
