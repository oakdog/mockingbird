/*
hashtags 	Array of Hashtag Objects
Represents hashtags which have been parsed out of the Tweet text.

media 	Array of Media Objects
Represents media elements uploaded with the Tweet.

urls 	Array of URL Objects
Represents URLs included in the text of a Tweet.

user_mentions 	Array of User Mention Objects
Represents other Twitter users mentioned in the text of the Tweet.

symbols 	Array of Symbol Objects
Represents symbols, i.e. $cashtags, included in the text of the Tweet.:

polls 	Array of Poll Objects
Represents Twitter Polls included in the Tweet.
*/
import TwitterObject from './TwitterObject';

class TwitterEntites {
  constructor(raw){
    const propAttrs = [
      { name : 'hashtags', type : 'Array of TwitterHashtag' },
      { name : 'media', type : 'Array of TwitterMedia' },
      { name : 'urls', type : 'Array of TwitterURL' },
      { name : 'user_mentions', type : 'Array of TwitterMention' },
      { name : 'symbols', type : 'Array of TwitterSymbol' },
      { name : 'polls', type : 'Array of TwitterPoll' },
    ];
    return TwitterObject.parse(raw,propAttrs);
  }
}

export default TwitterEntites;
