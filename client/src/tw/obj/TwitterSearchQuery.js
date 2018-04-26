/*
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

  TODO: Twitter expects URI encoding so which type?
  There are two basic types available to Javascript.
    encodeURI() : basic
    encodeURIComponent() : more characters
  A polyfil for the newest http://tools.ietf.org/html/rfc3986
    function fixedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
      return '%' + c.charCodeAt(0).toString(16);
    });
}
*/
class TwitterSearchQuery{
  constructor(term){
    this.terms = [];
    this.phrases = [];
    this.hashtags = [];
    this.mentions = [];
    this.froms = [];
    this.lists = [];
    this.tos = [];
    this.filters = [];
    this.filterTypes = [
      'safe',
      'media',
      'retweets',
      'native_video',
      'periscope',
      'vine',
      'images',
      'twimg'
    ];
    this.urls = [];
    this.since = null;
    this.until = null;
    this.interrogative = false;
  }

  // regex shorthands
  dateChk(str){
    return /^[12][90]\d{2}-[123]?[1-9]-[123]?[1-9]$/.test(str);
  }
  scrnNmChk(sn){
    return /^[a-zA-Z\d_]{1,64}$/.test(sn);
  }
  termChk(str){
    return /^[^":@\(\)\?\s]+$/.test(str);
  }

  // Add entites to arrays
  addTerm(term,negate=false){
    if ( this.termChk(term) && !this.terms.filter(t=>t[0]===term).length ){
      this.terms = [ ...this.terms, [ term, negate ] ];
    }
  }
  deleteTerm(term){
    this.terms = this.terms.filter( t => t[0]!==term );
  }
  addPhrase(phrase,negate=false){
    if ( /^[^":@\(\)\?]+$/.test(phrase) && !this.phrases.filter(t=>t[0]===phrase).length ){
      this.phrases = [ ...this.phrases, [ phrase, negate ] ];
    }
  }
  deletePhrase(phrase){
    this.phrases = this.phrases.filter( p => p[0]!==phrase );
  }
  addHashtag(tag,negate=false){
    if ( this.termChk(tag) && !this.hashtags.filter(t=>t[0]===tag).length ){
      this.hashtags = [ ...this.hashtags, [ tag, negate ] ];
    }
  }
  deleteHashtag(tag){
    this.hashtags = this.hashtags.filter( t => t[0]!==tag );
  }
  addMention(sn,negate=false){
    if ( this.scrnNmChk(sn) && !this.mentions.filter(m=>m[0]===sn).length ){
      this.mentions = [ ...this.mentions, [ sn, negate ] ];
    }
  }
  deleteMention(sn){
    this.mentions = this.mentions.filter( m => m[0]!==sn );
  }
  addFrom(sn,negate=false){
    if ( this.scrnNmChk(sn) && !this.froms.filter(f=>f[0]===sn).length ){
      this.froms = [ ...this.froms, [ sn, negate ] ];
    }
  }
  deleteFrom(sn){
    this.froms = this.froms.filter( f => f[0]!==sn );
  }
  // TODO: WARNING: don't know how lists work. I don't think it's just a screen_name.
  addList(sn,negate=false){
    if ( this.scrnNmChk(list) && !this.lists.filter(l=>l[0]===list).length ){
      this.lists = [ ...this.lists, [ list, negate ] ];
    }
  }
  deleteList(sn){
    this.lists = this.lists.filter( l => l[0]!==sn );
  }
  addTo(sn,negate=false){
    if ( this.scrnNmChk(sn) && !this.tos.filter(t=>t[0]===sn).length ){
      this.tos = [ ...this.tos, [ sn, negate ] ];
    }
  }
  deleteTo(sn){
    this.tos = this.tos.filter( t => t[0]!==sn );
  }
  addFilter(filter,negate=false){
    if ( filterTypes.filter(t=>t===filter).length ){
      this.filters = [ ...this.filters, [ filter, negate ] ];
    }
  }
  deleteFilter(filter){
    this.filters = this.filters.filter( f => f[0]!==filter );
  }
  // Does Twitter handle the :// and ? parts of URLs?
  addURL(containing,negate=false){
    if (/^[^@"'\(\)\?\s]+$/.test(containing)){
      this.urls = [ ...this.urls, [ containing, negate ] ];
    }
  }
  deleteURL(containing){
    this.urls = this.urls.filter( t => t[0]!==containing );
  }

  // single-entity getter/setters
  set since(date){
    if (dateChk(date)) this.sinceDate = new Date(date);
  }
  get since(date){
    return this.sinceDate ? 'since:'+this.sinceDate.toString() : '';
  }
  set until(date){
    if (dateChk(date)) this.untilDate = new Date(date);
  }
  get until(){
    return this.untilDate ? 'until:'+this.untilDate.toString() : '';
  }
  set interrogative(isQuestion){
    this.isQuestion = Boolean(isQuestion);
  }
  get interrogative(){
    return this.isQuestion ? '?' : '';
  }


  // output
  fixedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(
      /[!'()*]/g,
      c => '%'+c.charCodeAt(0).toString(16)
    );
  }
  get composed(){
    let toStr = (arr,prefix,suffix) => {
      let a = arr.map( e => [ (prefix?prefix:'')+e+(suffix?suffix:''), e[1] ])
        .map( e => e[1]?e[0]:'-'+e[0] );
      let s = a.join(' ');
      return ''!=s?s+' ':s;
    };
    return fixedEncodeURIComponent(
      toStr( this.terms ) +
      toStr( this.phrases,'"','"') +
      toStr( this.hashtags,'#') +
      toStr( this.mentions,'@') +
      toStr( this.froms,'from:') +
      toStr( this.lists,'list:') +
      toStr( this.tos,'to:') +
      toStr( this.filters,'filters:') +
      toStr( this.urls,'url:') +
      this.since +
      this.until +
      this.interrogative
    );
  }
}
