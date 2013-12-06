/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'nvd3'
    ], function ($, _, Backbone, JST, NVD3) {
        'use strict';

        var ChartbaseView = Backbone.View.extend({
//            template: JST['app/scripts/templates/chartBase.ejs'],

            defaults: {
                xAttr: "x",
                yAttr: "y",
                margin: {top: 10, right: 40, bottom: 20, left: 40},
                duration: 1500
            },

            initialize: function() {
                this.options = _.extend({}, this.defaults, this.options);
            },

            render: function() {
                var margin = this.options.margin;
                this.width = this.$el.width() - margin.left - margin.right;
                this.height = this.$el.height() - margin.top - margin.bottom;


                this.svg = d3.select(this.el).append("svg");

                this.scales = {
                    x: this.getXScale(),
                    y: this.getYScale()
                };
                this.renderAxes();
                this.renderData();

                return this;
            }
        });

        return ChartbaseView;
    });
