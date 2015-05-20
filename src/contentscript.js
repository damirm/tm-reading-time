;(function () {
    'use strict';

    var badgeClasses = 'flag flag_recovery',
        badge = document.createElement('span'),
        container = document.querySelector('.post h1.title'),
        content = document.querySelector('.content'),
        averageWordsPerMinute = 180,
        contentLength = content.textContent.replace(/[\n\s]/g, '').length,
        wordsCount = content.textContent.replace(/\s+/g, ' ').split(' ').length,
        youtubeIframe = document.querySelector('.post iframe');

    var resultTime = Math.ceil(wordsCount / averageWordsPerMinute);

    if (typeof youtubeIframe == 'undefined') {
        showBadge(resultTime);
    } else {
        showBadge(resultTime);
        
        // TODO: add youtube videos duration
        // loadYoutubeApi(function () {
        //     var player = new YT.Player(youtubeIframe);
        // });
    }

    function loadYoutubeApi(cb) {
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);

        window.onYouTubeIframeAPIReady = function () {
            cb();
        };
    }

    function showBadge(time) {
        badge.innerText =  time + " min";
        badge.className = badgeClasses;
        container.appendChild(badge);
    }
})();