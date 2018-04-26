/* Component for a tweet/status
*/
import React from 'react';
import { connect } from 'react-redux';
import TwitterStatus from '../obj/TwitterStatus';
import ElmBase from '../../elm/ElmBase';
import ElmMedia from './ElmMedia';
import ElmMainCtrls from '../../elm/ElmMainCtrls';

class ElmStatus extends ElmBase {
  constructor(props){
    super(props);
    this.state = {
      o : new TwitterStatus(props.data)
    };
  }
  replaceEntities(txt){
    let elm = document.createElement('textarea');
    elm.innerHTML = txt;
    let r = elm.value;
    return r;
  }
  processText(o){
    const t = o['text']; // this.replaceEntities( o['text'] );
    const entities = o['extended_entities'] ?
      o['extended_entities'] : o['entities'] ?
        o['entities'] : [];

    let b, p, i, indices = [],
      a = ['hashtags','user_mentions','urls','symbols','media'];
    for (b in a) {
      for (p in entities[a[b]]) {
        i=0;
        while (i<indices.length) {
          if (indices[i]['indices'][0]>entities[a[b]][p]['indices'][0]) break;
          i++;
        }
        indices = [ ...indices.slice(0,i),
          Object.assign({type:a[b]},entities[a[b]][p]),
          ...indices.slice(i,indices.length)
        ];
      }
    }

    //console.log("ElmStatus.processText()\r\n\rindices : "+JSON.stringify(indices,null,' '));

    const ast = (str,ind) => { // unicode astral plane's double codepoint characters, adjusted index
      let ci=1,ai=0;
      while (ci<str.length&&ci<ind){
        if ( /^[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(str.substring(ci-1,ci+1)) ) ai++;
        ci++;
      }
      //console.log('ElmStatus.processText().ast() ind:'+ind+' ai:'+ai);
      return ind+ai;
    }
    // indices = indices.reverse();
    const add = (arr,inds,ind,txt,elm) => {
      let r = [ ...arr ];
      // initial text, if there's any before the first indices
      if ( ind===0 && ast(txt,inds[ind]['indices'][0])>0 ) {
        r = [ ...r, txt.slice(
          0,
          ast(txt,inds[ind]['indices'][0])
        ) ];
      }
      // current indexed/linked element
      r = [ ...r, elm ];
      // anteceeding text, if there is another index,
      // or if this index ends earlier than the text
      if (inds.length>ind+1) {
        r = [ ...r, txt.slice(
          ast(txt,inds[ind]['indices'][1]),
          ast(txt,inds[ind+1]['indices'][0])
        ) ];
      } else if (ast(txt,inds[ind]['indices'][1])<txt.length) {
        r = [ ...r, txt.slice(
          ast(txt,inds[ind]['indices'][1]),
          txt.length
        ) ];
      }
      //console.log('ElmStatus.processText().add() r:'+JSON.stringify(r.map(elm=>('string'===typeof elm ? elm : elm.toString())),null,' '));
      return r;
    };
    let ar = indices.length ? [ ] : [ t ];
    for (i in indices){
      i = Number(i);
      //console.log('ElmStatus.processText() indices['+i+'<'+(typeof i)+'>].from:'+indices[i].from)
      ar = add(ar,indices,i,t,(<ElmMainCtrls val={indices[i]}/>));
    }
    /* entitites { hashtags media urls user_mentions symbols polls } */
    for (b in ar){
      if ('string'===typeof ar[b]){
        ar[b] = this.replaceEntities(ar[b]);
      }
    }
    //console.log("ElmStatus.processText()\r\n\rar : "+JSON.stringify(ar,null,' '));
    return ar;
  }
  when(current, previous) {
    const secMs   = 1000;
    const minMs   = secMs * 60;
    const hrMs    = minMs * 60;
    const dayMs   = hrMs * 24;
    const wkMs  = dayMs * 7;
    const monMs   = dayMs * 30;
    var elapsed = current.getTime() - previous.getTime();
    if (elapsed < minMs) {
      return Math.round(elapsed/secMs) + 's';
    } else if (elapsed < hrMs) {
      return Math.round(elapsed/minMs) + 'm';
    } else if (elapsed < dayMs ) {
      return Math.round(elapsed/hrMs ) + 'hr';
    } else if (elapsed < wkMs) {
      return Math.round(elapsed/dayMs) + 'd';
    } else if (elapsed < monMs) {
      return Math.round(elapsed/wkMs) + 'd';
    }
    return previous.toString();
  }
  render(){
    const o = new TwitterStatus(this.props.data);
    //console.log('ElmStatus.render() : process text for id : '+o['id_str']);
    o['text'] = this.processText(o);
    //console.log("ElmStatus.render()\r\nthis.props.data:"+JSON.stringify(this.props.data,null,' '));
    const ent = o['extended_entities'] ?
      o['extended_entities'] : o['entities'] ?
        o['entities'] : [];
    const media = ent.media ? ent.media.map(m=><ElmMedia twObj={m} key={m['id_str']} />) : [],
      quo = o['quote_count']?(<span role="img" aria-label="quotes">&ldquo;&rdquo;{o['quote_count']}&nbsp;&nbsp;</span>):'',
      rep = o['reply_count']?(<span role="img" aria-label="replies">&#x1F4AC;{o['reply_count']}&nbsp;&nbsp;</span>):'',
      ret = o['retweeted']&&o['retweet_count']?(<span role="img" aria-label="retweets">&#x21ba;{o['retweet_count']}&nbsp;&nbsp;</span>):'',
      fav = o['favorited']&&o['favorite_count']?(<span role="img" aria-label="favorites">&#9825;{o['favorite_count']}&nbsp;&nbsp;</span>):'';
    return (<div className="twStatus">
      <p className="twStatusInfo">
        { o.user['default_profile_image'] || o.user['default_profile'] ? null :
          (<a href={'https://twitter.com/'+o.user['screen_name']} target="_blank" className="twProfileImg">
            <img src={o.user['profile_image_url']} alt="" />
          </a>) }
        <ElmMainCtrls val={{
          type : 'user',
          screen_name : o.user['screen_name'],
          name : o.user['name']
        }}/>
        { o.user['followers_count'] ? <span className="twUData">&#x21e4;{o.user['followers_count']}</span> : null }
        { o.user['friends_count'] ? <span className="twUData">&#x21a6;{o.user['friends_count']}</span> : null }
        { o.user['statuses_count'] ? <span className="twUData">&#x1F4aC;{o.user['statuses_count']}</span> : null }
        { o.user['favorites_count'] ? <span className="twUData">&#9825;{o.user['favorites_count']}</span> : null }
        { o.user['listed_count'] ? <span className="twUData">&#x205e;{o.user['listed_count']}</span> : null }
        { o.user['verified'] ? <span className="twVerifiedAcct">&#x2714;</span> : null }
        { o.user['protected'] ? <span className="twProtectedAcct">&#x1f512;</span> : null }<br/>
        <ElmMainCtrls val={{
          type : 'tweet',
          text : this.when( new Date(), new Date(o['created_at']) ),
          screen_name : o.user['screen_name'],
          id_str : o['id_str']
        }}/>&nbsp;
        {quo}{rep}{ret}{fav}&nbsp;
      </p>
      <pre className="twStatusText">{o['text']}</pre>
      {media.length?<div className="twMedia">{media}</div>:null}
    </div>);
    /*
    <a href={'https://twitter.com/'+o.user['screen_name']} contextMenu={'userTopMenu'+d} target="_blank">
      &nbsp;{o.user['name']}&nbsp;
      <ElmMainMenu id={'userTopMenu'+d} type={'User'} val={'@'+o.user['screen_name']} />
    </a>

    <a href={'https://twitter.com/'+o.user['screen_name']+'/status/'+o['id_str']} contextMenu={'statusMenu'+d} target="_blank">
      &nbsp;{this.when( new Date(), new Date(o['created_at']) )}&nbsp;
      <ElmMainMenu id={'statusMenu'+d} type={'Tweet'}
        val={'@'+o.user['screen_name']+':'+o['id_str']} />
    </a>&nbsp;
    */
  }
}
export default connect(
  (state,props) => {
    //console.log('ElmStatus.mapStateToProps() : props.qid<'+(typeof props.qid)+'>:'+props.qid+' srch.length:'+state.srch.length);
    return {
      data : state.srch.stored[props.qid].results.statuses.filter(s=>s['id_str']===props.sid)[0]
    };
  }
)(ElmStatus);

/*
entitites {
  hashtags
  media
  urls
  user_mentions
  symbols
  polls
}
{ name : 'created_at', type : 'String' },
{ name : 'id_str', type : 'String' },
{ name : 'text', type : 'String' },
{ name : 'source', type : 'String' },
{ name : 'truncated', type : 'Boolean' },
{ name : 'in_reply_to_status_id_str', type : 'String' },
{ name : 'in_reply_to_user_id_str', type : 'String' },
{ name : 'in_reply_to_screen_name', type : 'String' },
{ name : 'user', type : 'User' },
{ name : 'coordinates', type : 'Coordinates' },
{ name : 'place', type : 'Places' },
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
{ name : 'current_user_retweet', type : 'Object' },
{ name : 'scopes', type : 'Object' },
{ name : 'withheld_copyright', type : 'Boolean' },
{ name : 'withheld_in_countries', type : 'Array of String' },
{ name : 'withheld_scope', type : 'String' }
*/
