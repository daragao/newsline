/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'views/newsListItem',
    'collections/newsList',
    'spin',
    'views/graph'
    ], function ($, _, Backbone, JST, NewsListItemView,
    NewsListCollection,Spinner,GraphView) {
        'use strict';

        var HomeView = Backbone.View.extend({

            el: '#header',

            template: JST['app/scripts/templates/home.ejs'],

            events: {
                'submit form': 'submitSearch'
            },

            initialize: function () {
                this.$newsListCollection = new NewsListCollection();
                this.render();
                this.$graphView = new GraphView();


                this.listenTo(this.$newsListCollection, 'add', this.addOne);
                this.listenTo(this.$newsListCollection, 'reset', this.addAll);

                _.bindAll(this, 'checkScroll');
                $(window).scroll(this.checkScroll);

                var opts = {
                    lines: 7, // The number of lines to draw
                    length: 0, // The length of each line
                    width: 4, // The line thickness
                    radius: 4, // The radius of the inner circle
                    corners: 1, // Corner roundness (0..1)
                    rotate: 0, // The rotation offset
                    direction: 1, // 1: clockwise, -1: counterclockwise
                    color: '#000', // #rgb or #rrggbb or array of colors
                    speed: 0.9, // Rounds per second
                    trail: 36, // Afterglow percentage
                    shadow: false, // Whether to render a shadow
                    hwaccel: false, // Whether to use hardware acceleration
                    className: 'spinner', // The CSS class to assign to the spinner
                    zIndex: 2e9, // The z-index (defaults to 2000000000)
                    top: 'auto', // Top position relative to parent in px
                    left: 'auto' // Left position relative to parent in px
                };
                this.$fetchSpinner = new Spinner(opts);
                this.$fetchLoading = false;
            },

            render: function() {
                this.$el.html(this.template());
                return this;
            },

            addOne: function (newsItem) {
                var view = new NewsListItemView({ model: newsItem });
                $('#news-list').append(view.render().el);
            },

            addAll: function () {
                $('#news-list').html('');
                this.$newsListCollection.each(this.addOne,this);
            },

            submitSearch: function (event) {
                event.preventDefault();
                var searchParams = $(event.target).serialize();
                this.$newsListCollection.reset();
                this.fetchView(searchParams+'&page='+1);
                this.$graphView.fetchView(searchParams);//graph view fetch collection
                this.$lastSearchParams = searchParams;
                this.$lastSearchPage = 1;
            },

            fetchView: function (params) {
                if(!this.$fetchLoading){
                    var fetchLoading = $('#fetchLoading').show();
                    this.$fetchLoading = true;
                    var target = document.getElementById('fetchSpinner');
                    this.$fetchSpinner.spin(target);
                    var view = this;
                    this.$newsListCollection.fetch({
                        data:params,
                        success: function() {
                            view.$fetchLoading = false;
                            view.$fetchSpinner.stop();
                            fetchLoading.hide();
                        }
                    });
                }
            },

            checkScroll: function () {
                var triggerPoint = 100; // 100px from the bottom

                if (  document.documentElement.clientHeight +
                    $(document).scrollTop() >= document.body.offsetHeight )
                {
                    this.$lastSearchPage++;
                    this.fetchView(this.$lastSearchParams+'&page='+this.$lastSearchPage);
                }
            }

        });

        return HomeView;
    });
