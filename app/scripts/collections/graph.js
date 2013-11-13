/*global define*/

define([
    'underscore',
    'backbone',
    'models/graph'
    ], function (_, Backbone, GraphModel) {
        'use strict';

        var GraphCollection = Backbone.Collection.extend({

            model: GraphModel,

            url: 'http://newsline-php.ap01.aws.af.cm/chart.php?search=snowden&startdate=2013-08-01&enddate=2013-08-24',

            initialize: function (options) {
            }
        });

        return GraphCollection;
    });
