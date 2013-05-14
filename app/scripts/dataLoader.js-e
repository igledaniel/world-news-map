define(['d3', 'crossfilter', 'locations_list', 'map_markers'], function (d3, crossfilter, locations_list, map_markers) {
    'use strict';

    d3.json('python/nyt_geo.json', function (json) {
        var cross = crossfilter(json['articles']),
            geo = cross.dimension(function (d) { return d.geo_facet; })

        // console.log(geo.top(Infinity))
        map_markers.applyData(geo);
        // locations_list.applyData(geo);

    });
})
