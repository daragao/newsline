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
            response.value = Number(response.value);
            return response;
        }
    });

    return GraphModel;
});
