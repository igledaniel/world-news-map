import requests, json, urllib, time
from collections import defaultdict
from pprint import pprint
from datetime import datetime, timedelta

temp_list = []

'''PART 1: FETCH DATA FOR NYT'S 10 MOST RECENT ARTICLES'''

def get_news_data():
    # api key
    article_api = ''

    # get 10 latest NYT World articles
    world_articles1 = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=section_name:(%22World%22)%20AND%20source:(%22The%20New%20York%20Times%22)&fl=_id,web_url,headline,keywords,byline,multimedia,pub_date&sort=newest&api-key=' + article_api
    r1 = requests.get(world_articles1)
    output1 = r1.json()['response']['docs']
    output = output1

    # world_articles2 = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=section_name:(%22World%22)%20AND%20source:(%22The%20New%20York%20Times%22)&fl=_id,web_url,headline,keywords,byline,multimedia,pub_date&sort=newest&page=1&api-key=' + article_api
    # world_articles3 = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=section_name:(%22World%22)%20AND%20source:(%22The%20New%20York%20Times%22)&fl=_id,web_url,headline,keywords,byline,multimedia,pub_date&sort=newest&page=2&api-key=' + article_api
    # world_articles4 = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=section_name:(%22World%22)%20AND%20source:(%22The%20New%20York%20Times%22)&fl=_id,web_url,headline,keywords,byline,multimedia,pub_date&sort=newest&page=3&api-key=' + article_api
    # world_articles5 = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=section_name:(%22World%22)%20AND%20source:(%22The%20New%20York%20Times%22)&fl=_id,web_url,headline,keywords,byline,multimedia,pub_date&sort=newest&page=4&api-key=' + article_api
    # world_articles6 = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=section_name:(%22World%22)%20AND%20source:(%22The%20New%20York%20Times%22)&fl=_id,web_url,headline,keywords,byline,multimedia,pub_date&sort=newest&page=5&api-key=' + article_api
    # world_articles7 = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=section_name:(%22World%22)%20AND%20source:(%22The%20New%20York%20Times%22)&fl=_id,web_url,headline,keywords,byline,multimedia,pub_date&sort=newest&page=6&api-key=' + article_api
    # world_articles8 = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=section_name:(%22World%22)%20AND%20source:(%22The%20New%20York%20Times%22)&fl=_id,web_url,headline,keywords,byline,multimedia,pub_date&sort=newest&page=7&api-key=' + article_api
    # world_articles9 = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=section_name:(%22World%22)%20AND%20source:(%22The%20New%20York%20Times%22)&fl=_id,web_url,headline,keywords,byline,multimedia,pub_date&sort=newest&page=8&api-key=' + article_api
    # world_articles10 = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=section_name:(%22World%22)%20AND%20source:(%22The%20New%20York%20Times%22)&fl=_id,web_url,headline,keywords,byline,multimedia,pub_date&sort=newest&page=9&api-key=' + article_api

    # r2 = requests.get(world_articles2)
    # r3 = requests.get(world_articles3)
    # r4 = requests.get(world_articles4)
    # r5 = requests.get(world_articles5)
    # r6 = requests.get(world_articles6)
    # r7 = requests.get(world_articles7)
    # r8 = requests.get(world_articles8)
    # r9 = requests.get(world_articles9)
    # r10 = requests.get(world_articles10)

    # output2 = r2.json()['response']['docs']
    # output3 = r3.json()['response']['docs']
    # output4 = r4.json()['response']['docs']
    # output5 = r5.json()['response']['docs']
    # output6 = r6.json()['response']['docs']
    # output7 = r7.json()['response']['docs']
    # output8 = r8.json()['response']['docs']
    # output9 = r9.json()['response']['docs']
    # output10 = r10.json()['response']['docs']

    # output = output1 + output2 + output3 + output4 + output5 + output6 + output7 + output8 + output9 + output10

    return output


def remove_no_geo(articles):

    def has_geo(article):
        kwds = []
        for kw in article['keywords']:
            kwds.append(kw['name'])
        if any('glocations' in v for v in kwds):
            return True

    geo = [a for a in articles if has_geo(a)]

    return geo


def remove_no_lat_lon(articles):
    has_lat_lon = [a for a in articles if 'lat' in a.keys()]
    return has_lat_lon


'''PART 2: GEOCODE BASED ON RETURNED LOCATIONS'''

# nominatim api url
geocode_api = 'http://nominatim.openstreetmap.org/search'


# fetch geodata for locations from NYT articles
def get_geodata(articles, article, i):

    if i < len(article['locales']) and i < 3:
        place = article['locales'][i]
        # print place
        payload = {
            'q':place,
            'accept-language': 'en',
            'format': 'json',
            'limit': 1
            }
        geocode_req = requests.get(geocode_api, params=payload)
        geocode_json = geocode_req.json()

        # loop through location list in case initial value(s) not
        # identifiable by Nominatim
        if geocode_json:
            # print 'Adding: ' + article['headline']['main']
            # print 'NYT Locale: ' + article['locales'][i]
            # print 'Place: ' + geocode_json[0]['display_name']
            assign_coordinates(article, geocode_json)
        else:
            # print 'no geodata for ' + article['locales'][i] + ', trying location #' + str(i + 1)
            i += 1
            get_geodata(articles, article, i)
    else:
        # give up if nothing in the list matches Nominatim
        # print 'no geo matches, removing this article'
        articles.remove(article)


# assign place name, lat, lon to json
def assign_coordinates(article, geodata):
    temp_list.append({
            'headline': article['headline']['main'],
            'locales': article['locales'],
            'date': article['pub_date'][:10],
            'url': article['web_url'],
            'thumbnail': article['thumbnail'],
            '_id': article['_id'],
            'place_name': geodata[0]['display_name'],
            'lat': geodata[0]['lat'],
            'lon': geodata[0]['lon'],
        })


# do above for each article
def loop_geodata(articles):
    for article in articles:
        time.sleep(1.3)
        locales = [kw['value'] for kw in article['keywords'] if 'glocations' in kw.values()]
        article['locales'] = locales

        if article['multimedia']:
            thumbnail = [mm['url'] for mm in article['multimedia'] if mm['subtype'] == 'thumbnail'][0]
            article['thumbnail'] = thumbnail
        else:
            article['thumbnail'] = None

        # print 'checking........... ' + article['headline']['main']
        get_geodata(articles, article, 0)

    return articles


# find news items that don't exist in current list
def add_new_items():
    # get new stuff with geo, as well as old stuff
    fetch_new = get_news_data()
    filter_no_geo = remove_no_geo(fetch_new)
    fetch_old = json.load(open('nyt_geo_temp.json'))

    for a in fetch_old:
        temp_list.append(a)

    # find the new articles
    ids = [a['_id'] for a in fetch_old]
    new_articles = [a for a in filter_no_geo if a['_id'] not in ids]
    new_articles = [a for a in filter_no_geo]

    # get geodata for new articles
    loop_geodata(new_articles)

    # make sure nothing slipped through
    finalize = remove_no_lat_lon(temp_list)

    # limit size of final article list
    chop = finalize[:500]

    return chop


def write_to_file(articles):
    with open('nyt_geo_temp.json', 'w') as f:
        json.dump(temp_list, f)


def main():
    articles = add_new_items()
    # pprint(articles)
    # print 'writing to file...'
    write_to_file(articles)


if __name__ == '__main__':
    main()
