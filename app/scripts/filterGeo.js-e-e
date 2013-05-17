define(['d3', 'crossfilter', 'locationsList', 'mapMarkers'], function (d3, crossfilter, locationsList, mapMarkers) {
    'use strict';

    var redraw = function (data, location) {

        if (location) {
            data.filterFunction(function (d)  {
                return d.indexOf(location) >= 0;
            });
        };

        var entries = {};

        data.top(Infinity).forEach(function (d) {
            d.geo_facet.forEach(function (c) {
                entries[c] = (entries[c] || 0) + 1;
            });
        });

        mapMarkers.init.applyData(data, data.top(Infinity));
        locationsList.init.applyData(data, d3.entries(entries));
    };

    return { redraw: redraw };
});
