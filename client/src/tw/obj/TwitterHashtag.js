/*
indices 	Array of Int

text 	String
Name of the hashtag, minus the leading ‘#’ character. Example:
*/
class TwitterHashtag {
  constructor(raw){
    return {
      text : raw['text'] ? String(raw['text']) : null,
      indices : raw['indices'] ? [...raw['indices']] : null
    };
  }
}

export default TwitterHashtag;
