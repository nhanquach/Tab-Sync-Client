import { ITab } from "./iTab";

export interface IDatabaseUpdatePayload {
  new: ITab;
  old: ITab;
  eventType: "UPDATE" | "DELETE";
}
