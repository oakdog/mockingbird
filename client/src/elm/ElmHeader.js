import React from 'react';
import {connect} from 'react-redux';
import ElmBase from './ElmBase';
import * as util from '../cat/obj/IsEntity';
import TwitterSearch from '../tw/TwitterSearch';
import CategoryStore from '../cat/CategoryStore';

class Header extends ElmBase {
  constructor(props){
    super();
    this.state = {};
    //console.log('Header.constructor()');
    this.btnSearchClick = this.btnSearchClick.bind(this);
    this.btnAddCatClick = this.btnAddCatClick.bind(this);
  }
  btnSearchClick(e){ //console.log('ElmHeader.btnSearchClick()');
    this.halt(e);
    if ( util.IsEntity(this.input.value) ){
      this.props.sCreate(this.input.value);
    }
  }
  btnAddCatClick(e){ //console.log('ElmHeader.btnAddCatClick()');
    this.halt(e);
    if ( util.IsEntity(this.input.value) ){
      this.props.categoryAdd(this.input.value);
    }
  }
  onInputChange(e){
    this.halt(e);
    this.props.qCreate(this.input.value);
  }
  loadStored(e){
    this.halt(e);
    //console.log('ElmHeader.loadStored()')
    this.props.qSetSelected(e.target.value);
  }
  render() { // &nbsp;&#x1F426; <- bird unicode char
    //console.log('ElmHeader.render() query:"'+this.props.srch.query+'"');
    let {query,selected,stored}=this.props.srch;
    if (this.input) this.input.value = query;
    let storedOpts = stored.filter( ss =>
      (''!==selected?selected:stored[stored.length-1].q)!==ss.q
    ).map( ss =>
      (<option value={ss.q}>{ss.q}</option>)
    );
    storedOpts = [(<option value="">Load Stored Search&hellip;</option>),...storedOpts];
    return (<header>
      <h1 className="mainTitle">Mockingbird</h1>
      <div className="headerCtrls">
        <input type="text" ref={n=>this.input=n} onChange={e=>this.onInputChange(e)} default={query} className="headerInput"/>
        <br/>
        <input type="button" onClick={this.btnSearchClick} ref={n=>this.btnSearch=n} className="headerBtnSearch" value="search"/>
        <input type="button" onClick={this.btnAddCatClick} ref={n=>this.btnAddCat=n} className="headerBtnAddCat" value="add category"/>
        <br/>
        { 1<storedOpts.length ? (<select onChange={e=>this.loadStored(e)}>{storedOpts}</select>) : null }
      </div>
    </header>);
  }
}
export default connect(
  state=>({
    srch : state.srch
  }),
  dispatch=>({
    sCreate : q => TwitterSearch.create(q,100,dispatch),
    qCreate : s => TwitterSearch.qCreate(s,dispatch),
    qSetSelected : s => TwitterSearch.qSetSelected(s,dispatch),
    categoryAdd : catStr => CategoryStore.categoryAdd(catStr,dispatch)
  })
)(Header);
