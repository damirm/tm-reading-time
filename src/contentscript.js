;(function () {
    'use strict';

    var defaultOptions = {
        api_url: 'https://noble-linker-95212.appspot.com/resolve',
        badgeClassName: 'flag flag_recovery',
        averageWordsPerMinute: 180,
        badgeContainerSelector: '.post h1.title',
        contentContainerSelector: '.content',
        iframesContainerSelector: '.post iframe',
        articlesContainerSelector: 'a.post_title'
    };

    var TmReadingTime = function (options) {
        options = options || {};

        this.options(defaultOptions)
            .options(options);

        if (this.isPostPage()) {
            var time = this.calculateMinutes();
            this.addBadge(time, this.getBadgeContainer());
        } else {
            this.loadReadingTimes();
        }
    };

    TmReadingTime.prototype = {
        isPostPage: function () {
            return /\/\d+\/$/.test(location.pathname);
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
            var count = container.textContent.replace(/[\s\n]+/g, ' ').split(' ').length;
            return count;
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

        getArticlesUrls: function () {
            var result = [];
            var articleLinkElements = Array.prototype.slice.call(
                    document.querySelectorAll(this.articlesContainerSelector), 0);

            articleLinkElements.forEach(function (link) {
                result.push(link.href);
            });

            return result;
        },

        loadReadingTimes: function () {
            var self = this;
            var urls = this.getArticlesUrls();

            if (urls.length) {
                var query = "?links=" + encodeURIComponent(JSON.stringify(urls));
            
                this.ajax({
                    url: this.api_url + query,
                    success: function (response) {
                        response.forEach(function (obj) {
                            var a = document.querySelector('a[href="' + obj.href + '"]');

                            if (a == null) {
                                return;
                            }

                            self.addBadge(obj.time, a.parentNode);
                        });
                    }
                });
            }
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
        },

        ajax: function (options) {
            var params = {
                method: 'GET',
                url: this.api_url,
                success: function (response) { console.log('Ajax response', response); }
            };

            this.options.call(params, options);

            var xhr = new XMLHttpRequest();
            xhr.open(params.method, params.url, true);
            xhr.send();

            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    params.success(JSON.parse(xhr.responseText));
                }
            };
        }
    };

    var tmReadingTime = new TmReadingTime();
})();