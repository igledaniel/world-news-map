define(['d3', 'jquery'], function (d3, $) {
    'use strict';

    var init = function () {
        var filterGeo = require('filterGeo'),
            mapMarkers = require('mapMarkers'),
            markers = mapMarkers.init.markers;

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

        var applyData = init.applyData = function (geo, dataset) {

            color.domain(d3.extent(dataset, function (d) { return d.value; }));

            var sorted = dataset.sort(function (a, b) {
                return b.value - a.value;
            });

            function filterClick(key) {
                d3.select('#reset')
                    .style({
                        display: 'inline',
                        opacity: 1.0
                    });

                markers.clearLayers();
                filterGeo.redraw(geo, key);
            }

            var text = svg.selectAll('span')
                .data(dataset);

            text.enter().append('span')
                .attr('class', 'locationList')
                .text(function (d) { return d.key + ': ' + d.value; })
                .style({
                    color: function (d) { return color(d.value); },
                    opacity: 1e-6
                })
                .on('click', function (d) {
                    filterClick(d.key);
                });

            text.transition()
                .delay(200).duration(400)
                .style('opacity', 1.0)
                .text(function (d) { return d.key + ': ' + d.value; });

            text.exit()
                .transition().duration(600)
                .style('opacity', 1e-6)
                .remove();
        };
    };

    return { init: init };
});
