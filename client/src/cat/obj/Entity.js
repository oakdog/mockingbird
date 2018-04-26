import * as util from './IsEntity';
class Entity {
  constructor(valOrProps) {
    if ('object'===typeof valOrProps){
      this.neg = valOrProps.neg;
      this.type = valOrProps.type;
      this.value = valOrProps.value;
      if (!this.isEntity(this.str)) throw new Error("Entity.constructor() props object failed to produce a valid Entity.");
    } else if ( this.isEntity(valOrProps) ){
      this.str = valOrProps;
    } else {
      throw new Error("Entity.constructor() isEntity failed for e:"+JSON.stringify(valOrProps));
    }
  }
  set str(s){
    const props = this.props(s);
    this.neg = props.neg;
    this.type = props.type;
    this.value = props.value;
  }
  get str(){
    return (this.neg?'-':'')+(0<this.type.length?1===this.type.length?this.type:this.type+':':'')+this.value;
  }
  props(value){
    if (!value) throw new Error();
    const neg = value && 0===value.indexOf('-'),
      colon = value && value.indexOf(':');
    const typ = value ? this.checkedType(
      value.slice(
        neg ? 1 : 0,
        -1!==colon ? colon : neg ? 2 : 1
      )
    ) : '';
    return {
      neg : neg,
      type : typ,
      value : value ? value.slice(
        -1!==colon&&''!==typ ? colon+1 : (neg?1:0)+typ.length,
        value.length
      ) : ''
    };
  }
  checkedType(str){
    switch (str) {
      case 'from' :
      case 'to' :
      case 'url' :
      case 'since' :
      case 'until' :
      case 'filter' :
      case '@' :
      case '#' :
      case '$' :
        return str;
      default:
        return '';
    }
  }
  isEntity(e){
    return util.IsEntity(e);
  }
  clone(){
    return new Entity(this.str);
  }
}
export default Entity;
/*

Operator 	Finds Tweets...
watching now 	containing both “watching” and “now”. This is the default operator.
“happy hour” 	containing the exact phrase “happy hour”.
love OR hate 	containing either “love” or “hate” (or both).
beer -root 	containing “beer” but not “root”.
#haiku 	containing the hashtag “haiku”.
from:interior 	sent from Twitter account “interior”.
list:NASA/astronauts-in-space-now 	sent from a Twitter account in the NASA list astronauts-in-space-now
to:NASA 	a Tweet authored in reply to Twitter account “NASA”.
@NASA 	mentioning Twitter account “NASA”.
politics filter:safe 	containing “politics” with Tweets marked as potentially sensitive removed.
puppy filter:media 	containing “puppy” and an image or video.
puppy -filter:retweets 	containing “puppy”, filtering out retweets
puppy filter:native_video 	containing “puppy” and an uploaded video, Amplify video, Periscope, or Vine.
puppy filter:periscope 	containing “puppy” and a Periscope video URL.
puppy filter:vine 	containing “puppy” and a Vine.
puppy filter:images 	containing “puppy” and links identified as photos, including third parties such as Instagram.
puppy filter:twimg 	containing “puppy” and a pic.twitter.com link representing one or more photos.
hilarious filter:links 	containing “hilarious” and linking to URL.
puppy url:amazon 	containing “puppy” and a URL with the word “amazon” anywhere within it.
superhero since:2015-12-21 	containing “superhero” and sent since date “2015-12-21” (year-month-day).
puppy until:2015-12-21 	containing “puppy” and sent before the date “2015-12-21”.
movie -scary :) 	containing “movie”, but not “scary”, and with a positive attitude.
flight :( 	containing “flight” and with a negative attitude.
traffic ? 	containing “traffic” and asking a question.
*/
