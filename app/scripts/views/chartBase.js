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
                margin: {top: 20, right: 20, bottom: 30, left: 40}
            },

            render: function() {
   //             var margin = this.options.margin;
                var margin = this.defaults.margin;
                this.width = this.$el.width() - margin.left - margin.right;
                this.height = this.$el.height() - margin.top - margin.bottom;


                this.svg = d3.select(this.el).append("svg")
                .attr("width", this.width + margin.left + margin.right)
                .attr("height", this.height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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
