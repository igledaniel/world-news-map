define(['d3', 'crossfilter', 'locationsList', 'mapMarkers', 'timeSeries'], function (d3, crossfilter, locationsList, mapMarkers, timeSeries) {
    'use strict';

    var redraw = function (data, location) {

        if (location) {
            data.filterFunction(function (d)  {
                return d.indexOf(location) >= 0;
            });
        };

        var entries = {},
            dates = {};

        data.top(Infinity).forEach(function (d) {
            d.geo_facet.forEach(function (c) {
                entries[c] = (entries[c] || 0) + 1;
            });
            dates[d.date] = (dates[d.date] || 0) + 1;
        });
        console.log(dates)
        mapMarkers.init.applyData(data, data.top(Infinity));
        locationsList.init.applyData(data, d3.entries(entries));
        timeSeries.init.applyData(data, d3.entries(dates));
    };

    return { redraw: redraw };
});
