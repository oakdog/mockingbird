import React, { Component } from 'react';
import { connect } from 'react-redux';
import ElmBase from './ElmBase';
import CategoryStore from '../cat/CategoryStore';
import TwitterSearch from '../tw/TwitterSearch';
class ElmMainMenu extends ElmBase {
  constructor(props){
    super(props);
  }
  categoryAddFromItem(ev,catStr){
    //console.log('ElmMainMenu.categoryAddFromItem(catStr:'+catStr+')');
    this.halt(ev);
    this.props.categoryAdd(catStr);
  }
  entityAddFromItem(ev,catStr,entStr){
    //console.log('ElmMainMenu.entityAddFromItem(catStr:'+catStr+', entStr:'+entStr+')');
    this.halt(ev);
    this.props.entityAdd(catStr,entStr);
  }
  newSearchFromItem(ev,str){
    //console.log('ElmMainMenu.newSearchFromItem(str:'+str+')');
    this.halt(ev);
    this.props.qCreate(str);
  }
  addToSearchFromItem(ev,str){
    //console.log('ElmMainMenu.addToSearchFromItem(str:'+str+')');
    this.halt(ev);
    this.props.qAddTo(str);
  }
  render(){
    let catItems = this.props.cats.map( c => {
      let s=c.str;
      //console.log('ElmMainMenu.render() cat:'+s);
      return (<menuitem label={'"'+s+'"'} onClick={e=>this.entityAddFromItem(e,s,this.props.val)}></menuitem>);
    });
    return (<menu id={this.props.id} type="context">
      <menuitem label={'New Search: "'+this.props.val+'"'} onClick={e=>this.newSearchFromItem(e,this.props.val)}></menuitem>
      <menuitem label={'Add "'+this.props.val+'" to search'} onClick={e=>this.addToSearchFromItem(e,this.props.val)}></menuitem>
      <menuitem label={'Add '+this.props.type+' "'+this.props.val+'" as category'} onClick={e=>this.categoryAddFromItem(e,this.props.val)}></menuitem>
      { catItems.length ?
        <menu label={'Add '+this.props.type+' "'+this.props.val+'" to category'}>
          {catItems}
        </menu> : null
      }
    </menu>)
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
)(ElmMainMenu);
