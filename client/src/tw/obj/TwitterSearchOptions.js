/*
q 	required
A UTF-8, URL-encoded search query of 500 characters maximum, including operators. Queries may additionally be limited by complexity.

geocode 	optional
Returns tweets by users located within a given radius of the given latitude/longitude. The location is preferentially taking from the Geotagging API, but will fall back to their Twitter profile. The parameter value is specified by ” latitude,longitude,radius ”, where radius units must be specified as either ” mi ” (miles) or ” km ” (kilometers). Note that you cannot use the near operator via the API to geocode arbitrary locations; however you can use this geocode parameter to search near geocodes directly. A maximum of 1,000 distinct “sub-regions” will be considered when using the radius modifier.

lang 	optional
Restricts tweets to the given language, given by an ISO 639-1 code. Language detection is best-effort.

locale 	optional 	Specify the language of the query you are sending (only ja is currently effective). This is intended for language-specific consumers and the default should work in the majority of cases.

result_type 	optional
Specifies what type of search results you would prefer to receive. The current default is “mixed.” Valid values include:
  * mixed : Include both popular and real time results in the response.
  * recent : return only the most recent results in the response
  * popular : return only the most popular results in the response.

count 	optional
The number of tweets to return per page, up to a maximum of 100. Defaults to 15. This was formerly the “rpp” parameter in the old Search API.

until 	optional
Returns tweets created before the given date. Date should be formatted as YYYY-MM-DD. Keep in mind that the search index has a 7-day limit. In other words, no tweets will be found for a date older than one week. 	  	2015-07-19
since_id 	optional 	Returns results with an ID greater than (that is, more recent than) the specified ID. There are limits to the number of Tweets which can be accessed through the API. If the limit of Tweets has occured since the since_id, the since_id will be forced to the oldest ID available.

max_id 	optional
Returns results with an ID less than (that is, older than) or equal to the specified ID.

include_entities 	optional
The entities node will not be included when set to false.

TODO: WARNING: Types aren't provided. This isn't the same kind of Object as a Tweet, et al,
but these might be useful when sending searches, so look up types, and maybe expose the props.
*/
class TwitterSearchOptions {
  constructor(raw){
    if (!raw['q']) return null;
    let r = { q : raw['q'] };
    if (raw['geocode']) r['geocode'] = raw['geocode'];
    if (raw['lang']) r['lang'] = raw['lang'];
    if (raw['locale']) r['locale'] = raw['locale'];
    if (raw['result_type']) r['result_type'] = raw['result_type'];
    if (raw['count']) r['count'] = raw['count'];
    if (raw['until']) r['until'] = raw['until'];
    if (raw['max_id']) r['max_id'] = raw['max_id'];
    if (raw['include_entities']) r['include_entities'] = raw['include_entities'];
    return r;
  }
}
export default TwitterSearchOptions;
