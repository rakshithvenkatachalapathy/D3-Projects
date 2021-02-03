< !--reference example
https://bl.ocks.org/jasondavies/1341281
https://www.d3-graph-gallery.com/graph/parallel_custom.html 
-->

< !DOCTYPE html >
    <meta charset="utf-8">

        <!-- Load d3.js -->
<script src="https://d3js.org/d3.v4.js"></script>

        <!-- Create a div where the graph will take place -->
<div id="my_dataviz"></div>
        <script>

    // set the dimensions and margins of the graph
            var margin = {top: 30, right: 10, bottom: 10, left: 0 },
        width = 1000 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Parse the Data
    d3.csv("cars.csv", function (data) {
                data = data.slice(0, 500)
        dimensions = ["Dimensions.Height", "Dimensions.Length", "Dimensions.Width", "Engine Information.Engine Statistics.Horsepower"]
        var y = {}
        for (i in dimensions) {
                name = dimensions[i]
            y[name] = d3.scaleLinear()
                .domain(d3.extent(data, function (d) { return +d[name]; }))
                .range([height, 0])
        }

        x = d3.scalePoint()
            .range([0, width + 200])
            .padding(1)
            .domain(dimensions);

        function path(d) {
            return d3.line()(dimensions.map(function (p) { return [x(p), y[p](d[p])]; }));
        }

        svg
            .selectAll("myPath")
            .data(data)
            .enter().append("path")
            .attr("d", path)
            .style("fill", "none")
            .style("stroke", "#80b7e0")
            .style("opacity", 0.5)

        svg.selectAll("myAxis")
            .data(dimensions).enter()
            .append("g")
            .attr("transform", function (d) {
                return "translate(" + x(d) + ")";
            })
            .each(function (d) {d3.select(this).call(d3.axisLeft().scale(y[d])); })
            .append("text")
            .style("text-anchor", "middle")
            .attr("y", -9)
            .text(function (d) { return d; })
            .style("fill", "black")

        svg.append("text")
            .attr("y", height + 6)
            .attr("x", width - 100)
            .attr("text-anchor", "end")
            .attr("stroke", "black")
            .text("Parallel coordinate chart for car height, length,width and engine type")
    })
</script>