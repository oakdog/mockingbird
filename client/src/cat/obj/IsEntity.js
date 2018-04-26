export const IsEntity = e => {
  return /^((from|to|url|@|#|\$):[a-zA-Z\d_]+)|(list:[a-zA-Z\d_]+\/[a-zA-Z\d_]+)|((since|until):20[01][\d]-[12]?[\d]-[123]?[\d])|("[^"]+"|[^\s"']+)|(filter:(media|retweets|native_video|periscope|vine|images|twimg|links))$/.test(e);
  /* ^-?
    (( from | to | url | @ | # | \$ ): [a-zA-Z\d_]+) |
    ( list: [a-zA-Z\d_]+\/[a-zA-Z\d_]+) |
    (( since | until ): 20[01][\d]-[12]?[\d]-[123]?[\d]) |
    ( "[^"]+" | [^\s"']+ ) |
    ( filter: (media|retweets|native_video|periscope|vine|images|twimg|links) )
  $ */
}
