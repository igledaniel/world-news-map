require.config({
    paths: {
        d3: '../components/d3/d3.min',
        // leaflet: '../components/leaflet/dist/leaflet',
        leaflet: '../components/leaflet/dist/leaflet-src',
        crossfilter: '../components/crossfilter/crossfilter.min',
        mustache: '../components/mustache/mustache',
        leafletmarkercluster: 'vendor/leaflet.markercluster',
        overlappingmarker: 'vendor/oms.min',
        font: 'vendor/requirejs-plugins/font',
        propertyParser: 'vendor/requirejs-plugins/propertyParser'
    },
    shim: {
        d3: {
            exports: 'd3'
        },
        leaflet: {
            exports: 'L'
        },
        leafletmarkercluster: {
            deps: ['leaflet']
        },
        overlappingmarker: {
            deps: ['leaflet']
        },
        crossfilter: {
            exports: 'crossfilter'
        },
        mustache: {
            exports: 'Mustache'
        }
    }
});

require(['app', 'd3', 'leaflet', 'font!google,families:[Roboto+Slab:400,700]'], function (app, d3, L) {
    'use strict';
    d3.transition().duration(500).select('#loader')
        .style('opacity', 1e-6)
        .remove();
    app;
});
