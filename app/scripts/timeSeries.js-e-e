define(['d3', 'jquery'], function (d3, $) {

    'use strict';
    var init = function () {

        var pad = { t: 20, r: 50, b: 20, l: 30 },
            div = document.getElementById('timeFixed'),
            h = 160 - pad.t - pad.b,
            w = $('#timeFixed').width() - pad.r - pad.l;

        var x = d3.time.scale().rangeRound([0, w]),
            y = d3.scale.linear().rangeRound([h, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .tickSubdivide(6)
            .tickSize(6, 3, 0)
            // .ticks(10)
            .tickFormat(d3.time.format('%m' + '/' + '%d'))
            .orient('bottom');

        var yAxis = d3.svg.axis()
            .scale(y)
            .ticks(6)
            .tickFormat(d3.format('d'))
            .orient('left');

        var svg = d3.select('#timeFixed').append('svg')
            .attr("id", "timeSeries")
            .attr('width', w + pad.r + pad.l)
            .attr('height', h + pad.t + pad.b)
        .append('g')
            .attr('transform', 'translate(' + pad.l + ',' + pad.t + ')');

        var applyData = init.applyData = function (dates) {
            w = $('#timeFixed').width() - pad.r - pad.l;
            x.rangeRound([0, w]);
            xAxis.scale(x);
            svg.attr('width', w + pad.r + pad.l);

            var data = dates.group().all();

            var divider = w / data.length / 2;

            x.domain(d3.extent(data, function (d) { return d.key; }));
            y.domain([0, d3.max(data, function (d) { return d.value; })]);

            svg.append('g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(0,' + h + ')');

            svg.append("g")
                .attr({
                    class: "y axis"
                });

            d3.transition(svg).select(".y.axis")
                .call(yAxis);

            d3.transition(svg).select(".x.axis")
                .attr("transform", "translate(0," + h + ")")
                .call(xAxis);

            var series = svg.selectAll('.rectGroup')
                .data(data);

            var seriesEnter = series.enter().append('g')
                .attr('class', 'rectGroup')
                .attr("transform", function(d) { return "translate(" + x(d.key) + "," + y(d.value) + ")"; });;

            console.log(data);

            seriesEnter.append("rect")
                .attr({
                    class: 'histRect',
                    fill: "#ddd"
                });

            d3.selectAll('.histRect').transition().duration(250)
                .attr({
                    x: divider / 2,
                    width: divider - 2,
                    height: function (d) { return h - y(d.value); }
                });

            series.transition().duration(250)
                .attr("transform", function(d) { return "translate(" + x(d.key) + "," + y(d.value) + ")"; });
        };

    };

    return { init: init };
});
