define(['d3', 'jquery'], function (d3, $) {
    'use strict';

    var init = function () {
        var pad = { t: 10, r: 30, b: 30, l: 35 },
            w = window.innerHeight,
            h = 120 - pad.t - pad.b,
            aspect = w / h,
            color = d3.scale.linear().range(['#8fc2e0', '#03213f']);

        var svg = d3.select('#bars').append('div')
            .attr('id', 'barDiv')
            .attr('viewBox', '0 0 ' + w + ' ' + h)
            .attr('preserveAspectRatio', 'xMidYMid')
        .append('g')
            .attr('transform', 'translate(' + pad.l + ',' + pad.t + ')');

        var applyData = init.applyData = function (dataset) {

            color.domain(d3.extent(dataset, function (d) { return d.value; }));

            var sorted = dataset.sort(function (a, b) {
                return b.value - a.value;
            });

            var text = svg.selectAll('span')
                .data(sorted)
                .enter().append('span')
                .attr('class', 'locationList')
                .text(function (d) { return d.key + ': ' + d.value; })
                .style({
                    color: function (d) { return color(d.value); }
                });
        };
    };

    return { init: init };
});
