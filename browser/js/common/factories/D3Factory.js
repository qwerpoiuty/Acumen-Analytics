app.factory('d3factory', function() {
    var svg;
    d3.makeGraph = function(el, json, w, h) {
        //decifer the format of the data
        var data = json;
        var key = Object.keys(data[0])[0]
        var vals = []
        for (var i = 1; i < Object.keys(data[0]).length; i++) {
            var val = Object.keys(data[0])[i]
            vals.push(val)
        }
        var val = vals[0]

        //define the margins for your graph
        var margin = {
                top: 20,
                right: 20,
                bottom: 50,
                left: 60
            },
            width = w - margin.left - margin.right,
            height = h - margin.top - margin.bottom;

        var color = d3.scale.category20b();
        //creating a chart switch statement for easy code management
        switch (el) {
            case "bar":
                //creating a bar chart

                // creates a responsive section for the svg
                svg = d3.select('#graph')
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
                        $("#line" + d[key]).get(0).scrollIntoView();
                    })
                break

            case "pie":
                //creating a pie chart

                svg = d3.select('#graph')
                    .append("div")
                    .classed("svg-container", true)
                    .append("svg")
                    .attr("preserveAspectRatio", "xMinYMin meet")
                    .attr("viewBox", "0 0" + " " + w + " " + h)
                    .classed("svg-content-responsive", true)
                    .append("g")
                    .attr("transform", "translate(" + Math.min(width, height) / 2 + "," + Math.min(width, height) / 2 + ")");

                // //defining the radius of the pie chart. Divide by a larger number to make the pie smaller
                var radius = Math.min(width, height) / 2;

                //defining the colors of the chart

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


                var tooltip = d3.select('#graph')
                    .append('div')
                    .attr('class', 'tip');

                tooltip.append('div')
                    .attr('class', 'key');

                tooltip.append('div')
                    .attr('class', 'val');

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
                    .on('mouseover', function(d) {
                        var total = d3.sum(data.map(function(d) {
                            return d[val];
                        }));
                        var percent = Math.round(1000 * d.data[val] / total) / 10;
                        tooltip.select('.key').html(d.data[key]);
                        tooltip.select('.val').html(d.data[val]);
                        tooltip.select('.percent').html(percent + '%');
                        tooltip.style('display', 'block');
                    })
                    .on('mouseout', function() {
                        tooltip.style('display', 'none');
                    })
                    .on('mousemove', function(d) {
                        tooltip.style('top', (d3.event.layerY + 10) + 'px')
                            .style('left', (d3.event.layerX + 10) + 'px');
                    })
                    .on('click', function(d, i) {
                        $('.highlighted').removeClass('highlighted')
                        $('#line' + d.data[key]).addClass('highlighted')
                        $("#line" + d.data[key]).get(0).scrollIntoView();
                    });

                break

            case "line":
                var col = color.range()

                svg = d3.select('#graph')
                    .append("div")
                    .classed("svg-container", true)
                    .append("svg")
                    .attr("preserveAspectRatio", "xMinYMin meet")
                    .attr("viewBox", "0 0" + " " + w + " " + h)
                    .classed("svg-content-responsive", true)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



                //sorts the data by ascending
                data.sort(function(a, b) {
                    return d3.ascending(a[key], b[key]);
                })
                var ymax = 0,
                    ymin = 100000000000000000000000000;

                for (var i = 0; i < vals.length; i++) {
                    var val = vals[i]
                    if (d3.max(data, function(d) {
                        return d[val]
                    }) > ymax) ymax = d3.max(data, function(d) {
                        return d[val]
                    })
                    if (d3.min(data, function(d) {
                        return d[val]
                    }) < ymin) ymin = d3.min(data, function(d) {
                        return d[val]
                    })
                }

                var xScale = d3.scale.linear().range([0, width]).domain(
                        [d3.min(data, function(d) {
                            return d[key]
                        }), d3.max(data, function(d) {
                            return d[key]
                        })]),
                    yScale = d3.scale.linear().range([height, 0]).domain(
                        [ymin * .8, ymax * 1.2]),
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

                var colors = color.range()
                for (var i = 0; i < vals.length; i++) {
                    var val = vals[i]
                    var lineGen = d3.svg.line()
                        .x(function(d) {
                            return xScale(d[key]);
                        })
                        .y(function(d) {
                            return yScale(d[val]);
                        });
                    svg.append('svg:path')
                        .attr('d', lineGen(data))
                        .attr('stroke', colors[i])
                        .attr('class', val)
                        .attr('stroke-width', 2)
                        .attr('fill', 'none')

                    var bisectx = d3.bisector(function(d) {
                        return d[key];
                    }).left
                    var focus = svg.append("g")
                        .attr("class", "focus")
                        .attr("id", val + "focus")
                        .style("display", "none");

                    focus.append("circle")
                        .attr("r", 4.5);

                    focus.append("text")
                        .attr("class", val + "focal")
                        .attr("x", 9)
                        .attr("dy", ".35em");


                    svg.append("rect")
                        .attr("class", "overlay")
                        .attr("id", val + "over")
                        .attr("width", width)
                        .attr("height", height)
                        .on("mouseover", function() {
                            $("#" + val + "focus").show()
                        })
                        .on("mouseout", function() {
                            $("#" + val + "focus").hide()
                        })
                        .on("mousemove", function() {
                            var x0 = xScale.invert(d3.mouse(this)[0]),
                                i = bisectx(data, x0, 1),
                                d0 = data[i - 1],
                                d1 = data[i],
                                d = x0 - d0[key] > d1[key] - x0 ? d1 : d0;
                            $("#" + val + "focus").attr("transform", "translate(" + xScale(d[key]) + "," + yScale(d[val]) + ")");
                            $("." + val + "focal").text(d[val]);
                        })
                        .on('click', function() {
                            var x0 = xScale.invert(d3.mouse(this)[0]),
                                i = bisectx(data, x0, 1),
                                d0 = data[i - 1],
                                d1 = data[i],
                                d = x0 - d0[key] > d1[key] - x0 ? d1 : d0;
                            $('.highlighted').removeClass('highlighted')
                            $('#line' + d[key]).addClass('highlighted')
                            $("#line" + d[key]).get(0).scrollIntoView();
                        });

                }

                break

            case "grouped bar":
                svg = d3.select("#graph")
                    .append('div')
                    .classed('svg-container', true)
                    .append('svg')
                    .attr("preserveAspectRatio", "xMinYMin meet")
                    .attr("viewBox", "0 0" + " " + w + " " + h)
                    .classed('svg-content-responsive', true)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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

                var tip = d3.tip()
                    .attr('class', 'd3-tip')
                    .offset([-5, 0]).html(function(d) {
                        return "<span><strong>" + d.value + "</strong></span>"
                    })
                svg.call(tip)

                var intervals = d3.keys(data[0]).filter(function(keys) {
                    return (keys !== key)
                })
                data.forEach(function(d) {
                    d.value = intervals.map(function(name) {
                        return {
                            name: name,
                            value: +d[name]
                        };
                    });
                })

                x0.domain(data.map(function(d) {
                    return d[key]
                }));
                x1.domain(intervals).rangeRoundBands([5, x0.rangeBand()]);
                y.domain([0, (10 + d3.max(data, function(d) {
                    return d3.max(d.value, function(d) {
                        return d.value
                    });
                }))]);

                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis)


                var interval = svg.selectAll("." + key)
                    .data(data)
                    .enter().append("g")
                    .attr("class", key)
                    .attr("transform", function(d) {
                        return "translate(" + x0(d[key]) + ",0)";
                    });

                interval.selectAll("rect")
                    .data(function(d) {
                        return d.value;
                    })
                    .enter()
                    .append("rect")
                    .attr('class', 'bar')
                    .attr('id', function(d, i) {
                        return i
                    })
                    .attr("width", x1.rangeBand() * .9)
                    .attr("x", function(d) {
                        return x1(d.name);
                    })
                    .attr("y", function(d) {
                        return y(d.value);
                    })
                    .attr("height", function(d) {
                        return height - y(d.value) - 1;
                    })
                    .style("fill", function(d) {
                        return color(d.name);
                    })
                    .on('mouseover', tip.show)
                    .on('mouseout', tip.hide)

                break

            case "stacked bar":
                svg = d3.select('#graph')
                    .append("div")
                    .classed("svg-container", true)
                    .append("svg")
                    .attr("preserveAspectRatio", "xMinYMin meet")
                    .attr("viewBox", "0 0" + " " + w + " " + h)
                    .classed("svg-content-responsive", true)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                var x = d3.scale.ordinal()
                    .rangeRoundBands([0, width]);

                var y = d3.scale.linear()
                    .rangeRound([height, 0]);


                var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient("bottom")

                var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient("left");


                var layers = d3.layout.stack()(vals.map(function(c) {
                    return data.map(function(d) {
                        return {
                            x: d[key],
                            y: d[c]
                        };
                    });
                }));

                x.domain(layers[0].map(function(d) {
                    return d.x;
                }));
                y.domain([0, d3.max(layers[layers.length - 1], function(d) {
                    return d.y0 + d.y;
                })]).nice();

                var layer = svg.selectAll(".layer")
                    .data(layers)
                    .enter().append("g")
                    .attr("class", "layer")
                    .style("fill", function(d, i) {
                        return color(i);
                    });

                layer.selectAll("rect")
                    .data(function(d) {
                        return d;
                    })
                    .enter().append("rect")
                    .attr("x", function(d) {
                        return x(d.x);
                    })
                    .attr("y", function(d) {
                        return y(d.y + d.y0);
                    })
                    .attr("height", function(d) {
                        return y(d.y0) - y(d.y + d.y0);
                    })
                    .attr("width", x.rangeBand() - 1);

                svg.append("g")
                    .attr("class", "axis axis--x")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

                svg.append("g")
                    .attr("class", "axis axis--y")
                    .call(yAxis);



                break

        }

    }


    return d3
})