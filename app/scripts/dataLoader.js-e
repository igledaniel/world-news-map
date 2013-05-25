define(['d3', 'crossfilter', 'filterGeo', 'timeSeries'], function (d3, crossfilter, filterGeo, timeSeries) {
    'use strict';

    var formatDate = d3.time.format('%Y%m%d');

    d3.json('data/nyt_geo.json', function (error, json) {

        json['articles'].forEach(function (d) {
            d.date = formatDate.parse(d.date);
            d.geoFacetString = d.geo_facet.join(' | ');
        });

        var cross = crossfilter(json['articles']);

        filterGeo.setData(cross)
    });
});
