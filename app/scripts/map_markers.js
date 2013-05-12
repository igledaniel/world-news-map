define([
    'leaflet',
    'd3',
    'crossfilter',
    'drawMap',
    'mustache',
    'text!tooltip_image.html',
    'text!tooltip_text.html',
    'leafletmarkercluster',
    'overlappingmarker'
    ],
    function (L, d3, crossfilter, drawMap, Mustache, tooltip_image, tooltip_text) {
    'use strict';

    var applyData = function (cross) {
        // var data = cross.top(Infinity);

        // var geo = data.dimension(function (d) { return d.geo_facet; });

        var map = drawMap.init.map,
            formatDate = d3.time.format('%Y%m%d');

        var markers = new L.MarkerClusterGroup({
            disableClusteringAtZoom: 7,
            iconCreateFunction: function (cluster) {
                var childCount = cluster.getChildCount();

                var c = ' marker-cluster-';
                if (childCount < 10) {
                    c += 'small';
                } else if (childCount < 30) {
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

        var markerList = [];
        var oms = new OverlappingMarkerSpiderfier(map, { keepSpiderfied: true });

        function drawMarkers(dataset) {

            markers.removeLayers(markerList);
            map.removeLayer(markers);

            for (var i = dataset.length - 1; i >= 0; i--) {
                var d = dataset[i];
                d.date = formatDate.parse(d.date);
                d.geoFacetString = d.geo_facet.join(' | ');

                var templateData = {
                    title: d.title,
                    url: d.url,
                    geo_facet: d.geoFacetString,
                    date: d.date.toDateString(),
                    small_image: d.small_image_url
                }

                var markerHtmlImage = Mustache.to_html(tooltip_image, templateData),
                    markerHtmlText = Mustache.to_html(tooltip_text, templateData);

                var marker = new L.Marker([d.lat, d.lon]);

                if (d['small_image_url'] != undefined) {
                    marker.bindPopup(markerHtmlImage, {
                        minWidth: 200,
                        maxWidth: 350
                    })
                } else {
                    marker.bindPopup(markerHtmlText, {
                        minWidth: 200,
                        maxWidth: 350
                    })
                };

                markerList.push(marker);
                oms.addMarker(marker);
            };

            markers.addLayers(markerList);
            map.addLayer(markers);
        }

        function filterGeo(location) {
            var filtered = cross.filterFunction(function(d)  {
                return d.indexOf(location) >= 0;
            });

            drawMarkers(cross.top(Infinity));
        }

    filterGeo('NORTH KOREA')
    }

    return { applyData: applyData }

});
