define(['d3', 'crossfilter', 'locations_list', 'map_markers'], function (d3, crossfilter, locations_list, map_markers) {
    'use strict';

    d3.json('python/nyt_geo.json', function (json) {
        var cross = crossfilter(json['articles']),
            geo = cross.dimension(function (d) { return d.geo_facet; });

        var filterGeo = function (location) {
            geo.filterFunction(function (d)  {
                return d.indexOf(location) >= 0;
            });

            var entries = {};

            geo.top(Infinity).forEach(function (d) {
                d.geo_facet.forEach(function (c) {
                    entries[c] = (entries[c] || 0) + 1;
                })
            });

            map_markers.init.applyData(geo.top(Infinity));
            locations_list.init.applyData(d3.entries(entries));
        };

        filterGeo('UNITED STATES');

    });
});
