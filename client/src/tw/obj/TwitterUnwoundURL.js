/*
url 	String
The fully unwound version of the link included in the Tweet. Example:

status 	Int
Final HTTP status of the unwinding process, a '200' indicating success. Example:

title 	String
HTML title for the link. Example:

description 	String
HTML description for the link. Example:
*/
import TwitterObject from './TwitterObject';

class TwitterUnwoundURL {
  constructor(raw){
    const propAttrs = [
      { name : 'id_str', type : 'String' },
      { name : 'url', type : 'String' },
      { name : 'status', type : 'Int' },
      { name : 'title', type : 'String' },
      { name : 'description', type : 'String' }
    ];
    return TwitterObject.parse(raw,propAttrs);
  }
}

export default TwitterUnwoundURL;
