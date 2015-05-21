;(function () {
    'use strict';

    var defaultOptions = {
        badgeClassName: 'flag flag_recovery',
        averageWordsPerMinute: 180,

        badgeContainerSelector: '.post h1.title',
        contentContainerSelector: '.content',
        iframesContainerSelector: '.post iframe'
    };

    var TmReadingTime = function (options) {
        options = options || {};

        this.options(defaultOptions)
            .options(options);

        if (this.isPostPage()) {
            var time = this.calculateMinutes();
            this.addBadge(time, this.getBadgeContainer());
        }
    };

    TmReadingTime.prototype = {
        isPostPage: function () {
            return /\d+\/$/.test(location.pathname);
        },

        getBadgeContainer: function () {
            return document.querySelector(this.badgeContainerSelector);
        },

        getContentContainer: function () {
            return document.querySelector(this.contentContainerSelector);
        },

        getContentLength: function (container) {
            return container.textContent.replace(/[\n\s]/g, '').length;
        },

        getContentWordsCount: function (container) {
            return container.textContent.replace(/\s+/g, ' ').split(' ').length;
        },

        getYoutubeIframes: function () {
            return document.querySelector(this.iframesContainerSelector);
        },

        calculateMinutes: function () {
            var container = this.getContentContainer();
            var resultTime = Math.ceil(this.getContentWordsCount(container) / this.averageWordsPerMinute);
            return resultTime;
        },

        createBadge: function (text) {
            var badge = document.createElement('span');
            badge.className = this.badgeClassName;
            badge.innerText = text;
            return badge;

        },

        addBadge: function (time, container) {
            var badge = this.createBadge(time + " min");
            container.appendChild(badge);
        },

        loadYoutubeApi: function (cb) {
            var tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            document.body.appendChild(tag);

            window.onYouTubeIframeAPIReady = function () {
                cb();
            };
        },

        options: function (opts) {
            for (var opt in opts) {
                if (opts.hasOwnProperty(opt)) {
                    this[opt] = opts[opt];
                }
            }

            return this;
        }
    };

    var tmReadingTime = new TmReadingTime();
})();