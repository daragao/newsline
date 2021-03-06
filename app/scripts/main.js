/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        pageable:{
            deps:['backbone'],
            exports: 'pageable'
        },
        spin: {
            deps: ['jquery']
        },
        nvd3:{
            deps: ['d3']
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        bootstrap: 'vendor/bootstrap',
        pageable: '../bower_components/backbone-pageable/lib/backbone-pageable',
        spin: '../bower_components/spin.js/dist/spin',
        d3: '../bower_components/d3/d3',
        nvd3: '../bower_components/nvd3/nv.d3'
    }
});

require([
    'backbone',
    'routes/application',
    'views/home'
    ], function (Backbone, AppRoute, HomeView) {
        var routes = new AppRoute();
        Backbone.history.start();
        var homeView = new HomeView();
    });
