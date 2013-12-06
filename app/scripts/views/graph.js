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

            chart: nv.models.lineChart(),

            defaults: _.defaults({
                barPadding: 0.1
            }, ChartBase.prototype.defaults),

            initialize: function() {
                this.options = _.extend({}, this.defaults, this.options);
            },

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
                var maxValue = d3.max(this.collection.pluck('value'));
                return d3.scale.linear()
                .rangeRound([0])
                .domain([0,maxValue]);
            },

            renderAxes: function() {

                var chart = this.chart;

                chart.xAxis
                .orient("bottom")
                .tickFormat(
                    function(d) {
                        return d3.time.format('%b %d')(new Date(d));
                    }
                );

                chart.yAxis
                .tickFormat(function (d) {
                    return d3.format()(d);
                });
            },

            transformData: function() {
                var arr = [];
                var obj = this.collection;
                obj.forEach(function(item){
                    var newDate = item.get('date');
                    arr.push({x: newDate, y: item.get('value')});
                });
                var data = [{
                    "key": "news",
                    "values": arr,
                    color: '#2ca02c',
                }];
                return data;
            },

            renderData: function() {
                var thisChart = this.chart;
                var x = this.scales.x;
                var y = this.scales.y;

                var data = this.transformData();
                var duration= this.options.duration;
                var width = this.options.width;
                var height = this.options.height;
                var margin = this.options.margin;

                nv.addGraph(function () {
                    thisChart
                    .width(width).height(height)
                    .margin(margin)
                    .x(function (d) { return d.x })
                    .y(function (d) { return d.y });


                    d3.select('.graph-canvas svg')
                    .datum(data)
                    .transition().duration(duration)
                    .call(thisChart);

                    nv.utils.windowResize(thisChart.update);

                    return thisChart;
                });
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

                var elHeight = $('.graph-canvas').height();
                var navHeight = $('.navbar').height();
                var slidePx = elHeight-navHeight;
                var bodyTopPadding = 90;
                this.$graph.css({ top: -slidePx });
                $('body').css({ 'padding-top': bodyTopPadding });

            },

            toggleHide: function () {
                var elHeight = $('.graph-canvas').height();
                var navHeight = $('.navbar').height();
                var slidePx = elHeight-navHeight;
                var bodyTopPadding = 90;
                var speed = 'fast';
                var callback = function (view) { view.$isHidden = !view.$isHidden;};
                if(this.$isHidden) {
                    this.$graph.animate({'top':navHeight}, speed);
                    $('body').animate({'padding-top':elHeight+bodyTopPadding}, speed,callback(this));
                } else {
                    this.$graph.animate({'top':-slidePx}, speed);
                    $('body').animate({'padding-top':bodyTopPadding}, speed,callback(this));
                }
            }
        });

        return GraphView;
    });
