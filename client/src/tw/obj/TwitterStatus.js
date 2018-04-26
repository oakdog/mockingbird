import TwitterObject from './TwitterObject';
class TwitterStatus {
  constructor(raw){
    const propAttrs = [
      { name : 'created_at', type : 'String' },
      // { name : 'id', type : 'Int64' },
      { name : 'id_str', type : 'String' },
      { name : 'text', type : 'String' },
      { name : 'source', type : 'String' },
      { name : 'truncated', type : 'Boolean' },
      // { name : 'in_reply_to_status_id', type : 'Int64' },
      { name : 'in_reply_to_status_id_str', type : 'String' },
      // { name : 'in_reply_to_user_id', type : 'Int64' },
      { name : 'in_reply_to_user_id_str', type : 'String' },
      { name : 'in_reply_to_screen_name', type : 'String' },
      { name : 'user', type : 'User' },
      { name : 'coordinates', type : 'Coordinates' },
      { name : 'place', type : 'Places' },
      // { name : 'quoted_status_id', type : 'Int64' },
      { name : 'quoted_status_id_str', type : 'String' },
      { name : 'is_quote_status', type : 'Boolean' },
      { name : 'quoted_status', type : 'Tweet' },
      { name : 'retweeted_status', type : 'Tweet' },
      { name : 'quote_count', type : 'Int' },
      { name : 'reply_count', type : 'Int' },
      { name : 'retweet_count', type : 'Int' },
      { name : 'favorite_count', type : 'Int' },
      { name : 'entities', type : 'TwitterEntities' }, // 'entities' & 'extended_entities' are similar, but
      { name : 'extended_entities', type : 'TwitterEntities' }, // extended is preferred & can be longer.
      { name : 'favorited', type : 'Boolean' },
      { name : 'retweeted', type : 'Boolean' },
      { name : 'possibly_sensitive', type : 'Boolean' },
      { name : 'filter_level', type : 'String' },
      { name : 'lang', type : 'String' },
      // { name : 'matching_rules', type : 'Array of Rule' },
      { name : 'current_user_retweet', type : 'Object' },
      { name : 'scopes', type : 'Object' },
      { name : 'withheld_copyright', type : 'Boolean' },
      { name : 'withheld_in_countries', type : 'Array of String' },
      { name : 'withheld_scope', type : 'String' }
    ];
    let r = TwitterObject.parse(raw,propAttrs);
    //console.log('TwitterStatus : process text for id : '+r['id_str']);
    //r['text'] = this.processText(r);
    return r;
  }
}

export default TwitterStatus;

/*
created_at 	String
UTC time when this Tweet was created.

id 	Int64
The Integer representation of the unique identifier for this Tweet. This number is greater than 53 bits and some programming languages may have difficulty/silent defects in Interpreting it. Using a signed 64 bit Integer for storing this identifier is safe. Use id_str for fetching the identifier to stay on the safe side. See Twitter IDs, JSON and Snowflake .

id_str 	String
The String representation of the unique identifier for this Tweet. Implementations should use this rather than the large Integer in id.

text 	String
The actual UTF-8 text of the status update. See twitter-text for details on what characters are currently considered valid.

source 	String
Utility used to post the Tweet, as an HTML-formatted String. Tweets from the Twitter website have a source value of web.

truncated 	Boolean
Indicates whether the value of the text parameter was truncated, for example, as a result of a retweet exceeding the original Tweet text length limit of 140 characters. Truncated text will end in ellipsis, like this ... Since Twitter now rejects long Tweets vs truncating them, the large majority of Tweets will have this set to false . Note that while native retweets may have their toplevel text property shortened, the original text will be available under the retweeted_status Object and the truncated parameter will be set to the value of the original status (in most cases, false ).

in_reply_to_status_id 	Int64
Nullable. If the represented Tweet is a reply, this field will contain the Integer representation of the original Tweet’s ID.

in_reply_to_status_id_str 	String
Nullable. If the represented Tweet is a reply, this field will contain the String representation of the original Tweet’s ID.

in_reply_to_user_id 	Int64
Nullable. If the represented Tweet is a reply, this field will contain the Integer representation of the original Tweet’s author ID. This will not necessarily always be the user directly mentioned in the Tweet.

in_reply_to_user_id_str 	String
Nullable. If the represented Tweet is a reply, this field will contain the String representation of the original Tweet’s author ID. This will not necessarily always be the user directly mentioned in the Tweet.

in_reply_to_screen_name 	String
Nullable. If the represented Tweet is a reply, this field will contain the screen name of the original Tweet’s author.

user 	User Object
The user who posted this Tweet. See User data dictionary for complete list of attributes.

coordinates 	Coordinates
Nullable. Represents the geographic location of this Tweet as reported by the user or client application. The inner coordinates Array is formatted as geoJSON (longitude first, then latitude).

place 	Places
Nullable When present, indicates that the tweet is associated (but not necessarily originating from) a Place .

quoted_status_id 	Int64
This field only surfaces when the Tweet is a quote Tweet. This field contains the Integer value Tweet ID of the quoted Tweet.

quoted_status_id_str 	String
This field only surfaces when the Tweet is a quote Tweet. This is the String representation Tweet ID of the quoted Tweet.

is_quote_status 	Boolean
Indicates whether this is a Quoted Tweet.

quoted_status 	Tweet 	This field only surfaces when the Tweet is a quote Tweet. This attribute contains the Tweet Object of the original Tweet that was quoted.

retweeted_status 	Tweet 	Users can amplify the broadcast of Tweets authored by other users by retweeting . Retweets can be distinguished from typical Tweets by the existence of a retweeted_status attribute. This attribute contains a representation of the original Tweet that was retweeted. Note that retweets of retweets do not show representations of the Intermediary retweet, but only the original Tweet. (Users can also unretweet a retweet they created by deleting their retweet.)

quote_count 	Integer
Nullable. Indicates approximately how many times this Tweet has been quoted by Twitter users.

reply_count 	Int
Number of times this Tweet has been replied to.

retweet_count 	Int
Number of times this Tweet has been retweeted.

favorite_count 	Integer
Nullable. Indicates approximately how many times this Tweet has been liked by Twitter users.

entities 	Entities
Entities which have been parsed out of the text of the Tweet. Additionally see Entities in Twitter Objects .

extended_entities 	Extended Entities
When between one and four native photos or one video or one animated GIF are in Tweet, contains an Array 'media' metadata. Additionally see Entities in Twitter Objects .

favorited 	Boolean
Nullable. Indicates whether this Tweet has been liked by the authenticating user.

retweeted 	Boolean
Indicates whether this Tweet has been Retweeted by the authenticating user.

possibly_sensitive 	Boolean
Nullable. This field only surfaces when a Tweet contains a link. The meaning of the field doesn’t pertain to the Tweet content itself, but instead it is an indicator that the URL contained in the Tweet may contain content or media identified as sensitive content.

filter_level 	String
Indicates the maximum value of the filter_level parameter which may be used and still stream this Tweet. So a value of medium will be streamed on none, low, and medium streams.

lang 	String
Nullable. When present, indicates a BCP 47 language identifier corresponding to the machine-detected language of the Tweet text, or und if no language could be detected. See more documentation HERE.

matching_rules 	Array of Rule Objects
Present in filtered products such as Twitter Search and PowerTrack. Provides the id and tag associated with the rule that matched the Tweet. With PowerTrack, more than one rule can match a Tweet. See more documentation HERE.

Additional Tweet attributes
Twitter APIs that provide Tweets (e.g. the GET statuses/lookup endpoInt) may include these additional Tweet attributes:
Attribute 	Type 	Description
current_user_retweet 	Object

Perspectival Only surfaces on methods supporting the include_my_retweet parameter, when set to true. Details the Tweet ID of the user’s own retweet (if existent) of this Tweet.

scopes 	Object
A set of key-value pairs indicating the Intended contextual delivery of the containing Tweet. Currently used by Twitter’s Promoted Products.

withheld_copyright 	Boolean
When present and set to “true”, it indicates that this piece of content has been withheld due to a DMCA complaInt .

withheld_in_countries 	Array of String
When present, indicates a list of uppercase two-letter country codes this content is withheld from.

withheld_scope 	String
When present, indicates whether the content being withheld is the “status” or a “user.”
*/
