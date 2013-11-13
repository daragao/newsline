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
        }
    });

    return GraphModel;
});
