/*
  What can the Mockingbird be asked to do with stored accounts?
*/
import * as str from './TwitterUserActionStrs';

// ACCOUNT
export const uCreate = (id) => ({
  type : str.uCreate,
  id : id
});
export const uDiscard = (id) => ({
  type : str.uDiscard,
  id : id
});

// ACCOUNT - Follows
export const uFollowsSet = (id,results) => ({
  type : str.uFollowsSet,
  id : id,
  results : results
});
export const uFollowsAddTo = (id,results) => ({
  type : str.uFollowsAddTo,
  id : id,
  results : results
});
export const uFollowsDelete = (id) => ({
  type : str.uFollowsDelete,
  id : id
});

// ACCOUNT - FollowedBy
export const uFollowedBySet = (id,results) => ({
  type : str.uFollowedBySet,
  id : id,
  results : results
});
export const uFollowedByAddTo = (id,results) => ({
  type : str.uFollowedByAddTo,
  id : id,
  results : results
});
export const uFollowedByDelete = (id) => ({
  type : str.uFollowedByDelete,
  id : id
});

// ACCOUNT - Mentions
export const uMentionsSet = (id,results) => ({
  type : str.uMentionsSet,
  id : id,
  results : results
});
export const uMentionsAddTo = (id,results) => ({
  type : str.uMentionsAddTo,
  id : id,
  results : results
});
export const uMentionsDelete = (id) => ({
  type : str.uMentionsDelete,
  id : id
});

// ACCOUNT - Likes
export const uLikesSet = (id,results) => ({
  type : str.uLikesSet,
  id : id,
  results : results
});
export const uLikesAddTo = (id,results) => ({
  type : str.uLikesAddTo,
  id : id,
  results : results
});
export const uLikesDelete = (id) => ({
  type : str.uLikesDelete,
  id : id
});

// ACCOUNT - Timeline
export const uTimelineSet = (id,results) => ({
  type : str.uTimelineSet,
  id : id,
  results : results
});
export const uTimelineAddTo = (id,results) => ({
  type : str.uTimelineAddTo,
  id : id,
  results : results
});
export const uTimelineDelete = (id) => ({
  type : str.uTimelineDelete,
  id : id
});
