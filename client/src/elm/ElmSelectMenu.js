/* Document-level. Should only be one instance of this. Maintain rather than impose singleton.
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Entity from '../cat/obj/Entity';
import ElmBase from './ElmBase';
import CategoryStore from '../cat/CategoryStore';
import TwitterSearch from '../tw/TwitterSearch';
class ElmSelectMenu extends ElmBase {
  constructor(props){
    super(props);
    this.gs = document.getSelection.bind(document);
    this.isEntity = new Entity('grabIsEntity').isEntity.bind(this);
    this.state = { str : '' };

    this.halt = this.halt.bind(this);
    this.selectstart = this.selectstart.bind(this);
    this.selectionchange = this.selectionchange.bind(this);
    this.categoryAddFromSelection = this.categoryAddFromSelection.bind(this);
    this.entityAddFromSelection = this.entityAddFromSelection.bind(this);
  }
  selectstart(ev){
    //console.log('ElmSelectMenu.selectionstart()');
    this.setState({str:''});
  }
  selectionchange(ev){
    let s = this.gs().toString();
    //console.log('ElmSelectMenu.selectionchange() s:"'+s+'"');
    if ( this.isEntity(s) ) this.setState({str:s});
  }
  componentDidMount(){
    //console.log('ElmSelectMenu.componentDidMount()');
    // WARNING: I'm seeing a lot of discussion about React not handling selection events well.
    // There are npm libraries to help, but a simple workaround would be preferable atm.
    document.addEventListener('selectstart',this.selectstart);
    document.addEventListener('selectionchange',this.selectionchange);
  }
  componentWillUnmount(){
    //console.log('ElmSelectMenu.componentWillUnmount()');
    document.removeEventListener('selectstart',this.selectstart);
    document.removeEventListener('selectionchange',this.selectionchange);
  }
  categoryAddFromSelection(ev){
    //console.log('ElmSelectMenu.categoryAddFromSelection()');
    this.halt(ev);
    if (this.isEntity(this.state.str)) {
      this.props.categoryAdd(this.state.str);
    }
  }
  entityAddFromSelection(ev,catStr){
    //console.log('ElmSelectMenu.entityAddFromSelection()');
    this.halt(ev);
    if (this.isEntity(this.state.str)) {
      this.props.entityAdd(catStr,this.state.str);
    }
  }
  newSearchFromSelection(ev,str){
    //console.log('ElmSelectMenu.newSearchFromSelection(str:'+str+')');
    this.halt(ev);
    this.props.qCreate(str);
  }
  addToSearchFromSelection(ev,str){
    //console.log('ElmSelectMenu.addToSearchFromSelection(str:'+str+')');
    this.halt(ev);
    this.props.qAddTo(str);
  }
  render(){
    let catItems = this.props.cats.map( c => {
      let cs=c.str;
      //console.log('ElmSelectMenu.render() cat:'+cs);
      return (<menuitem label={'"'+cs+'"'} onClick={e=>this.entityAddFromSelection(e,cs,this.state.str)}></menuitem>);
    });
    return (<menu id="selectMenu" type="context">
      <menuitem label={'New Search: "'+this.state.str+'"'} onClick={e=>this.newSearchFromSelection(e,this.state.str)}></menuitem>
      <menuitem label={'Add "'+this.state.str+'" to search'} onClick={e=>this.addToSearchFromSelection(e,this.state.str)}></menuitem>
      <menuitem label={'Add selection "'+this.state.str+'" as category'} onClick={e=>this.categoryAddFromSelection(e,this.state.str)}></menuitem>
      { catItems.length ?
        <menu label={'Add selection "'+this.state.str+'" to category'}>
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
)(ElmSelectMenu);
