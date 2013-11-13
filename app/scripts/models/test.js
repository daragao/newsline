/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var TestModel = Backbone.Model.extend({
        defaults: {
        }
    });

    return TestModel;
});
