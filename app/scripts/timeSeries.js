define(['d3', 'jquery'], function (d3, $) {

    'use strict';
    var init = function () {

        var pad = { t: 40, r: 40, b: 20, l: 30 },
            div = document.getElementById('timeFixed'),
            h = 150 - pad.t - pad.b,
            w = $('#timeFixed').width() - pad.r - pad.l,
            filterGeo = require('filterGeo');

        var x = d3.time.scale().range([0, w]),
            y = d3.scale.linear().range([h, 0]).nice();

        var xAxis = d3.svg.axis()
            .scale(x)
            .tickFormat(d3.time.format('%m' + '/' + '%d'))
            .orient('bottom');

        var yAxis = d3.svg.axis()
            .scale(y)
            .ticks(5)
            .tickFormat(d3.format('d'))
            .orient('left');

        var svg = d3.select('#timeFixed').append('svg')
            .attr("id", "timeSeries")
            .attr('width', w + pad.r + pad.l)
            .attr('height', h + pad.t + pad.b)
        .append('g')
            .attr('transform', 'translate(' + pad.l + ',' + pad.t + ')');

        var gBrush = svg.append('g')
                .attr('class', 'brush');

        var applyData = init.applyData = function (dates) {
            w = $('#timeFixed').width() - pad.r - pad.l;
            x.range([0, w]);
            xAxis.scale(x);
            d3.select('#timeSeries').attr('width', w + pad.r + pad.l);

            var data = dates.group().all();

            var divider = w / data.length / 2;

            x.domain(d3.extent(data, function (d) { return d.key; }));
            y.domain([0, d3.max(data, function (d) { return d.value; })]);

            svg.append('g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(' + divider + ',' + h + ')');

            svg.append('g')
                .attr('class', 'y axis');

            svg.transition().duration(300).select(".y.axis")
                .call(yAxis);

            d3.transition(svg).select(".x.axis")
                .attr("transform", "translate(" + divider + ',' + h + ")")
                .call(xAxis);

            var brush = d3.svg.brush()
                .x(x)
                .on('brush', brushed);

            var series = svg.selectAll('.rectGroup')
                .data(data);

            var seriesEnter = series.enter().append('g')
                .attr('class', 'rectGroup');
                // .attr("transform", function(d) { return "translate(" + (x(d.key) / 2) + "," + y(d.value) + ")"; });

            seriesEnter.append("rect")
                .attr({
                    class: 'histRect',
                    fill: "#bfbfbf"
                });

            d3.selectAll('.brush').call(brush)
                .selectAll('rect')
                .attr('height', h)
                .attr("transform", "translate(" + divider + ',0)');

            d3.selectAll('.histRect').transition().duration(300)
                .attr({
                    x: function (d) { return x(d.key) + divider/2; },
                    y: function (d) { return y(d.value); },
                    width: divider - 2,
                    height: function (d) { return h - y(d.value); }
                });

            // series.transition().duration(300);

        function brushed () {
            filterGeo.setData.redrawDate(brush.extent());
        }

        };

    };

    return { init: init };
});
