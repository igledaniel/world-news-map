##World News Map

An app that uses the [New York Times Article
API](http://developer.nytimes.com/docs/read/article_search_api_v2), along with
OpenStreetMap's [Nominatim](http://wiki.openstreetmap.org/wiki/Nominatim)
reverse geocoding service, to place New York Times world news stories on a world
map.

To get it running locally, do the following:

  1. `git clone git@github.com:nsonnad/world-news-map.git`
  2. run the `./setup` shell script
  3. Put your NYT Article API-V2 API key in the newly created `config.json`
  file.
  4. To fetch some data, run `update_news_data`, which lives in the `app/data`
  directory.
  5. To run a local server, do `grunt server`
