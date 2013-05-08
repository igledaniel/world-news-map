require.config({
    paths: {
        jquery: '../components/jquery/jquery',
        bootstrap: 'vendor/bootstrap',
        d3: '../components/d3/d3',
        leaflet: '../components/leaflet/dist/leaflet',
        crossfilter: '../components/crossfilter/crossfilter',
        mustache: '../components/mustache/mustache',
        leafletmarkercluster: 'vendor/leaflet.markercluster',
        overlappingmarker: 'vendor/oms.min',
        font: 'vendor/requirejs-plugins/font',
        propertyParser: 'vendor/requirejs-plugins/propertyParser'
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
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

require(['app', 'jquery', 'leaflet', 'bootstrap', 'font!google,families:[Gentium+Basic:700,400italic]'], function (app, $, L) {
    'use strict';
    app;
});
