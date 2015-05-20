;(function () {
    'use strict';

    var badgeClasses = 'flag flag_recovery',
        badge = document.createElement('span'),
        container = document.querySelector('.post h1.title'),
        content = document.querySelector('.content'),
        averageWordsPerMinute = 180,
        contentLength = content.textContent.replace(/[\n\s]/g, '').length,
        wordsCount = content.textContent.replace(/\s+/g, ' ').split(' ').length;

    badge.innerText = Math.ceil(wordsCount / averageWordsPerMinute)  + " min";
    badge.className = badgeClasses;
    container.appendChild(badge);
})();