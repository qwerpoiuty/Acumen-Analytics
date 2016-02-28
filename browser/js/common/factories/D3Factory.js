app.factory('d3factory', function() {
    var svg;
    d3.makeGraph = function(el, json, w, h) {
        //decifer the format of the data
        var data = JSON.parse(json);
        if (!data[0].isArray) {
            var key = Object.keys(data[0])[0]
            var val = Object.keys(data[0])[1]
        }
        //define the margins for your graph
        var margin = {
                top: 20,
                right: 20,
                bottom: 50,
                left: 60
            },
            width = w - margin.left - margin.right,
            height = h - margin.top - margin.bottom;




        //creating a chart switch statement for easy code management
        switch (el) {
            case "bar":
                //creating a bar chart

                // creates a responsive section for the svg
                svg = d3.select('graph')
                    .append("div")
                    .classed("svg-container", true)
                    .append("svg")
                    .attr("preserveAspectRatio", "xMinYMin meet")
                    .attr("viewBox", "0 0" + " " + w + " " + h)
                    .classed("svg-content-responsive", true)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                //defining the range of the axis and values
                var x0 = d3.scale.ordinal()
                    .rangeRoundBands([0, width], .1)
                var x1 = d3.scale.ordinal()
                var y = d3.scale.linear()
                    .range([height, 0])

                //creating axis. This is customizable for different axis types
                var xAxis = d3.svg.axis()
                    .scale(x0)
                    .orient("bottom");
                var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient("left")

                //creating the domains of the data. Alter this to use custom data delivery
                x0.domain(data.map(function(d) {
                    return d[key];
                }));
                y.domain([0, d3.max(data, function(d) {
                    return d[val];
                })]);

                //creating the hover tip
                var tip = d3.tip()
                    .attr('class', 'd3-tip')
                    .offset([-5, 0]).html(function(d) {
                        return "<span><strong>" + d[val] + "</strong></span>"
                    });

                //Graph creation. Appending axis
                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis);
                svg.call(tip)

                //creating each bar
                svg.selectAll('rect')
                    .data(data)
                    .enter()
                    .append("rect")
                    .attr("class", "bar")
                    .attr("id", function(d, i) {
                        return i
                    })
                    .attr("x", function(d, i) {
                        return i * (width / data.length);
                    })
                    .attr("y", function(d) {
                        return y(d[val]);
                    })
                    .attr("height", function(d) {
                        return height - y(d[val]);
                    })
                    .attr("width", width / data.length - 1)
                    .on('mouseover', tip.show)
                    .on('mouseout', tip.hide)
                    .on('click', function(d, i) {
                        $('.highlighted').removeClass('highlighted')
                        $('#line' + d[key]).addClass('highlighted')
                    })
                break

            case "pie":
                //creating a pie chart
                //creating the responsive view port for this particular chart
                // svg = d3.select('graph')
                //     .append("div")
                //     .classed("svg-container", true)
                //     .append("svg")
                //     .attr("width", '100%')
                //     .attr("height", '100%')
                //     .attr('viewBox', '0 0 ' + Math.min(width, height) + ' ' + Math.min(width, height))
                //     .attr('preserveAspectRatio', 'xMinYMin')
                //     .append("g")
                //     .attr("transform", "translate(" + Math.min(width, height) / 2 + "," + Math.min(width, height) / 2 + ")");
                svg = d3.select('graph')
                    .append("div")
                    .classed("svg-container", true)
                    .append("svg")
                    .attr("preserveAspectRatio", "xMinYMin meet")
                    .attr("viewBox", "0 0" + " " + w + " " + h)
                    .classed("svg-content-responsive", true)
                    .append("g")
                    .attr("transform", "translate(" + Math.min(width, height) / 2 + "," + Math.min(width, height) / 2 + ")");

                //defining the radius of the pie chart. Divide by a larger number to make the pie smaller
                var radius = Math.min(width, height) / 2;

                //defining the colors of the chart
                var color = d3.scale.category20b();

                svg.append('g')
                    .attr('transform', 'translate(' + (width / 2) +
                        ',' + (height / 2) + ')');

                var arc = d3.svg.arc()
                    .innerRadius(0)
                    .outerRadius(radius);

                var pie = d3.layout.pie()
                    .value(function(d) {
                        return d[val];
                    })
                    .sort(null);


                var tooltip = d3.select('graph')
                    .append('div')
                    .attr('class', 'tooltip');

                tooltip.append('div')
                    .attr('class', 'label');

                tooltip.append('div')
                    .attr('class', 'count');

                tooltip.append('div')
                    .attr('class', 'percent');


                var path = svg.selectAll('path')
                    .data(pie(data))
                    .enter()
                    .append('path')
                    .attr('d', arc)
                    .attr('fill', function(d, i) {
                        return color(d.data[key]);
                    })

                path.on('mouseover', function(d) {
                    var total = d3.sum(data.map(function(d) {
                        return d[val];
                    }));
                    var percent = Math.round(1000 * d.data[val] / total) / 10;
                    tooltip.select('.label').html(d.data[key]);
                    tooltip.select('.count').html(d.data[val]);
                    tooltip.select('.percent').html(percent + '%');
                    tooltip.style('display', 'block');
                });

                path.on('mouseout', function() {
                    tooltip.style('display', 'none');
                });


            // path.on('mousemove', function(d) {
            //     tooltip.style('top', (d3.event.pageY + 10) + 'px')
            //         .style('left', (d3.event.pageX + 10) + 'px');
            // });


                // .append("text")
                // .attr("transform", function(d) {
                //     console.log(d)
                //     return "translate(" + arc.centroid(d) + ")";
                // })
                // .attr("text-anchor", "middle")
                // .text(function(d) {

                //     return d.data[key];
                // });


                break

            case "line":
                svg = d3.select('graph')
                    .append("div")
                    .classed("svg-container", true)
                    .append("svg")
                    .attr("preserveAspectRatio", "xMinYMin meet")
                    .attr("viewBox", "0 0" + " " + w + " " + h)
                    .classed("svg-content-responsive", true)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                var xmax = data[0][key]
                var xmin = data[0][key]
                var ymax = data[0][val]
                var ymin = data[0][val]
                for (var i = 1; i < data.length; i++) {
                    if (data[i][key] < xmin) xmin = data[i][key]
                    if (data[i][key] > xmax) xmax = data[i][key]
                    if (data[i][val] < ymin) ymin = data[i][val]
                    if (data[i][val] > ymax) ymax = data[i][val]
                }

                var xScale = d3.scale.linear().range([0, width]).domain([xmin, xmax]),
                    yScale = d3.scale.linear().range([height, 0]).domain([ymin, ymax]),
                    xAxis = d3.svg.axis()
                    .scale(xScale),
                    yAxis = d3.svg.axis()
                    .scale(yScale)
                    .orient("left");

                svg.append("svg:g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);
                svg.append("svg:g")
                    .attr("class", "y axis")
                    .call(yAxis);
                var lineGen = d3.svg.line()
                    .x(function(d) {
                        return xScale(d[key]);
                    })
                    .y(function(d) {
                        return yScale(d[val]);
                    });
                svg.append('svg:path')
                    .attr('d', lineGen(data))
                    .attr('stroke', 'green')
                    .attr('stroke-width', 2)
                    .attr('fill', 'none');

                var bisectx = d3.bisector(function(d) {
                    return d[key];
                }).left
                var focus = svg.append("g")
                    .attr("class", "focus")
                    .style("display", "none");

                focus.append("circle")
                    .attr("r", 4.5);

                focus.append("text")
                    .attr("x", 9)
                    .attr("dy", ".35em");

                svg.append("rect")
                    .attr("class", "overlay")
                    .attr("width", width)
                    .attr("height", height)
                    .on("mouseover", function() {
                        focus.style("display", null);
                    })
                    .on("mouseout", function() {
                        focus.style("display", "none");
                    })
                    .on("mousemove", function() {
                        var x0 = xScale.invert(d3.mouse(this)[0]),
                            i = bisectx(data, x0, 1),
                            d0 = data[i - 1],
                            d1 = data[i],
                            d = x0 - d0[key] > d1[key] - x0 ? d1 : d0;
                        focus.attr("transform", "translate(" + xScale(d[key]) + "," + yScale(d[val]) + ")");
                        focus.select("text").text(d[val]);
                    });


                break


        }

    }



    return d3
})