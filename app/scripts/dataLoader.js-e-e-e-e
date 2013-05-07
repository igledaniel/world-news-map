define(['d3', 'crossfilter', 'locations', 'labels'], function (d3, crossfilter, locations, labels) {
    'use strict';

    d3.json('python/nyt_geo.json', function (json) {

        var cross = crossfilter(json['articles']);
        var date = cross.dimension(function (d) { return d.date; })

        locations.applyData(json['articles']);
        labels.applyData(json['geo_facets']);

    });
})
