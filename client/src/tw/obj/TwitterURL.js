/*
display_url 	String
URL pasted/typed into Tweet. Example:

expanded_url 	String
Expanded version of `` display_url`` . Example:

indices 	Array of Int
An array of integers representing offsets within the Tweet text where the URL begins and ends. The first integer represents the location of the first character of the URL in the Tweet text. The second integer represents the location of the first non-URL character after the end of the URL. Example:

url 	String
Wrapped URL, corresponding to the value embedded directly into the raw Tweet text, and the values for the indices parameter.
*/
import TwitterObject from './TwitterObject';
class TwitterURL {
  constructor(raw){
    const propAttrs = [
      { name : 'id_str', type : 'String' },
      { name : 'display_url', type : 'String' },
      { name : 'expanded_url', type : 'String' },
      { name : 'indices', type : 'Array of Int' },
      { name : 'url', type : 'String' },
      { name : 'unwound', type : 'TwitterUnwoundURL' }
    ];
    return TwitterObject.parse(raw,propAttrs);
  }
}
export default TwitterURL;
