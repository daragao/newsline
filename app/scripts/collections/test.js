/*global define*/

define([
    'underscore',
    'backbone',
    'models/test'
], function (_, Backbone, TestModel) {
    'use strict';

    var TestCollection = Backbone.Collection.extend({
        model: TestModel
    });

    return TestCollection;
});
