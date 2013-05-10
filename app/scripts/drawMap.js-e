define(['leaflet'], function (L) {
    'use strict';

    L.Icon.Default.imagePath = './images';

    var init = function () {
        var map = init.map = new L.Map('map', {
            center: new L.LatLng(20, 0),
            worldCopyJump: true,
            zoom: 2,
            maxZoom: 7,
            zoomControl: true
        });

        L.tileLayer('http://d.tiles.mapbox.com/v3/nikhils.map-y5dl92k2/{z}/{x}/{y}.png', {
            attribution: 'Map tiles hosted by <a href="http://mapbox.com/">MapBox</a>'
        }).addTo(map);

    };

    return {
        init: init
    };
});
