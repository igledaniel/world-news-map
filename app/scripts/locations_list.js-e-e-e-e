define(['d3', 'jquery'], function (d3, $) {
    'use strict';

    var pad = { t: 10, r: 30, b: 30, l: 35 },
        w = window.innerHeight,
        h = 120 - pad.t - pad.b,
        aspect = w / h,
        color = d3.scale.linear().range(['#8fc2e0', '#03213f'])

    var svg = d3.select('#bars').append('div')
        .attr('id', 'barDiv')
        .attr('viewBox', '0 0 ' + w + ' ' + h )
        .attr('preserveAspectRatio', 'xMidYMid')
    .append('g')
        .attr('transform', 'translate(' + pad.l + ',' + pad.t + ')');

    var applyData = function (cross, location) {
        var crossGroup = cross.group().reduce(reduceAdd, reduceRemove, reduceInitial),
            entries = d3.entries(crossGroup.top(Infinity));

        console.log(entries)

        function reduceAdd(p, v) {
            v.geo_facet.forEach (function(d, i) {
                p[d] = (p[d] || 0) + 1; //increment counts
            });
            return p;
        }

        function reduceRemove(p, v) {
            v.geo_facet.forEach (function(d, i) {
                p[d] = (p[d] || 0) - 1; //decrease counts
            });
            return p;
        }

        function reduceInitial() {
          return {};
        }

        if (location === null) {
            locationsList(entries);
        } else {
            var filtered = entries.filter(function (d) {
                    return d.key === location;
                });
            locationsList(filtered);
            };
        }

        function locationsList(data) {
            color.domain(d3.extent(data, function (d) { return d.value; }));

            var sorted = data.sort(function(a, b) {
                return b.value - a.value;
            });

            var text = svg.selectAll('span')
                .data(data)
                .enter().append('span')
                .attr('class', 'locationList')
                .text(function (d) { return d.key + ': ' + d.value; })
                .style({
                    color: function (d) { return color(d.value); }
                });
        }
    return { applyData: applyData }
});
