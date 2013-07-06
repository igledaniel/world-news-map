define([
    'leaflet',
    'd3',
    'locationsList',
    'drawMap',
    'mustache',
    'text!tooltip_image.html',
    'text!tooltip_text.html',
    'leafletmarkercluster',
    'overlappingmarker'
],
    function (L, d3, locationsList, drawMap, Mustache, tooltip_image, tooltip_text) {
    'use strict';

    var init = function () {
        var map = drawMap.init.map,
            dateFormat = d3.time.format('%A %B %e');

        var markers = init.markers = new L.MarkerClusterGroup({
            // disableClusteringAtZoom: 5,
            iconCreateFunction: function (cluster) {
                var childCount = cluster.getChildCount();

                var c = ' marker-cluster-';
                if (childCount < 10) {
                    c += 'small';
                } else if (childCount < 50) {
                    c += 'medium';
                } else {
                    c += 'large';
                }
                return new L.DivIcon({ html: '<div><span>' + childCount + '</span></div>', className: 'marker-cluster' + c, iconSize: new L.Point(40, 40) });
            },
            polygonOptions: {
                weight: 1,
                color: 'gray',
                fillColor: 'gray',
                fillOpacity: 0.4
            }
        });

        var applyData = init.applyData = function (dataset) {
            var markerList = [];
            var oms = new OverlappingMarkerSpiderfier(map, { keepSpiderfied: true });

            for (var i = dataset.length - 1; i >= 0; i--) {
                var d = dataset[i];

                var templateData = {
                    title: d.headline,
                    url: d.url,
                    geo_facet: d.geoFacetString,
                    date: dateFormat(d.date),
                    thumbnail: d.thumbnail
                };

                var markerHtmlImage = Mustache.to_html(tooltip_image, templateData),
                    markerHtmlText = Mustache.to_html(tooltip_text, templateData);

                var marker = new L.Marker([d.lat, d.lon]);

                if (d.thumbnail !== null) {
                    marker.bindPopup(markerHtmlImage);
                } else {
                    marker.bindPopup(markerHtmlText);
                }

                markerList.push(marker);
                oms.addMarker(marker);
            }

            markers.addLayers(markerList);
            map.addLayer(markers);

            var markerBounds = markers.getBounds();
            map.fitBounds(markerBounds);
        };
    };

    return { init: init };

});
