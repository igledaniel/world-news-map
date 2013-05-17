define(['d3', 'crossfilter', 'filterGeo'], function (d3, crossfilter, filterGeo) {
    'use strict';

    var formatDate = d3.time.format('%Y%m%d');

    d3.json('python/nyt_geo.json', function (error, json) {

        json['articles'].forEach(function (d) {
            d.date = formatDate.parse(d.date);
            d.geoFacetString = d.geo_facet.join(' | ');
        });

        var cross = crossfilter(json['articles']),
            geo = cross.dimension(function (d) { return d.geo_facet; }),
            dates = cross.dimension(function (d) { return d.date; });

        filterGeo.redraw(geo, null)

        function reset() {
            geo.filterAll();
            d3.select(this).style('display', 'none');
            filterGeo.redraw(geo, null);
        }

        d3.select('#reset')
            .on('click', reset);
    });
});
