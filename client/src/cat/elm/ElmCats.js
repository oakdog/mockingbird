/*
  Display trending hashtags under the current filters.
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ElmCat from './ElmCat';
import CategoryStore from '../CategoryStore';

class ElmCats extends Component {
  constructor(props){
    super(props);
    this.state = {
      cats : this.props.cats
    };
    this.loadCategories = this.loadCategories.bind(this);
    //console.log('ElmCats.constructor()');
  }
  loadCategories(){
    //console.log('ElmCats.inputCatLoad()')
    let { files } = this.inputCatLoad;
    let file = files.length ? files[0] : null;
    if (file){
      let loadInto, fr = new FileReader();
      fr.onload = ( li => {
        return e => {
          try {
            //console.log('ElmCats.inputCatLoad() FileReader.onload invoked. fr.result:'+e.target.result);
            li = JSON.parse(e.target.result);
            this.props.categoriesLoad(li);
          } catch (err) {
            //console.log('ElmCats.inputCatLoad() failed to load categories. err:'+JSON.stringify(err,null,' '));
          }
        }
      })(loadInto);
      fr.readAsText(file);
    }
  }
  render() {
    let {cats}=this.props;
    //console.log('ElmCats.render() : cats:'+JSON.stringify(cats.map(c=>c.str),null,' '));
    let elmCats = cats.map(c=>(<ElmCat cStr={c.str} />));
    return (<div className="elmCats">
      <h2>{ cats.length ? 'Categories' : 'Add Categories...' }</h2>
      { cats.length ? <div>{elmCats}</div> : null }
      { cats.length ?
        <a className="catIO" href={"data:application/octet-stream," + encodeURIComponent(JSON.stringify(cats))} download="Mockingbird_Categories.json">Save Categories</a> : null }
      <input ref={n=>this.inputCatLoad=n} className="catIO" type="file" onChange={this.loadCategories} />
    </div>);
  }
}
export default connect(
  state => ({
    cats : state.cats
  }),
  dispatch => ({
    categoriesLoad : catsData => CategoryStore.categoriesLoad(catsData,dispatch),
    categoryAdd : catStr => CategoryStore.categoryAdd(catStr,dispatch),
    categoryDelete : catStr => CategoryStore.categoryDelete(catStr,dispatch),
    entityAdd : (catStr,entStr) => CategoryStore.entityAdd(catStr,entStr,dispatch)
  })
)(ElmCats);
