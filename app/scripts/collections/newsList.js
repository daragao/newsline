/*global define*/

define([
    'underscore',
    'backbone',
    'models/test',
    ], function (_, Backbone, NewslistitemModel) {
        'use strict';

        var NewslistCollection = Backbone.Collection.extend({

            model: NewslistitemModel,

            url: 'http://newsline-php.ap01.aws.af.cm/test_get.php',

            initialize: function (options) {
            }

        });

        return NewslistCollection;
    });
