// @ts-nocheck
import { FirebaseOptions, initializeApp } from "firebase/app";
import {
  getDatabase,
  get,
  ref,
  onChildChanged,
  onChildAdded,
  onChildRemoved,
  query,
  limitToLast,
  set,
  remove,
  orderByChild,
} from "firebase/database";

import { ITab } from "../interfaces/iTab";

const clientCredentials: FirebaseOptions = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
};

const app = initializeApp(clientCredentials);
export const database = getDatabase(app);

export const getOpenTabs = async (): Promise<ITab[]> => {
  const openTabsSnapshot = await get(
    query(ref(database, "open_tabs/"), orderByChild("timeStamp"))
  );

  const tabs: ITab[] = [];
  openTabsSnapshot.forEach((child: { val: () => ITab }) => {
    tabs.push(child.val());
  });

  return tabs.reverse();
};

export const getArchivedTabs = async (): Promise<ITab[]> => {
  const openTabsSnapshot = await get(
    query(
      ref(database, "archived/"),
      orderByChild("timeStamp"),
      limitToLast(15)
    )
  );

  const tabs: ITab[] = [];
  openTabsSnapshot.forEach((child: { val: () => ITab }) => {
    tabs.push(child.val());
  });

  return tabs.reverse();
};

export const onOpenTabChange = (callback?: () => void) => {
  onChildChanged(ref(database, "open_tabs/"), callback as any);
  onChildAdded(ref(database, "open_tabs/"), callback as any);
  onChildRemoved(ref(database, "open_tabs/"), callback as any);
};

export const onArchivedTabChange = (callback?: () => void) => {
  onChildChanged(ref(database, "archived/"), callback as any);
  onChildAdded(ref(database, "archived/"), callback as any);
  onChildRemoved(ref(database, "archived/"), callback as any);
};

export const archiveOpenTabs = async () => {
  const tabs = await getOpenTabs();
  for (const tab of tabs) {
    set(ref(database, "archived/" + tab.id), tab);
    remove(ref(database, "open_tabs/" + tab.id));
  }
};

export const removeArchivedTabs = () => {
  remove(ref(database, "archived"));
};


