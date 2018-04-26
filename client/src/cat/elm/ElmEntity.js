/*
*/
import React from 'react';
import { connect } from 'react-redux';
import ElmBase from '../../elm/ElmBase';
import CategoryStore from '../CategoryStore';
import TwitterSearch from '../../tw/TwitterSearch';
class  ElmEntity extends ElmBase {
  constructor(props) {
    super(props);
    this.state = {
      show : 'value',
      inputIsEntity : false
    };
    this.isEnt = this.props.cat.isEntity;
    this.replaceThis = this.replaceThis.bind(this);
    this.deleteThis = this.deleteThis.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
    this.checkValue = this.checkValue.bind(this);
  }
  replaceThis(ev,cs,es){
    this.halt(ev);
    let { value } = this.inpt;
    //console.log('ElmEntity.replaceThis() cs:'+cs+', es'+es+', value:'+value);
    if( this.isEnt(value) ){
      //console.log('ElmEntity.replaceThis() isEntity=true, replacing...');
      this.props.entityReplace( cs, es, value );
      this.setState({show:'value'});
    }
  }
  deleteThis(ev,cs,es){ //console.log('ElmEntity.deleteThis()');
    this.halt(ev);
    this.props.entityDelete(cs,es);
  }
  toggleShow(ev){
    this.halt(ev);
    let {show}=this.state;
    this.setState({
      show:'value'!==show?'output'===show?'input':'value':'output',
      inputIsEntity : false
    });
  }
  checkValue(ev){
    this.halt(ev);
    if ( this.isEnt(this.inpt.value) ){
      this.setState({inputIsEntity:true});
    }
  }
  newSearchFromItem(ev,str){
    //console.log('ElmEntity.newSearchFromItem()');
    this.halt(ev);
    this.props.qCreate(str);
  }
  addToSearchFromItem(ev,str){
    //console.log('ElmEntity.addToSearchFromItem()');
    this.halt(ev);
    this.props.qAddTo(str);
  }
  render(){
    // let cs = this.props.cat.str, es = this.props.ent.str,
    let cs = this.props.cStr, es = this.props.eStr,
      { show, inputIsEntity } = this.state;
    //console.log('ElmEntity.render() es:"'+es+'" cs:"'+cs+'"');
    let input = this.wrapHideMotion( this.styleClosed(), this.styleOpenOn('input'===show),
      <div className="inputGroup">
        <input type="text" ref={n=>this.inpt=n} onChange={e=>this.checkValue(e)} onClick={e=>this.halt(e)} default={es} /><br/>
        { inputIsEntity ? (<a onClick={e=>this.replaceThis(e,cs,es)}>Replace</a>) : null }
      </div>
    ), output = this.wrapHideMotion( this.styleClosed(), this.styleOpenOn('output'===show,{maxHeight:200}),
      <div className="entityCtrls">
        <a onClick={e=>this.newSearchFromItem(e,es)}>New Search</a>&nbsp;|&nbsp;
        <a onClick={e=>this.addToSearchFromItem(e,es)}>Add to Search</a>&nbsp;|&nbsp;
        <a onClick={e=>this.deleteThis(e,cs,es)}>Delete</a>
      </div>
    );
    return (<div className="catEntity" onClick={this.toggleShow}>
      {es}
      {input}
      {output}
    </div>);
  }
}
export default connect(
  (state,props) => {
    let o = { cat : state.cats.filter(c=>c.str===props.cStr)[0] };
    o.ent = o.cat.entities.filter(e=>e.str===props.eStr)[0];
    return o;
  },
  dispatch => ({
    entityReplace : (catStr,entStr,change) => CategoryStore.entityReplace(catStr,entStr,change,dispatch),
    entityDelete : (catStr,entStr) => CategoryStore.entityDelete(catStr,entStr,dispatch),
    qCreate : str => TwitterSearch.qCreate(str,dispatch),
    qAddTo : str => TwitterSearch.qAddTo(str,dispatch)
  })
)(ElmEntity);
