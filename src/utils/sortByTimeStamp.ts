import dayjs from "dayjs";
import { ITab } from "../interfaces/iTab";

export const sortByTimeStamp = (a: ITab, b: ITab) => {
  return dayjs(b.timeStamp).unix() - dayjs(a.timeStamp).unix();
};
