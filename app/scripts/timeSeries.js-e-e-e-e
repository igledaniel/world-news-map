define(['d3'], function (d3) {

    'use strict';
    var init = function () {

        var pad = { t: 10, r: 30, b: 30, l: 35 },
            div = document.getElementById('footerWrapper'),
            w = div.clientHeight,
            h = div.clientWidth,
            aspect = w / h;

        var x = d3.time.scale().range([0, w]),
            y = d3.scale.linear().range([h, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient('bottom');

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient('left');

        var line = d3.svg.line()
            .x(function (d) { return x(d.key); })
            .y(function (d) { return y(d.value); });

        var svg = d3.select('#time').append('svg')
            .attr("id", "timeSeries")
            .attr("viewBox", "0 0 " + w + " " + h )
            .attr("preserveAspectRatio", "xMidYMid meet")
        .append('g')
            .attr('transform', 'translate(' + pad.l + ',' + pad.t + ')');

        var applyData = init.applyData = function (cross, data) {

            console.log(data);

            x.domain(d3.extent(data, function (d) { return d.key; }));
            y.domain(d3.extent(data, function (d) { return d.value; }));

            console.log(x.domain(), y.domain())
            svg.append('g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(0,' + h + ')')
                .call(xAxis);

            svg.append("g")
                .attr({
                    class: "y axis"
                })
                .call(yAxis);

            svg.append('path')
                .datum(data)
                .attr('class', 'line')
                .attr('d', line);
        };
    };

    return { init: init };
});
