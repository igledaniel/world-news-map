import requests, json, urllib, time
from collections import defaultdict
from pprint import pprint

output_master = {}

'''PART 1: FETCH DATA FOR NYT'S 50 MOST RECENT ARTICLES'''

def get_news_data():
    # api key
    article_api = ''

    # get 10 latest NYT World articles
    world_articles1 = 'http://api.nytimes.com/svc/search/v1/article?query=nytd_section_facet:[World]&fields=date,title,geo_facet,url,byline,small_image_url&offset=0&api-key=' + article_api
    # world_articles2 = 'http://api.nytimes.com/svc/search/v1/article?query=nytd_section_facet:[World]&fields=date,title,geo_facet,url,byline,small_image_url&offset=1&api-key=' + article_api
    # world_articles3 = 'http://api.nytimes.com/svc/search/v1/article?query=nytd_section_facet:[World]&fields=date,title,geo_facet,url,byline,small_image_url&offset=2&api-key=' + article_api
    # world_articles4 = 'http://api.nytimes.com/svc/search/v1/article?query=nytd_section_facet:[World]&fields=date,title,geo_facet,url,byline,small_image_url&offset=3&api-key=' + article_api
    # world_articles5 = 'http://api.nytimes.com/svc/search/v1/article?query=nytd_section_facet:[World]&fields=date,title,geo_facet,url,byline,small_image_url&offset=4&api-key=' + article_api
    # world_articles6 = 'http://api.nytimes.com/svc/search/v1/article?query=nytd_section_facet:[World]&fields=date,title,geo_facet,url,byline,small_image_url&offset=5&api-key=' + article_api
    # world_articles7 = 'http://api.nytimes.com/svc/search/v1/article?query=nytd_section_facet:[World]&fields=date,title,geo_facet,url,byline,small_image_url&offset=6&api-key=' + article_api
    # world_articles8 = 'http://api.nytimes.com/svc/search/v1/article?query=nytd_section_facet:[World]&fields=date,title,geo_facet,url,byline,small_image_url&offset=7&api-key=' + article_api
    # world_articles9 = 'http://api.nytimes.com/svc/search/v1/article?query=nytd_section_facet:[World]&fields=date,title,geo_facet,url,byline,small_image_url&offset=8&api-key=' + article_api
    # world_articles10 = 'http://api.nytimes.com/svc/search/v1/article?query=nytd_section_facet:[World]&fields=date,title,geo_facet,url,byline,small_image_url&offset=9&api-key=' + article_api

    # get results
    r1 = requests.get(world_articles1)
    # r2 = requests.get(world_articles2)
    # r3 = requests.get(world_articles3)
    # r4 = requests.get(world_articles4)
    # r5 = requests.get(world_articles5)
    # r6 = requests.get(world_articles6)
    # r7 = requests.get(world_articles7)
    # r8 = requests.get(world_articles8)
    # r9 = requests.get(world_articles9)
    # r10 = requests.get(world_articles10)

    # jsonize results
    output1 = r1.json()['results']
    # output2 = r2.json()['results']
    # output3 = r3.json()['results']
    # output4 = r4.json()['results']
    # output5 = r5.json()['results']
    # output6 = r6.json()['results']
    # output7 = r7.json()['results']
    # output8 = r8.json()['results']
    # output9 = r9.json()['results']
    # output10 = r10.json()['results']

    # output = output1 + output2 + output3 + output4 + output5 + output6 + output7 + output8 + output9 + output10
    output = output1

    return output


def remove_no_geo(articles):
    geo = [a for a in articles if 'geo_facet' in a.keys()]
    return geo


def remove_no_lat_lon(articles):
    has_lat_lon = [a for a in articles if 'lat' in a.keys()]
    return has_lat_lon


'''PART 2: GEOCODE BASED ON RETURNED LOCATIONS'''

# nominatim api url
geocode_api = 'http://nominatim.openstreetmap.org/search'


# fetch geodata for locations from NYT articles
def get_geodata(articles, article, i):
    if i < len(article['geo_facet']):
        place = article['geo_facet'][i]
        print place
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
            print 'writing ' + article['title']
            assign_coordinates(article, geocode_json)
        elif i < 3:
            i += 1
            print 'no data, trying location #' + str(i + 1)
            get_geodata(articles, article, i)
        else:
            # give up after third try
            print 'no luck, removing this article'
            articles.remove(article)
    else:
        # give up if nothing in the list matches Nominatim
        print 'no luck, removing this article'
        articles.remove(article)


# assign place name, lat, lon to json
def assign_coordinates(article, geodata):

    article['place_name'] = geodata[0]['display_name']
    article['lat'] = geodata[0]['lat']
    article['lon'] = geodata[0]['lon']

    return article


# do above for each article
def loop_geodata(articles):
    for article in articles:
        print article['geo_facet']
        time.sleep(1.3)
        get_geodata(articles, article, 0)

    return articles


# find news items that don't exist in current list
def add_new_items():
    # get new stuff with geo, as well as old stuff
    fetch_new = get_news_data()
    filter_no_geo = remove_no_geo(fetch_new)
    fetch_old = json.load(open('nyt_geo_temp.json'))

    # find the new articles
    urls = [a['url'] for a in fetch_old['articles']]
    new_articles = [a for a in filter_no_geo if a['url'] not in urls]

    # get geodata for new articles
    new_geo = loop_geodata(new_articles)

    # combine the new stuff and make sure it has lat and lon
    updated = new_geo + fetch_old['articles']
    finalize = remove_no_lat_lon(updated)

    # limit size of final article list
    chop = finalize[:250]

    return chop

# create json object of counts for each geo_facet
def geo_facet_loop(articles):
    temp_dict = {}
    temp_list = []

    for article in articles:
        for place in article['geo_facet']:
            if place not in temp_dict.keys():
                temp_dict[place] = 1
            else:
                temp_dict[place] += 1

    for k, v in temp_dict.items():
        temp_list.append({'name': k, 'count': v})

    return temp_list


def write_to_file(articles):
    with open('nyt_geo_temp.json', 'w') as f:
        json.dump(articles, f)


def main():
    articles = add_new_items()
    output_master['articles'] = articles
    output_master['geo_facets'] = geo_facet_loop(articles)

    write_to_file(output_master)


if __name__ == '__main__':
    main()
