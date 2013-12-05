/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'collections/graph',
    'views/chartBase'
    ], function ($, _, Backbone, JST, GraphCollection, ChartBase) {
        'use strict';

        var BarChart = ChartBase.extend({

            defaults: _.defaults({
                barPadding: 0.1
            }, ChartBase.prototype.defaults),

            getXScale: function() {
                var padding = this.options.barPadding;
                var collectionArr = this.collection.toArray();
                var minDate = this.collection.toArray()[0].get('date');
                var maxDate = this.collection.toArray()[collectionArr.length - 1].get('date');
                return d3.time.scale()
                .domain( [new Date(minDate), d3.time.day.offset( new Date(maxDate), 1) ])
                .rangeRound([0, this.width - this.defaults.margin.left - this.defaults.margin.right]);
            },

            getYScale: function() {
                return d3.scale.linear()
                .rangeRound([this.height, 0])
                .domain([0, d3.max(this.collection.pluck(this.options.yAttr))]);
            },

            renderAxes: function() {

                var xAxis = d3.svg.axis()
                .scale(this.scales.x)
                .orient("bottom")
                .tickFormat(
                    function(d) {
                        return d3.time.format('%b %d')(new Date(d));
                    }
                );

                this.svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + this.height + ")")
                .call(xAxis);
            },

            renderData: function() {
                var chart = this,
                x = this.scales.x,
                y = this.scales.y;

                this.svg.selectAll(".bar")
                .data(this.collection.toArray())
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x",
                    function(d) {
                        console.log('x:'+d.get('date'));
                        return x(d.get('date'));
                    }
                )
//                .attr("width", x.rangeBand())
                .attr("width", 20)
                .attr("y",
                    function(d) {
                        return y(d.get('value'));
                    }
                )
                .attr("height",
                    function(d) {
                        return chart.height - y(d.toJSON().value);
                    }
                );
            }

        });

        var GraphView = Backbone.View.extend({

            tagName: 'div',

            className: 'graph-container',

            events: {
            'click .graph-button': 'toggleHide'
            },

            template: JST['app/scripts/templates/graph.ejs'],

            initialize: function () {

                this.$graphCollection = new GraphCollection();
                this.$isHidden = true;

                this.listenTo(this.$graphCollection, 'add', this.addOne);
                this.listenTo(this.$graphCollection, 'reset', this.addAll);

                this.$graph = $('#graph');
                this.$graph.append(this.render().el);
            },

            render: function() {
                this.$el.html(this.template());

                return this;
            },

            fetchView: function (params) {
                var view = this;
                this.$graphCollection.fetch({
                    data:params,
                    reset:true,
                });
            },

            addOne: function (graphItem) {
                //append to graph data
            },

            addAll: function () {
                //reset graph data
                this.$graphCollection.each(this.addOne,this);

                console.log('addAll()');
                this.$graph.show();

var graphCollection = this.$graphCollection;
var chart = new BarChart({

  el: ".graph-canvas",
  collection: graphCollection,

  xAttr: "date",
  yAttr: "value"

});
chart.render();

            },

            toggleHide: function () {
                var element = $('#graph');
                var speed = 'fast';
                var callback = function (view) { view.$isHidden = !view.$isHidden;};
                if(this.$isHidden) {
                    element.animate({'top':50}, speed);
                    $('body').animate({'padding-top':190}, speed,callback(this));
                } else {
                    element.animate({'top':-50}, speed);
                    $('body').animate({'padding-top':90}, speed,callback(this));
                }
            }
        });

        return GraphView;
    });
