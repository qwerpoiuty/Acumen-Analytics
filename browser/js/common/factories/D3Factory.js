app.factory('d3factory', function() {
    var svg;
    d3.makeBarGraph = function(el, json, w, h) {
        //define the margins for your graph
        var margin = {
                top: 20,
                right: 20,
                bottom: 30,
                left: 40
            },
            width = w - margin.left - margin.right,
            height = h - margin.top - margin.bottom;

        //define the various axis. this can probably be converted into a service in the future
        var x0 = d3.scale.ordinal()
            .rangeRoundBands([0, width], .1)

        var x1 = d3.scale.ordinal()

        var y = d3.scale.linear()
            .range([height, 0])

        var xAxis = d3.svg.axis()
            .scale(x0)
            .orient('bottom')

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient('left')


        var factor = 400 / Math.max.apply(Math, array)

        svg = d3.select(el)
            .append("div")
        //container class to make it responsive
        .classed("svg-container", true)
            .append("svg")
        //responsive SVG needs these 2 attributes and no width and height attr
        .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0" + " " + 2 * w + " " + h)
        //class to make it responsive
        .classed("svg-content-responsive", true)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-5, 0]).html(function(d) {
                return "<span><strong>" + d.value + "</strong></span>"
            });
        svg.call(tip)

        var data = json;
        // var intervals = d3.keys(data[])

        svg.selectAll('rect')
            .data(array)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("id", function(d, i) {
                return i
            })
            .attr("x", function(d, i) {
                return i * (w / array.length);
            })
            .attr("y", function(d) {
                return h - (d * factor)
            })
            .attr("width", w / array.length)
            .attr("height", function(d) {
                return d * factor;
            })
            .attr("fill", function(d) {

                return "rgb(0,0,0)";
            })
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide)
    }
    return d3
})