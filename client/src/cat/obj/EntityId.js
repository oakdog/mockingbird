let single;
class EntityId {
  constructor(){
    if(!single){
      this.id = 0;
      single = this;
    }
    return single;
  }
  next(){
    return this.id++;
  }
}
export default EntityId;
