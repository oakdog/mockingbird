/*
  name : String,
  url : String,
  promoted_content : ?,
  query : String,
  tweet_volume : Number
*/
class TwitterTrend {
  constructor(raw){
    return {
      name :  raw['name'] ? String(raw['name']) : null
      url :  raw['url'] ? String(raw['url']) : null
      promoted_content :  raw['promoted_content'] ? Number(raw['promoted_content']) : null
      query : raw['tweet_volume'] ? String(raw['tweet_volume']) : null
      tweet_volume : raw['tweet_volume'] ? Number(raw['tweet_volume']) : null
    }
  }
}
export default TwitterTrend;
