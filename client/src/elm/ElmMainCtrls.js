import React from 'react';
import { connect } from 'react-redux';
import ElmBase from './ElmBase';
import CategoryStore from '../cat/CategoryStore';
import TwitterSearch from '../tw/TwitterSearch';
class ElmMainCtrls extends ElmBase {
  constructor(props){
    super(props);
    this.state = {
      show : false
    };
  }
  categoryAddFromItem(ev,catStr){
    //console.log('ElmMainCtrls.categoryAddFromItem(catStr:'+catStr+')');
    this.halt(ev);
    this.props.categoryAdd(catStr);
  }
  entityAddFromItem(ev,catStr,entStr){
    //console.log('ElmMainCtrls.entityAddFromItem(catStr:'+catStr+', entStr:'+entStr+')');
    this.halt(ev);
    this.props.entityAdd(catStr,entStr);
  }
  entityAddFromSelect(ev,str){
    let {value}=ev.target;
    if (''!==value) this.entityAddFromItem(ev,ev.target.value,str);
  }
  newSearchFromItem(ev,str){
    //console.log('ElmMainCtrls.newSearchFromItem(str:'+str+')');
    this.halt(ev);
    this.props.qCreate(str);
  }
  addToSearchFromItem(ev,str){
    //console.log('ElmMainCtrls.addToSearchFromItem(str:'+str+')');
    this.halt(ev);
    this.props.qAddTo(str);
  }
  toggleCtrls(ev){
    this.halt(ev);
    this.setState({show:!this.state.show});
  }
  render(){
    let { val,cats } = this.props, a, togg, str, {show}=this.state,
      o = (<span role="img" aria-label="open lock">&nbsp;&#x1F513;</span>);
      //c = (<span role="img" aria-label="closed lock" style={{fontSize:'8px'}}>&nbsp;&#x1F512;</span>);
    switch(val.type){
      case 'hashtags' :
        str = val['text'];
        togg = (<a className="twCtrlTogg" href="" onClick={e=>this.toggleCtrls(e)}>#{str}{show?o:null}</a>);
        a = (<a href={'https://twitter.com/search?q=%23'+str} target="_blank"></a>);
        break;
      case 'user' :
      case 'user_mentions' :
        str = val['screen_name'];
        togg = (<a className="twCtrlTogg" href="" onClick={e=>this.toggleCtrls(e)}>@{val['name']}{show?o:null}</a>);
        a = (<a href={'https://twitter.com/'+str} target="_blank">@{val['name']}</a>);
        break;
      case 'urls' :
        str = val['expanded_url'];
        togg = (<a className="twCtrlTogg" href="" onClick={e=>this.toggleCtrls(e)}>{val['display_url']}{show?o:null}</a>);
        a = (<a href={str} target="_blank">{val['display_url']}</a>);
        break;
      case 'media' :
        str = val['expanded_url'];
        togg = (<a className="twCtrlTogg" href="" onClick={e=>this.toggleCtrls(e)}>{val['display_url']}{show?o:null}</a>);
        a = (<a href={str} target="_blank">{val['display_url']}</a>);
        break;
      case 'symbols' :
        str = val['text'];
        togg = (<a className="twCtrlTogg" href="" onClick={e=>this.toggleCtrls(e)}>${str}{show?o:null}</a>);
        a = (<a href={'https://twitter.com/search?q=%24'+str} target="_blank">${str}</a>);
        break;
      case 'tweet' :
        str = '@'+val['screen_name']+':'+val['id_str'];
        togg = (<a className="twCtrlTogg" href="" onClick={e=>this.toggleCtrls(e)}>{val['text']}{show?o:null}</a>);
        a = (<a href={'https://twitter.com/'+val['screen_name']+'/status/'+val['id_str']} target="_blank">{val['text']}</a>);
        break;
      default :
        break;
    }
    let catItems = cats.map( c => { let s=c.str; return (<option value={s}>{s}</option>); });
    catItems = [ (<option value="">&hellip;</option>), ...catItems ];
    let ctrls = this.wrapHideMotion(
      this.styleClosed( {maxWidth:0} ),
      this.styleOpenOn( show, {maxWidth:1000} ),
      (<span className="twMainCtrls">
        {a}&nbsp;&gt;&nbsp;
        <a onClick={e=>this.newSearchFromItem(e,str)}>{'New Search'}</a>&nbsp;|&nbsp;
        <a onClick={e=>this.addToSearchFromItem(e,str)}>{'Add to Search'}</a>&nbsp;|&nbsp;
        <a onClick={e=>this.categoryAddFromItem(e,str)}>{'Add as Category'}</a>
        { 1 < catItems.length ?
          <span>
            &nbsp;|&nbsp;{'Add to '}
            <select onSelect onChange={e=>this.entityAddFromSelect(e,str)}>{catItems}</select>
          </span> : null
        }
      </span>),
    true);
    return <span>{togg}{ctrls}</span>;
  }
}
export default connect(
  state => ({
    cats : state.cats
  }),
  dispatch => ({
    categoryAdd : catStr => CategoryStore.categoryAdd(catStr,dispatch),
    entityAdd : (catStr,entStr) => CategoryStore.entityAdd(catStr,entStr,dispatch),
    qCreate : str => TwitterSearch.qCreate(str,dispatch),
    qAddTo : str => TwitterSearch.qAddTo(str,dispatch)
  })
)(ElmMainCtrls);
