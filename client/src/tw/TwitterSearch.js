/* Perform Twitter search queries & manage the results

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
import ExpressTalk from './ExpressTalk';
import * as actions from './TwitterSearchActions';
import * as str from './TwitterSearchActionStrs';

class TwitterSearch {
  static qCreate(str,dispatch){
    dispatch( actions.qCreate(str) );
  }
  static qAddTo(str,dispatch){
    dispatch( actions.qAddTo(str) );
  }
  static qSetSelected(str,dispatch){
    dispatch( actions.qSetSelected(str));
  }
  static create(q,count,dispatch){
    //console.log('TwitterSearch.create(q:"'+q+'",count:'+count+')');
    let init = ExpressTalk.initObj( {q:q,count:count} );
    //console.log('TwitterSearch.create() : init:'+JSON.stringify(init));
    //fetch('/twit/search',init)
    fetch('./mockingbird.php',init)
    .then( res => {
      /*res.text().then(resText=>{
        //console.log('TwitterSearch.create() res:'+resText);
      });*/
      return res.json();
    }).then( resJson => {
      //console.log(' TwitterSearch.create() : resJson:"'+JSON.stringify(resJson)+'"');
      dispatch( actions.sCreate( q, resJson ) );
    } );
  }
  static addTo(q,count,dispatch){
    //console.log('TwitterSearch.addTo(str:"'+str+'",count:'+count+')');
    let init = ExpressTalk.initObj({q:q,count:count});
    //console.log('TwitterSearch.addTo() : init:'+JSON.stringify(init));
    fetch('/twit',init)
    .then( res => {
      //console.log(' TwitterSearch.addTo() : res:"'+JSON.stringify(res)+'"');
      return res.json().then( resJson => {
        //console.log(' TwitterSearch.addTo() : resJson:"'+JSON.stringify(resJson)+'"');
        dispatch(actions.sAddTo(q,resJson.data));
      });
    });
  }
  static replace(q,count,dispatch){
    //console.log('TwitterSearch.replace(str:"'+str+'",count:'+count+')');
    let init = ExpressTalk.initObj({q:q,count:count});
    //console.log('TwitterSearch.replace() : init:'+JSON.stringify(init));
    fetch('/twit',init)
    .then( res => {
      //console.log(' TwitterSearch.replace() : res:"'+JSON.stringify(res)+'"');
      return res.json().then( resJson => {
        //console.log(' TwitterSearch.replace() : resJson:"'+JSON.stringify(resJson)+'"');
        dispatch(actions.sReplace( q, resJson.data ));
      });
    });
  }
  static discard(q,dispatch){
      //console.log('TwitterSearch.discard(str:"'+str+'")');
      dispatch(actions.sDiscard(q));
  }
  static reducer(state={query:'',selected:'',stored:[]},action){
    //console.log('TwitterSearch.reducer() action:'+JSON.stringify(action,null,' '));
    //console.log('TwitterSearch.reducer() action:'+JSON.stringify(action,null,' ')+' state:'+JSON.stringify(state,null,' '));
    let searchesFiltered = state.stored.filter(s=>s.q!==action.q),
      filteredSearch = state.stored.filter(s=>s.q===action.q);
    filteredSearch = filteredSearch.length ? filteredSearch[0] : null;
    let rStore = null, rQuery = null, rSelected = null;
    //console.log('TwitterSearch.reducer() : filteredSearch:'+filteredSearch);
    switch (action.type) {
      case str.qCreate : //console.log('TwitterSearch.reducer() qCreate');
        rQuery = action.str;
        break;
      case str.qAddTo : //console.log('TwitterSearch.reducer() qAddTo');
        rQuery = state.query+' '+action.str;
        break;
      case str.qSetSelected : //console.log('TwitterSearch.reducer() qSetSelected');
        rSelected = state.stored.filter(ss=>action.str===ss.q);
        rSelected = rSelected.length ? action.str : null;
        break;
      case str.sCreate :
        if (!filteredSearch) {
          //console.log('TwitterSearch.reducer() : reached state assignment');
          rStore = [...state.stored, {
            q : action.q,
            results : action.results
          } ];
        }
        break;
      case str.sAddTo :
        if (filteredSearch) {
          rStore = [ ...state.stored, { search : [ {
            q : action.q,
            results : Object.assign({},filteredSearch.results,action.results)
          } ].concat(searchesFiltered) } ];
        }
        break;
      case str.sReplace :
        if (filteredSearch) {
          rStore = [...state.stored, { search : [ {
            q : action.q,
            results : action.results
          } ].concat(searchesFiltered) } ];
        }
        break;
      case str.sDiscard :
        if (filteredSearch) {
          rStore = [...state.stored, {search:searchesFiltered.slice(0)} ];
        }
        break;
      default :
        break;
    }
    return {
      query : rQuery ? rQuery : state.query,
      selected: rSelected ? rSelected : state.selected,
      stored : rStore ? rStore : [ ...state.stored ]
    };
  }
}

export default TwitterSearch;
