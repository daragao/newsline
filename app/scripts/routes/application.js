/*global define*/

define([
    'jquery',
    'backbone'
], function ($, Backbone) {
    'use strict';

    var ApplicationRouter = Backbone.Router.extend({
        routes: {
        '': 'index',
        'daily': 'daily'
        },

        'index': function(options) {
            console.log('ROUTE index!');
        },

        'daily' : function () {
            console.log('ROUTE daily!');
        },

        'initialize': function (options) {
            console.log('ROUTE initialized!');
        }

    });

    return ApplicationRouter;
});
