define(['d3', 'jquery'], function (d3, $) {
    'use strict';

    var applyData = function (cross) {
        var crossGroup = cross.group();
        console.log(crossGroup.all())

        // var pad = { t: 10, r: 30, b: 30, l: 35 },
        //     w = window.innerHeight,
        //     h = 120 - pad.t - pad.b,
        //     aspect = w / h,
        //     color = d3.scale.linear().range(['#8fc2e0', '#03213f'])

        // var svg = d3.select('#bars').append('div')
        //     .attr('id', 'barDiv')
        //     .attr('viewBox', '0 0 ' + w + ' ' + h )
        //     .attr('preserveAspectRatio', 'xMidYMid')
        // .append('g')
        //     .attr('transform', 'translate(' + pad.l + ',' + pad.t + ')');

        // color.domain(d3.extent(data, function (d) { return d.count; }));

        // var sorted = data.sort(function(a, b) {
        //     return b.count - a.count;
        // });

        // var text = svg.selectAll('span')
        //     .data(sorted)
        //     .enter().append('span')
        //     .attr('class', 'locationList')
        //     .text(function (d) { return d.name + ': ' + d.count; })
        //     .style({
        //         color: function (d) { return color(d.count); }
        //         // "font-size": function (d) { return d.count + 8 + 'px'; }
        //     });
    }
    return { applyData: applyData }
});
