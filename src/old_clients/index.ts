// @ts-nocheck
import { ITab } from "../interfaces/iTab";
import * as firebaseClient from "./firebaseClient";
import * as supabaseClient from "./supabaseClient";

const clientTypes = {
  firebase: "firebase",
  supabase: "supabase",
};

let backend: typeof firebaseClient | typeof supabaseClient;

const getClient = async () => {
  if (backend) {
    return backend;
  }

  try {
    // @ts-ignore
    // const { tabSyncSettings } = await chrome.storage.sync.get(
    //   "tabSyncSettings"
    // );
    // if (tabSyncSettings.BACKEND === clientTypes.firebase) {
    //   backend = firebaseClient;
    // } else if (tabSyncSettings.BACKEND === clientTypes.supabase) {
    //   backend = supabaseClient;
    // }

    backend = firebaseClient;

    return backend;
  } catch (_e) {
    backend = supabaseClient;
    return backend;
  }
};

export const getOpenTabs = async (): Promise<ITab[]> => {
  return (await getClient()).getOpenTabs();
};

export const getArchivedTabs = async (): Promise<ITab[]> => {
  return (await getClient()).getArchivedTabs();
};

export const onOpenTabChange = async (callback?: () => void) => {
  return (await getClient()).onOpenTabChange(callback);
};

export const onArchivedTabChange = async (callback?: () => void) => {
  return (await getClient()).onArchivedTabChange(callback);
};

export const archiveOpenTabs = async () => {
  return (await getClient()).archiveOpenTabs();
};

export const removeArchivedTabs = async () => {
  return (await getClient()).removeArchivedTabs();
};
