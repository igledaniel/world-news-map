define(['d3', 'crossfilter', 'filterGeo'], function (d3, crossfilter, filterGeo) {
    'use strict';

    d3.select('small#aboutClick')
        .on('click', function () {
            d3.selectAll('.lightbox')
                .style('display', 'inline');
            d3.transition().duration(500).select('#about')
                .style('opacity', 1.0);
            d3.transition().duration(500).select('#blackout')
                .style('opacity', 0.4);
        });

    d3.select('#aboutClose').on('click', function () {
        d3.transition().duration(500).select('#about')
            .style('opacity', 1e-6);
        d3.transition().duration(500).select('#blackout')
            .style('opacity', 1e-6);
        d3.selectAll('.lightbox')
            .style('display', 'none');
    });

    var formatDate = d3.time.format('%Y-%m-%d');

    d3.json('../data/nyt_geo.json', function (error, json) {
        json.forEach(function (d) {
            d.date = formatDate.parse(d.date);
            d.geoFacetString = d.locales.join(' | ');
        });

        console.log(json)
        var cross = crossfilter(json);

        filterGeo.setData(cross);
    });
});
