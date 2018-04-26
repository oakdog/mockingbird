/*
id 	Int64
ID of the mentioned user, as an integer. Example:

id_str 	String
If of the mentioned user, as a string. Example:

indices 	Array of Int

name 	String
Display name of the referenced user. Example:

screen_name 	String
Screen name of the referenced user.
*/
import TwitterObject from './TwitterObject';

class TwitterMention {
  constructor(raw){
    const propAttrs = [
      { name : 'id_str', type : 'String' },
      { name : 'indices', type : 'Array of Int' },
      { name : 'name', type : 'String' },
      { name : 'screen_name', type : 'String' }
    ];
    return TwitterObject.parse(raw,propAttrs);
  }
}
export default TwitterMention;
