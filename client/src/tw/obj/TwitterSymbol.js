/*
indices 	Array of Int

text 	String
*/
class TwitterSymbol {
  constructor(raw){
    return {
      text : raw['text'] ? String(raw['text']) : null,
      indices : raw['indices'] ? [ ...raw['indices'] ] : null
    }
  }
}
export default TwitterSymbol;
