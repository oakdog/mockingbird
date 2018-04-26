/*
  Base stuff for Twitter Objects
*/
import TwitterCoordinates from './TwitterCoordinates';
import TwitterEntities from './TwitterEntities';
import TwitterHashtag from './TwitterHashtag';
import TwitterMedia from './TwitterMedia';
import TwitterMediaSizes from './TwitterMediaSizes';
import TwitterMention from './TwitterMention';
import TwitterPlace from './TwitterPlace';
import TwitterPoll from './TwitterPoll';
import TwitterSize from './TwitterSize';
import TwitterStatus from './TwitterStatus';
import TwitterSymbol from './TwitterSymbol';
import TwitterUnwoundURL from './TwitterUnwoundURL';
import TwitterURL from './TwitterURL';
import TwitterUser from './TwitterUser';
// import TwitterVideoInfo from './TwitterVideoInfo';
// import TwitterVideoVariant from './TwitterVideoVariant';

class TwitterObject {
  constructor(){
    this.parse = this.parse.bind(this);
    this.getParsed = this.getParsed.bind(this);
  }
  static parse(data,props){
    let o = {};
    for (let i in props){
      if ('Array of '===props[i].type.substring(0,8)) {
        props[i].type = props[i].type.split(' ')[2];
        o[props[i]['name']] = data && data[props[i]['name']] ?
          data[props[i]['name']].map( datum=>this.getParsed(datum,props[i].type) ) : null;
      } else {
        o[props[i]['name']] = data && data[props[i]['name']] ? this.getParsed(data[props[i]['name']],props[i].type) : null;
      }
    }
    return o;
  }
  static getParsed(datum,type){
    let o;
    switch (type) {
      // Basic handling
      case 'String' :
        o = datum ? String(datum) : null;
        break;
      case 'Boolean' :
        o = datum ? Boolean(datum) : null;
        break;
      case 'Int' :
      case 'Float' :
        o = datum ? Number(datum) : null;
        break;
      case 'Array' :
        o = datum ? [ ...datum ] : null;
        break;
      case 'Object' :
        o = datum ? Object.assign({},datum) : null;
        break;
      // Complex objects handled by classes
      case 'User' :
        o = datum ? new TwitterUser(datum) : null;
        break;
      case 'Tweet' :
        o = datum ? new TwitterStatus(datum) : null;
        break;
      case 'Coordinates' :
        o = datum ? new TwitterCoordinates(datum) : null;
        break;
      case 'TwitterEntities' :
        o = datum ? new TwitterEntities(datum) : null;
        break;
      case 'TwitterHashtag' :
        o = datum ? new TwitterHashtag(datum) : null;
        break;
      case 'TwitterMedia' :
        o = datum ? new TwitterMedia(datum) : null;
        break;
      case 'TwitterMediaSizes' :
        o = datum ? new TwitterMediaSizes(datum) : null;
        break;
      case 'TwitterMention' :
        o = datum ? new TwitterMention(datum) : null;
        break;
      case 'TwitterPlace' :
        o = datum ? new TwitterPlace(datum) : null;
        break;
      case 'TwitterPoll' :
        o = datum ? new TwitterPoll(datum) : null;
        break;
      case 'TwitterSize' :
        o = datum ? new TwitterSize(datum) : null;
        break;
      case 'TwitterStatus' :
        o = datum ? new TwitterStatus(datum) : null;
        break;
      case 'TwitterSymbol' :
        o = datum ? new TwitterSymbol(datum) : null;
        break;
      case 'TwitterUnwoundURL' :
        o = datum ? new TwitterUnwoundURL(datum) : null;
        break;
      case 'TwitterURL' :
        o = datum ? new TwitterURL(datum) : null;
        break;
      default :
        o = datum ? datum : null;
        break;
    }
    return o;
  }
}

export default TwitterObject;
