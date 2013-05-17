define(['d3', 'crossfilter', 'locationsList', 'mapMarkers', 'timeSeries'], function (d3, crossfilter, locationsList, mapMarkers, timeSeries) {
    'use strict';

    var setData = function (cross) {

        var geo = cross.dimension(function (d) { return d.geo_facet; }),
            dates = cross.dimension(function (d) { return d.date; });

        var redraw = setData.redraw = function (location) {

            if (location) {
                geo.filterFunction(function (d)  {
                    return d.indexOf(location) >= 0;
                });
            };

            var entries = {};

            geo.top(Infinity).forEach(function (d) {
                d.geo_facet.forEach(function (c) {
                    entries[c] = (entries[c] || 0) + 1;
                });
            });

            timeSeries.init.applyData(dates);
            mapMarkers.init.applyData(geo.top(Infinity));
            locationsList.init.applyData(d3.entries(entries));
        }

        redraw();

        function reset() {
            geo.filterAll();
            d3.select(this).style('display', 'none');
            redraw(null);
        }

        d3.select('#reset')
            .on('click', reset);
    };

    return { setData: setData };
});
