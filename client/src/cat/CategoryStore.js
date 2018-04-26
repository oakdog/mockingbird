/*
  Manage categories & related entities.
*/
import Entity from './obj/Entity';
import Category from './obj/Category';
import * as actions from './CategoryActions';
import * as str from './CategoryActionStrs';

class CategoryStore {
  static categoriesLoad(catsData,dispatch){
    dispatch(actions.categoriesLoad(catsData));
  }
  static categoryAdd(catStr,dispatch){
    //console.log('CategoryStore.categoryAdd("'+catStr+'") ran');
    dispatch(actions.categoryAdd(catStr));
  }
  static categoryDelete(catStr,dispatch){
    dispatch(actions.categoryDelete(catStr));
  }
  static categoryAlter(catStr,change,dispatch){
    dispatch(actions.categoryAlter(catStr,change));
  }

  static entityAdd(catStr,entStr,dispatch){
    dispatch(actions.entityAdd(catStr,entStr));
  }
  static entityDelete(catStr,entStr,dispatch){
    dispatch(actions.entityDelete(catStr,entStr));
  }
  static entityReplace(catStr,entStr,change,dispatch){
    dispatch(actions.entityReplace(catStr,entStr,change));
  }/**/

  /* state is...
    categories : [
      {
        name : string
        entities : [string,string...]
      }...
    ]
  */

  /* state is...
    categories : [
      Category(), ...
    ]
  */
  static reducer(state=[],action){
    //console.log('CategoryStore.reducer()'+"\r\nstate:"+JSON.stringify(state,null,' ')+"\r\naction:"+JSON.stringify(action,null,' '));
    /* ex.
      state : [
       {
        "neg": false,
        "type": "",
        "value": "posters",
        "entities": []
       }
      ]
      action : {
       "type": "ADD_ENTITY",
       "catStr": "posters",
       "entity": "movies"
      }
    */
    let catsFiltered = state.filter(
      c => c.str !== action.catStr
    ),
    filteredCat = state.filter(
      c => c.str === action.catStr
    );
    filteredCat = filteredCat.length ? filteredCat[0] : null;

    let entitiesFiltered = action.entStr && filteredCat ?
      filteredCat.entities.filter(e=>e.str!==action.entStr) : null;
    let entityExists = entitiesFiltered ?
      entitiesFiltered.length !== filteredCat.entities.length : false;

    let c, sortFn = (a,b) => {
      ret = 0;
      sa = a.str.toLowerCase();
      sb = b.str.toLowerCase();
      if (sa < sb) ret = -1;
      if (sa > sb) ret = 1;
      //console.log('CategoryStore.reducer().sortFn() a.str:"'+a.str+'", b.str:"'+b.str+'" ret:'+ret);
      return ret;
    }, ret, sa, sb;
    switch (action.type) {
      // Category
      case str.categoriesLoad :
        //console.log('CategoryStore.reducer() categoriesLoad ret:'+JSON.stringify(action.catsData,null,' '));
        return action.catsData.map( c => {
          let cc = new Category({ neg:c.neg, type:c.type, value:c.value });
          if ( c.entities ) {
            cc.entities = c.entities.map( e =>
              new Entity({ neg:e.neg, type:e.type, value:e.value })
            );
          }
          return cc;
        });
      case str.categoryAdd :
        if (!filteredCat){
          ret = ( state.slice(0).concat(new Category(action.catStr)) ).sort(sortFn);
          //console.log('CategoryStore.reducer() categoryAdd ret:'+JSON.stringify(ret,null,' '));
          return ret;
        }
        break;
      case str.categoryDelete :
        if (filteredCat){
          //console.log('CategoryStore.reducer() categoryDelete ret:'+JSON.stringify(catsFiltered,null,' '));
          return catsFiltered;
        }
        break;
      case str.categoryAlter :
        if (filteredCat) {
          c = new Category(action.change);
          c.entities = [ ...filteredCat.entities ].sort(sortFn);
          ret = [c].concat(catsFiltered).sort(sortFn);
          //console.log('CategoryStore.reducer() categoryAdd ret:'+JSON.stringify(ret,null,' '));
          return ret;
        }
        break;

      // Entity
      case str.entityAdd :
        if (filteredCat&&!entityExists) {
          c = new Category(filteredCat.str);
          c.entities = [ ...filteredCat.entities, new Entity(action.entStr) ].sort(sortFn);
          c = ( catsFiltered.concat(c) ).sort(sortFn);
          //console.log("CategoryStore.reducer() : entityAdd\r\n returning:"+JSON.stringify(c,null,' '));
          return c;
        }
        break;
      case str.entityDelete :
        if (filteredCat&&entityExists) {
          c = new Category(filteredCat.str);
          c.entities = [ ...entitiesFiltered ].sort(sortFn);
          c = ( catsFiltered.concat(c) ).sort(sortFn);
          //console.log("CategoryStore.reducer() : entityDelete\r\n returning:"+JSON.stringify(c,null,' '));
          return c;
        }
        break;
      case str.entityReplace :
        if (filteredCat&&entityExists) {
          c = new Category(filteredCat.str);
          c.entities = [ ...entitiesFiltered, new Entity(action.change) ].sort(sortFn);
          c = ( catsFiltered.concat(c) ).sort(sortFn);
          //console.log("CategoryStore.reducer() : entityReplace\r\n returning:"+JSON.stringify(c,null,' '));
          return c;
        }
        break;
      default : break;
    }
    return [...state];
  }
}

export default CategoryStore;
