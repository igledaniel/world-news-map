define(['d3', 'crossfilter', 'locationsList', 'mapMarkers', 'timeSeries'], function (d3, crossfilter, locationsList, mapMarkers, timeSeries) {
    'use strict';

    var setData = function (cross) {

        var geo = cross.dimension(function (d) { return d.geo_facet; }),
            dates = cross.dimension(function (d) { return d.date; }),
            mapMarkers = require('mapMarkers'),
            markers = mapMarkers.init.markers;

        var redrawGeo = setData.redrawGeo = function (location) {
            markers.clearLayers();
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

        var redrawDate = setData.redrawDate = function (brush) {
            markers.clearLayers();

            if (brush.empty()) {
                dates.filterAll();
            } else {
                dates.filterRange(brush.extent());
            };


            var entries = {};

            dates.top(Infinity).forEach(function (d) {
                d.geo_facet.forEach(function (c) {
                    entries[c] = (entries[c] || 0) + 1;
                });
            });

            mapMarkers.init.applyData(dates.top(Infinity));
            locationsList.init.applyData(d3.entries(entries));
        }

        function reset() {
            geo.filterAll();
            d3.select(this).style('display', 'none');
            redrawGeo(null);
        }

        window.onresize = function () {
            timeSeries.init.applyData(dates);
        }

        d3.select('#reset')
            .on('click', reset);

        redrawGeo();

    };

    return { setData: setData };
});
