import * as str from './TwitterSearchActionStrs';
// QUERY BUILDING
export const qCreate = s => ({
  type : str.qCreate,
  str : s
});
export const qAddTo = s => ({
  type : str.qAddTo,
  str : s
});
export const qSetSelected = s => ({
  type : str.qSetSelected,
  str : s
});
// STORED SEARCHES
export const sCreate = (q,results) => ({
  type : str.sCreate,
  q : q,
  results : results
});
export const sAddTo = (q,results) => ({
  type : str.sAddTo,
  q : q,
  results : results
});
export const sReplace = (q,results) => ({
  type : str.sReplace,
  q : q,
  results : results
});
export const sDiscard = (q) => ({
  type : str.sDiscard,
  q : q
});
