#!/var/www/worldnewsmap/data/ENV/bin/python
import os
import requests
import json
import time

temp_list = []

config_file = '../../config.json'
config_file = os.path.join(os.path.dirname(__file__), config_file)
config_json = json.load(open(config_file))
article_api = config_json['nyt_article_api_key']

'''PART 1: FETCH DATA FOR NYT'S 10 MOST RECENT ARTICLES'''
def get_news_data():

    # get 10 latest NYT World articles
    world_articles = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?fq=section_name:(%22World%22)%20AND%20source:(%22The%20New%20York%20Times%22)&fl=_id,web_url,headline,keywords,byline,multimedia,pub_date&sort=newest&api-key=' + article_api
    r1 = requests.get(world_articles)
    output = r1.json()['response']['docs']

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
        payload = {
            'q': place,
            'accept-language': 'en',
            'format': 'json',
            'limit': 1
            }
        geocode_req = requests.get(geocode_api, params=payload)
        geocode_json = geocode_req.json()

        # loop through location list in case initial value(s) not
        # identifiable by Nominatim
        if geocode_json:
            print 'Adding: ' + article['headline']['main']
            print 'NYT Locale: ' + article['locales'][i]
            print 'Place: ' + geocode_json[0]['display_name']
            assign_coordinates(article, geocode_json)
        else:
            print 'no geodata for ' + article['locales'][i] + ', trying location #' + str(i + 1)
            i += 1
            get_geodata(articles, article, i)
    else:
        # give up if nothing in the list matches Nominatim
        print 'no geo matches, removing this article'
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

        print 'checking........... ' + article['headline']['main']
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
    print 'writing to file...'
    write_to_file(articles)


if __name__ == '__main__':
    main()
