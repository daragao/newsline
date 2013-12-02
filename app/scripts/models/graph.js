/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var GraphModel = Backbone.Model.extend({
        defaults: {
            'date':'',
            'value':0
        },
        parse:function (response) {
            response.date = new Date(response.date);
            return response;
        }
    });

    return GraphModel;
});
