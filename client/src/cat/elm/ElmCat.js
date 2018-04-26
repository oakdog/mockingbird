/* Category itself
*/
import React from 'react';
import { connect } from 'react-redux';
import ElmBase from '../../elm/ElmBase';
import ElmEntity from './ElmEntity';
import CategoryStore from '../CategoryStore';
import TwitterSearch from '../../tw/TwitterSearch';

class ElmCat extends ElmBase {
  constructor(props) {
    super(props);
    //console.log('ElmCat.constructor()');
    this.state = {
      show : 'value',
      inputIsEntity : false
    };
    this.btnAddEnt = null;

    this.toggleShow = this.toggleShow.bind(this);
    this.deleteThis = this.deleteThis.bind(this);
    this.updateAddEnt = this.updateAddEnt.bind(this);
    this.addEntFromInput = this.addEntFromInput.bind(this);
    this.alterCatFromInput = this.alterCatFromInput.bind(this);
  }
  toggleShow(ev){
    this.halt(ev);
    let {show}=this.state;
    this.setState({
      show : 'value'!==show ?
        'input'!==show ?
          'output'!==show ?
            'value' : 'ents'
        :'output'
      : 'input',
      inputIsEntity:false
    })
  }
  deleteThis(ev){
    this.halt(ev);
    this.props.categoryDelete(this.props.cat.str);
  }
  updateAddEnt(ev){
    this.halt(ev);
    if (this.props.cat.isEntity(this.inpt.value)) this.setState({inputIsEntity:true});
  }
  addEntFromInput(ev){
    this.halt(ev);
    let {value}=this.inpt, {cat}=this.props;
    if (cat.isEntity(value)) {
      this.props.entityAdd( cat.str, value );
      // this.setState({show:'value'});
    }
  }
  alterCatFromInput(ev){
    this.halt(ev);
    let {value}=this.inpt, {cat}=this.props;
    if (cat.isEntity(value)) {
      this.props.categoryAlter( cat.str, value );
      // this.setState({show:'value'})
    }
  }
  newSearchFromItem(ev){
    //console.log('ElmCat.newSearchFromItem()');
    this.halt(ev);
    this.props.qCreate(this.props.cat.str);
  }
  addToSearchFromItem(ev){
    //console.log('ElmCat.addToSearchFromItem()');
    this.halt(ev);
    this.props.qAddTo(this.props.cat.str);
  }
  render(){
    //console.log('ElmCat.render() cat:'+this.props.cat.str+"\r\nentities:" + JSON.stringify(this.props.cat.entities) );
    let c = this.props.cat, {show}=this.state;
    let { str } = c;
    let ents = this.wrapHideMotion( this.styleClosed(), this.styleOpenOn('ents'===show,{maxHeight:200}),
      <div className="catEntities">
        {c.entities.map(ent=><ElmEntity cStr={str} eStr={ent.str} />)}
      </div>
    ), output = this.wrapHideMotion( this.styleClosed(), this.styleOpenOn('output'===show),
      <div className="entityCtrls">
        <a onClick={e=>this.newSearchFromItem(e,str)}>New Search</a>&nbsp;|&nbsp;
        <a onClick={e=>this.addToSearchFromItem(e,str)}>Add to Search</a>&nbsp;|&nbsp;
        <a onClick={e=>this.deleteThis(e)}>Delete</a>
      </div>
    ), input = this.wrapHideMotion( this.styleClosed(), this.styleOpenOn('input'===show),
      <div className="inputGroup">
        <input ref={n=>this.inpt=n} type="text" onChange={e=>this.updateAddEnt(e)} onClick={e=>this.halt(e)} /><br/>
        { this.state.inputIsEntity ?
          (<span>
            <a ref={n=>this.menuItemReplace=n} onClick={e=>this.alterCatFromInput(e)}>Replace</a>&nbsp;|&nbsp;
            <a ref={n=>this.menuItemAdd=n} onClick={e=>this.addEntFromInput(e)}>Add to</a>
          </span>)
        : null }
      </div>
    );
    return (<div className="cat" onClick={this.toggleShow}>
      <div className="catMainEntity">
        {str}<br/>
        {input}
        {output}
      </div>
      {ents}
    </div>);
}
}
export default connect(
  (state,props) => ({ // mapStateToProps
    cat : state.cats.filter(c=>c.str===props.cStr)[0]
  }),
  dispatch => ({
    categoryAlter : (catStr,change) => CategoryStore.categoryAlter(catStr,change,dispatch),
    categoryDelete : (catStr) => CategoryStore.categoryDelete(catStr,dispatch),
    entityAdd : (catStr,entStr) => CategoryStore.entityAdd(catStr,entStr,dispatch),
    qCreate : str => TwitterSearch.qCreate(str,dispatch),
    qAddTo : str => TwitterSearch.qAddTo(str,dispatch)
  })
)(ElmCat);
