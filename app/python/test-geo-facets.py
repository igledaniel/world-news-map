import requests, json, urllib, time
from collections import defaultdict

output_master = {}
temp_dict = {}
output_master['geo_facet'] = []

json = json.load(open('nyt_geo.json'))

for article in json:
    for place in article['geo_facet']:
        if place not in temp_dict.keys():
            temp_dict[place] = 1
        else:
            temp_dict[place] += 1

for k, v in temp_dict.items():
    output_master['geo_facet'].append({k: v})

print output_master
