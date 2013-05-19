define(['d3', 'jquery'], function (d3, $) {
    'use strict';

    var init = function () {
        var filterGeo = require('filterGeo');

        var color = d3.scale.linear().range(['#8fc2e0', '#03213f']);

        var placeDiv = d3.select('#place').append('div')
            .attr('id', 'placeDiv');

        var applyData = init.applyData = function (dataset) {

            color.domain(d3.extent(dataset, function (d) { return d.value; }));

            dataset.sort(function (a, b) {
                return b.value - a.value;
            });

            function filterClick(key) {
                d3.select('#reset')
                    .style({
                        display: 'inline',
                        opacity: 1.0
                    });

                filterGeo.setData.redrawGeo(key);
            }

            var text = placeDiv.selectAll('span')
                .data(dataset);

            text.enter().append('span')
                .attr('class', 'locationList')
                .text(function (d) { return d.key + ': ' + d.value; })
                .style({
                    color: function (d) { return color(d.value); },
                    opacity: 1e-6,
                    cursor: 'pointer'
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
