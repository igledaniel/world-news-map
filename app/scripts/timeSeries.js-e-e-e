define(['d3'], function (d3) {
    'use strict';

    var init = function () {

        var pad = { t: 10, r: 40, b: 20, l: 30 },
            div = document.getElementById('timeFixed'),
            h = 120 - pad.t - pad.b,
            w = div.offsetWidth - pad.r - pad.l,
            filterGeo = require('filterGeo'),
            color = d3.scale.linear().range(['#8fc2e0', '#03213f']),
            formatDate = d3.time.format('%a %b %d');

        var x = d3.time.scale().range([0, w]),
            y = d3.scale.linear().rangeRound([h, 0]).nice();

        var xAxis = d3.svg.axis()
            .scale(x)
            .tickSubdivide(3)
            .ticks(d3.time.days, 4)
            .tickFormat(d3.time.format('%m' + '/' + '%d'))
            .orient('bottom');

        var yAxis = d3.svg.axis()
            .scale(y)
            .ticks(5)
            .tickFormat(d3.format('d'))
            .orient('left');

        var svg = d3.select('#timeFixed').append('svg')
            .attr('id', 'timeSeries')
            .attr('width', w + pad.r + pad.l)
            .attr('height', h + pad.t + pad.b)
        .append('g')
            .attr('transform', 'translate(' + pad.l + ',' + pad.t + ')');

        var brush = d3.svg.brush()
            .on('brush', brushed);

        var rects = svg.append('g');

        svg.append('g')
            .attr('class', 'brush');

        var applyData = init.applyData = function (dates) {
            w = div.offsetWidth - pad.r - pad.l;
            d3.select('#timeSeries').attr('width', w + pad.l);

            var data = dates.group().all(),
                divider = w / data.length;

            var dateExtent = d3.extent(data, function (d) { return d.key; }),
                newMax = d3.time.day.offset(dateExtent[1], 1);

            x.domain([dateExtent[0], newMax]);
            y.domain([0, d3.max(data, function (d) { return d.value; })]);
            color.domain(y.domain());
            x.range([0, w]);
            xAxis.scale(x);
            brush.x(x);

            svg.append('g')
                .attr('class', 'x axis');

            svg.append('g')
                .attr('class', 'y axis');

            svg.transition().duration(300).select('.y.axis')
                .call(yAxis);

            d3.transition(svg).select('.x.axis')
                .attr('transform', 'translate(0,' + h + ')')
                .call(xAxis);

            var series = rects.selectAll('.rectGroup')
                .data(data);

            var seriesEnter = series.enter().append('g')
                .attr('class', 'rectGroup');

            seriesEnter.append('rect')
                .attr({
                    class: 'histRect',
                    fill: function (d) { return color(d.value); }
                });

            d3.selectAll('.histRect').transition().duration(300)
                .attr({
                    x: function (d) { return x(d.key); },
                    y: function (d) { return y(d.value); },
                    width: divider - 1,
                    height: function (d) { return h - y(d.value); }
                });

            brush.extent(brush.extent());

            d3.selectAll('.brush')
                .call(brush)
                .selectAll('rect')
                .attr('height', h);

            d3.selectAll('.x.axis line')
                .attr('x1', divider / 2)
                .attr('x2', divider / 2);

            d3.selectAll('.x.axis text')
                .attr('x', divider / 2);
        };

        function brushed() {
            if (brush.empty() === true) {
                d3.select('#resetTime')
                    .style('display', 'none');

                d3.select('#timeSpan')
                    .style('display', 'none');
            } else {
                d3.select('#resetTime')
                    .style('display', 'inline');

                d3.select('#timeSpan')
                    .style('display', 'inline')
                    .html('<small>' + formatDate(brush.extent()[0]) + ' - ' + formatDate(brush.extent()[1]) + '</small>');
            }

            filterGeo.setData.redrawDate(brush);
        }

        var clearBrush = init.clearBrush = function () {
            brush.clear();
            d3.selectAll('.brush').call(brush);
        };
    };

    return { init: init };
});
