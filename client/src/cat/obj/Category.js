/*
value     String
The entity for the category itself.

entities  Array of Strings
An array of associated entities.
  - mentions - getter w/ filter "@" entities.
  - filters - getter w/ filter "filter:" entities.
  - etc...

*/
import Entity from './Entity';
class Category extends Entity {
  constructor(value){
    super(value);
    this.entities = [];
  }
  addEntity(value){
    const e = new Entity(value);
    if ( /* TODO: check for singular elms? since, until? */ this.isUnique(e)){
      this.entities = [ ...this.entities, e ];
    } else {
      throw new Error("Category.addEntity() isEntity failed for value : \r\n"+JSON.stringify(e,null,' '));
    }
  }
  isUnique(propsOrEntity){
    for ( let i in this.entities ){
      if ( propsOrEntity.neg===this.entities[i].neg &&
        propsOrEntity.type===this.entities[i].type &&
        propsOrEntity.value===this.entities[i].value ) {
        return false;
      }
    }
    return true;
  }
  deleteEntity(propsOrEntity){
    this.entities = this.entities.filter( e =>
      !( e.neg===propsOrEntity.neg &&
      e.type===propsOrEntity.type &&
      e.value===propsOrEntity.value )
    );
  }
  typeFilter(type){ return this.entities.filter(e=>e.type===type); }
  get texts(){ return this.entities.filter(e=>''===e.type); }
  get words(){ return this.texts.filter(t=>/^[^\s]+$/.test(t.value)); }
  get phrases(){ return this.texts.filter(t=>/[\s]/.test(t.value)); }
  get negatives(){ return this.entities.filter(e=>e.neg); }
  get hashtags(){ return this.typeFilter('#'); }
  get mentions(){ return this.typeFilter('@'); }
  get froms(){ return this.typeFilter('from'); }
  get tos(){ return this.typeFilter('to'); }
  get lists(){ return this.typeFilter('list'); }
  get since(){ return this.typeFilter('since'); }
  get until(){ return this.typeFilter('until'); }
  get filters(){ return this.typeFilter('filter'); }
  get urls(){ return this.typeFilter('url'); }
  /* ^-?
    (( from | to | url | @ | # | \$ ): [a-zA-Z\d_]+) |
    ( list: [a-zA-Z\d_]+\/[a-zA-Z\d_]+) |
    (( since | until ): 20[01][\d]-[12]?[\d]-[123]?[\d]) |
    ( "[^"]+" | [^\s"']+ ) |
    ( filter: (media|retweets|native_video|periscope|vine|images|twimg|links) )
  $ */
  clone(){
    let c = new Category(this.str);
    c.entities = [ ...this.entities ];
    return c;
  }
}

export default Category;
