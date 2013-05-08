define(['d3', 'crossfilter', 'locations_list', 'map_markers'], function (d3, crossfilter, locations_list, map_markers) {
    'use strict';

    d3.json('python/nyt_geo.json', function (json) {

        var cross = crossfilter(json['articles']);
        var date = cross.dimension(function (d) { return d.date; })

        map_markers.applyData(json['articles']);
        locations_list.applyData(json['geo_facets']);

    });
})
