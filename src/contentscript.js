;(function () {
    'use strict';

    var storage = new Storage();

    var defaultOptions = {
        api_url: '/* @echo plugin.apiUrl *//resolve',
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
            badge.textContent = text;
            return badge;

        },

        addBadge: function (time, container) {
            var badge = this.createBadge(time + " min");
            container.appendChild(badge);
        },

        addBadgeForLink: function (time, href) {
            var a = document.querySelector('a[href="' + href + '"]');

            if (a == null) {
                return;
            }

            this.addBadge(time, a.parentNode);
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
                this.getFromStorage(urls, function (result) {
                    for (var href in result) {
                        if (result.hasOwnProperty(href)) {
                            self.addBadgeForLink(result[href], href);
                            urls.splice(urls.indexOf(href), 1);
                        }
                    }
                    
                    if (urls.length) {
                        var query = "?links=" + encodeURIComponent(JSON.stringify(urls));
            
                        self.ajax({
                            url: self.api_url + query,
                            success: function (response) {
                                response.forEach(function (obj) {
                                    self.addBadgeForLink(obj.time, obj.href);
                                    storage.set(obj.href, obj.time);
                                });
                            }
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
        },

        getFromStorage: function (links, cb) {
            storage.get(links, false, cb);
        }
    };

    var tmReadingTime = new TmReadingTime();
})();