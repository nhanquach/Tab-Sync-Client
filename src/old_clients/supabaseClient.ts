// @ts-nocheck

import { createClient } from "@supabase/supabase-js";

import { ITab } from "../interfaces/iTab";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL as string,
  process.env.REACT_APP_SUPABASE_KEY as string
);

export const getOpenTabs = async (userId: string): Promise<ITab[]> => {
  if(!userId) {
    return [];
  }

  try {
    const tabs = await supabase.from("open_tabs").select();
    return (tabs.data as ITab[]).reverse();
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getArchivedTabs = async (): Promise<ITab[]> => {
  const tabs = await supabase.from("archived_tabs").select();
  // @ts-ignore
  return tabs.data.reverse();
};

export const onOpenTabChange = (callback?: () => void) => {
  supabase
    .channel("custom-all-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "open_tabs" },
      (_payload) => {
        callback?.();
      }
    )
    .subscribe();
};

export const onArchivedTabChange = (callback?: () => void) => {
  supabase
    .channel("custom-all-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "archived_tabs" },
      (_payload) => {
        callback?.();
      }
    )
    .subscribe();
};

export const archiveOpenTabs = async () => {
  const tabs = await getOpenTabs();
  const archiveTabIds = tabs.map((t) => t.id);

  await supabase.from("archived_tabs").upsert(tabs);
  await supabase.from("open_tabs").delete().in("id", archiveTabIds);
};

export const removeArchivedTabs = async () => {
  const tabs = await getArchivedTabs();
  const removeTabIds = tabs.map((t) => t.id);

  await supabase.from("archived_tabs").delete().in("id", removeTabIds);
};
