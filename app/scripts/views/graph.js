/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'collections/graph'
    ], function ($, _, Backbone, JST, GraphCollection) {
        'use strict';

        var GraphView = Backbone.View.extend({

            //$('#graph').slideUp( "slow"); $('body').animate({'padding-top':70}, 'slow')
            //$('#graph').slideDown( "slow"); $('body').animate({'padding-top':170}, 'slow')

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
                    success: function() {
                        view.$graph.show();
                    }
                });
            },

            addOne: function (graphItem) {
                console.log('addOne:'+JSON.stringify(graphItem));
                //append to graph data
            },

            addAll: function () {
                console.log('addAll()');
                //reset graph data
                this.$graphCollection.each(this.addOne,this);
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
