/*
  What can the Mockingbird be asked to do with stored accounts?
*/

// ACCOUNT
export const uCreate = 'USER_CREATE';
export const uDiscard = 'USER_DISCARD';
// ACCOUNT - Follows
export const uFollowsSet = 'USER_SET_FOLLOWS';
export const uFollowsAddTo = 'USER_ADD_TO_FOLLOWS';
export const uFollowsDelete = 'USER_DELETE_FOLLOWS';
// ACCOUNT - FollowedBy
export const uFollowedBySet = 'USER_SET_FOLLOWED_BY';
export const uFollowedByAddTo = 'USER_ADD_TO_FOLLOWED_BY';
export const uFollowedByDelete = 'USER_DELETE_FOLLOWED_BY';
// ACCOUNT - Mentions
export const uMentionsSet = 'USER_SET_MENTIONS';
export const uMentionsAddTo = 'USER_ADD_TO_MENTIONS';
export const uMentionsDelete = 'USER_DELETE_MENTIONS';
// ACCOUNT - Likes
export const uLikesSet = 'USER_SET_LIKES';
export const uLikesAddTo = 'USER_ADD_TO_LIKES';
export const uLikesDelete = 'USER_DELETE_LIKES';
// ACCOUNT - Timeline
export const uTimelineSet = 'USER_SET_TIMELINE';
export const uTimelineAddTo = 'USER_ADD_TO_TIMELINE';
export const uTimelineDelete = 'USER_DELETE_TIMELINE';
