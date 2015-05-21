import webapp2
import json
import urllib2
import hmac
from google.appengine.api import memcache
import logging
from lxml.html import fromstring
import re
import math

cacheTtl = 3600

class TimeResolver(webapp2.RequestHandler):
    def get(self):
        result = []
        links = self.request.params.get('links')

        if links is not None:
            links = json.loads(links)

            for link in links:
                linkHash = hmac.new(str(link)).hexdigest()

                cacheKey = 'links:{}'.format(linkHash)

                time = memcache.get(cacheKey)

                if time is None:
                    time = self.getTimeForReadArticle(link)
                    memcache.add(key=cacheKey, value=time, time=cacheTtl)
                    logging.info('FETCHED')
                else:
                    logging.info('RESTORE FROM CACHE')

                result.append({
                    'href': link,
                    'time': time
                })

        self.response.headers.add_header("Access-Control-Allow-Origin", "*")
        self.response.headers['Content-Type'] = 'application/json'
        self.response.write(json.dumps(result))

    def getTimeForReadArticle(self, url):
        result = 0
        wordsPerMinute = self.request.params.get('words_per_minute')

        if wordsPerMinute is None:
            wordsPerMinute = 180

        content = self.getUrlContent(url)
        page = fromstring(content)

        divs = page.find_class('content')
        if len(divs):
            div = divs[0]
            text = div.text_content()
            words = text.split()

            result = int(math.ceil(float(len(words)) / float(wordsPerMinute)))

        return result

    def getUrlContent(self, url):
        request = urllib2.urlopen(url)
        response = request.read()
        return response

debug = False

app = webapp2.WSGIApplication([
    ('/resolve', TimeResolver)
], debug=debug)