/*
  Display recent posts under the current filters.
*/
import React from 'react';
import { connect } from 'react-redux';
import ElmBase from './ElmBase';
import ElmStatus from '../tw/elm/ElmStatus';
import CategoryStore from '../cat/CategoryStore';
import ExpressTalk from '../tw/ExpressTalk';

class ElmTimeline extends ElmBase {
  constructor(props){
    super(props);
    this.state = {
      search : props.search ? props.search : {
        str : '',
        results : {
          statuses : []
        }
      }
    };
    //console.log('ElmTimeline.constructor() props.search:'+JSON.stringify(props.search,null,' '));
  }
  loadSampleCategories(e){
    //console.log('ElmTimeline.loadSampleCategories()')
    this.halt(e);
    let init = ExpressTalk.initObj();
    fetch('Mockingbird_Categories.json',init)
    .then( res => {
      /*res.text().then(resText=>{
        console.log('ElmTimeline.loadSampleCategories() res:'+resText);
      });*/
      return res.json();
      //return JSON.parse(res.text());
    }).then( resJson => {
      //console.log(' ElmTimeline.loadSampleCategories() : resJson:"'+JSON.stringify(resJson)+'"');
      this.props.categoriesLoad( resJson ) ;
    } );
  }
  render() {
    //console.log("ElmTimeline.render()\r\nstatuses = "+JSON.stringify(this.props.search.results.statuses,null,' '));

    let {stored,selected}=this.props,qid=null,i;
    for (i in stored){
      if (stored[i].q===selected){ qid=i; break; }
    }
    if (null===qid) qid = stored.length-1;
    //console.log('ElmTimeline.render() qid:'+qid+' selected:'+selected);
    if (stored[qid]) {
      //console.log('ElmTimeline.render() q:'+stored[qid].q+' search:'+JSON.stringify(stored[qid],null,' '));
    }
    let search = stored[qid]?stored[qid]:null;
    const statuses = search?search.results.statuses.map(s=><ElmStatus qid={qid} sid={s['id_str']} key={s['id_str']} />):null;
    return (
      <div id="timeline">
        <h2>{search&&''!==search.q?'Search:'+search.q:'(Search Results)'}</h2>
        {statuses ? statuses : (<div className="timelineText">
          <p>Mockingbird is a tool for storing, organizing, &amp; using
          information from/for Twitter search. Load up some
          &nbsp;<a onClick={e=>this.loadSampleCategories(e)}>sample categories</a>&nbsp; or
          make your own, perform some searches, add some users, terms, tweets,
          hashtags, etc. to your categories, and save the results to a file.</p>
          <p>Show tools for changing/using categories &amp; their terms by clicking
          on each. The same goes for links in search results - click to show how
          they can be used in search &amp; categories.</p>
        </div>)}
      </div>
    );
  }
}
export default connect(
  (state)=>({
    selected : state.srch.selected,
    stored : state.srch.stored
  }),
  dispatch=>({
    categoriesLoad : catsData => CategoryStore.categoriesLoad(catsData,dispatch),
  })
)(ElmTimeline);
