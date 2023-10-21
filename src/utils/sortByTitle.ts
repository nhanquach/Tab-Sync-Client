import { ITab } from "../interfaces/iTab";

export const sortByTitle = (a: ITab, b: ITab) => {
  const titleA = a.title.toUpperCase();
  const titleB = b.title.toUpperCase();
  if (titleA < titleB) return -1;
  if (titleA > titleB) return 1;
  return 0;
};
