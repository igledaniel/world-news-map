define(['d3'], function (d3) {

    'use strict';
    var init = function () {

        var pad = { t: 10, r: 10, b: 10, l: 10 },
            div = document.getElementById('footerWrapper'),
            h = div.clientHeight - pad.t - pad.b,
            w = div.clientWidth - pad.l - pad.r,
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

        var svg = d3.select('#timeFixed').append('svg')
            .attr("id", "timeSeries")
            .attr("viewBox", "0 0 " + (w + pad.r + pad.l) + " " + (h + pad.t + pad.b) )
            .attr("preserveAspectRatio", "xMidYMid meet")
        .append('g')
            .attr('transform', 'translate(' + pad.l + ',' + pad.t + ')');

        var applyData = init.applyData = function (dates) {

            var data = dates.group().all();

            x.domain(d3.extent(data, function (d) { return d.key; }));
            y.domain(d3.extent(data, function (d) { return d.value; }));

            svg.append('g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(0,' + h + ')');

            svg.append("g")
                .attr({
                    class: "y axis"
                });

            var series = svg.append('path')
                .datum(data)
                .attr('class', 'line');

            d3.selectAll('.line').transition()
                .attr('d', line);

            d3.transition(svg).select(".y.axis")
                .call(yAxis);

            d3.transition(svg).select(".x.axis")
                .attr("transform", "translate(0," + h + ")")
                .call(xAxis);
        };
    };

    return { init: init };
});
