import requests, time
from pprint import pprint
# import socket

# # following forces urlopen to ipv4
# # only used because my network fails on some ipv6 requests
# origGetAddrInfo = socket.getaddrinfo

# def getAddrInfoWrapper(host, port, family=0, socktype=0, proto=0, flags=0):
#     return origGetAddrInfo(host, port, socket.AF_INET, socktype, proto, flags)

# # replace the original socket.getaddrinfo by our version
# socket.getaddrinfo = getAddrInfoWrapper

req = 'http://nominatim.openstreetmap.org/search'

places = [
    'INDONESIA',
    'MYANMAR',
    'SOUTH KOREA',
    'JAPAN',
    'GAZA STRIP',
    'CHINA',
    'GUAM',
    'LAOS',
    'GREAT BRITAIN',
    'PERU'
]

for place in places:
    time.sleep(1.1)
    payload = {'q':place, 'accept-language': 'en', 'format': 'json'}
    r = requests.get(req, params=payload)
    json = r.json()
    name = json[0]['display_name']
    lat = json[0]['lat']
    lon = json[0]['lon']

    print name
    print lat, lon

