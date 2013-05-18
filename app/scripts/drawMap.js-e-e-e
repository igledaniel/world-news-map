define(['leaflet'], function (L) {
    'use strict';

    L.Icon.Default.imagePath = './images';

    var init = function () {
        var map = init.map = new L.Map('map', {
            worldCopyJump: true,
            minZoom: 1,
            maxZoom: 6,
            zoomControl: false,
            attributionControl: false
        });

        L.tileLayer('http://d.tiles.mapbox.com/v3/nikhils.map-y5dl92k2/{z}/{x}/{y}.png', {
            attribution: 'Map tiles hosted by <a href="http://mapbox.com/">MapBox</a>'
        }).addTo(map);

    };

    return {
        init: init
    };
});
