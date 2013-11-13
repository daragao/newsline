define([
    'jquery',
    'underscore',
    'backbone',
    'templates'
    ], function ($, _, Backbone, JST) {
        'use strict';

        var NewslistitemView = Backbone.View.extend({

            tagName: 'a',

            attributes: {
                class:  'list-group-item',
                href: '#'
            },

            //el: '.list-group-item',

            template: JST['app/scripts/templates/newsListItem.ejs'],

            initialize: function () {
                this.listenTo(this.model, 'change', this.render);
                this.listenTo(this.model, 'destroy', this.remove);
            },

            render: function () {
                this.$el.html(this.template(this.model.toJSON()));
                return this;
            }

        });

        return NewslistitemView;
    });
