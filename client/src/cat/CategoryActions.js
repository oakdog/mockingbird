import * as str from './CategoryActionStrs';
// Category
export const categoriesLoad = catsData => ({
  type : str.categoriesLoad,
  catsData : catsData
})
export const categoryAdd = catStr => ({
  type : str.categoryAdd,
  catStr : catStr
});
export const categoryDelete = catStr => ({
  type : str.categoryDelete,
  catStr : catStr
});
export const categoryAlter = (catStr,change) => ({
  type : str.categoryAlter,
  catStr : catStr,
  change : change
});
// Entity
export const entityAdd = (catStr,entStr) => ({
  type : str.entityAdd,
  catStr : catStr,
  entStr : entStr
});
export const entityDelete = (catStr,entStr) => ({
  type : str.entityDelete,
  catStr : catStr,
  entStr : entStr
});
export const entityReplace = (catStr,entStr,change) => ({
  type : str.entityReplace,
  catStr : catStr,
  entStr : entStr,
  change : change
});
