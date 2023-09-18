// @ts-ignore
import { SupabaseClient, createClient } from "@supabase/supabase-js";

import { TABLES } from "./constants";
import { ITabSyncSettings } from "../interfaces/TabSyncSettings";
import { ITab } from "../interfaces/iTab";
import { IDatabaseUpdatePayload } from "../interfaces/IDatabaseUpdate";

const rootClient = createClient(
  process.env.REACT_APP_SUPABASE_URL!,
  process.env.REACT_APP_SUPABASE_KEY!
);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let client: SupabaseClient<any, "public", any> | null;

export const getClient = async () => {
  try {
    const tabSyncSettings = getLocalSettings();

    if (!tabSyncSettings || !tabSyncSettings.token) {
      return { client, deviceName: "", userId: "" };
    }

    const { deviceName, user } = tabSyncSettings;

    if (client) {
      return {
        client,
        deviceName,
        userId: user.id,
      };
    }

    const currentUser = await getUser();

    if (!currentUser) {
      return { client, deviceName: "", userId: "" };
    }

    client = createClient(
      process.env.REACT_APP_SUPABASE_URL!,
      process.env.REACT_APP_SUPABASE_KEY!,
      {
        global: {
          headers: {
            Authorization: `Bearer ${tabSyncSettings.token.access_token}`,
          },
        },
        auth: {
          autoRefreshToken: true,
          persistSession: true,
        },
      }
    );

    return {
      client,
      deviceName: deviceName,
      userId: currentUser.id,
    };
  } catch (e) {
    console.error(e);
  }

  return { client, deviceName: "", userId: "" };
};

export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await rootClient.auth.signInWithPassword({
    email,
    password,
  });

  const tabSyncSettings = await getLocalSettings();
  localStorage.setItem(
    "tabSyncSettings",
    JSON.stringify({
      tabSyncSettings: {
        ...tabSyncSettings,
        user: user.data.user,
        token: user?.data?.session || tabSyncSettings.token,
      },
    })
  );

  return user;
};

export const signUp = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return await rootClient.auth.signUp({
    email,
    password,
  });
};

export const signOut = async () => {
  await rootClient.auth.signOut();
  localStorage.clear();
};

export const getUser = async () => {
  const tabSyncSettings = await getLocalSettings();

  const user = await rootClient.auth.getUser(
    tabSyncSettings?.token?.access_token
  );

  const session = await rootClient.auth.getSession();

  localStorage.setItem(
    "tabSyncSettings",
    JSON.stringify({
      tabSyncSettings: {
        ...tabSyncSettings,
        user: user.data.user,
        token: session.data.session || tabSyncSettings.token,
      },
    })
  );

  return user?.data?.user;
};

export const getOpenTabs = async (
  deviceName?: string
): Promise<{
  data: ITab[];
  error?: string;
}> => {
  const { client, userId } = await getClient();

  if (client && userId) {
    const { data, error } = deviceName
      ? await client
          .from(TABLES.OPEN_TABS)
          .select()
          .eq("deviceName", deviceName)
      : await client.from(TABLES.OPEN_TABS).select();
    return {
      data: data as ITab[],
      error: error?.message,
    };
  }

  return { data: [], error: "No user id" };
};

export const getArchivedTabs = async (deviceName?: string) => {
  const { client, userId } = await getClient();

  if (client && userId) {
    const { data, error } = deviceName
      ? await client
          .from(TABLES.ARCHIVED_TABS)
          .select()
          .eq("deviceName", deviceName)
      : await client.from(TABLES.ARCHIVED_TABS).select();
    return {
      data: data as ITab[],
      error: error?.message,
    };
  }

  return { data: [], error: "No user id" };
};

export const sendTab = async (
  tab: ITab
): Promise<{ data: ITab; error?: { message: string } }> => {
  checkTokenExpired();

  const { id, url, favIconUrl = "", title, index, windowId } = tab;
  const { client, deviceName, userId } = await getClient();

  if (!userId) {
    return { data: tab, error: { message: "No user id" } };
  }

  if (client) {
    await client.from(TABLES.OPEN_TABS).upsert({
      id,
      url,
      favIconUrl,
      title,
      index,
      windowId,
      deviceName,
      userId,
    });
  }

  return { data: tab, error: undefined };
};

export const removeTab = async (tabIds: number[], table = TABLES.OPEN_TABS) => {
  checkTokenExpired();

  const { client } = await getClient();

  if (client) {
    await client.from(table).delete().in("id", tabIds);
  }
};

export const archiveTab = async (tabs: ITab[]) => {
  checkTokenExpired();

  const { client, userId } = await getClient();

  const tabsWillBeArchived = tabs.map(
    ({ id, url, favIconUrl, title, index, windowId, deviceName }) => {
      return {
        id,
        url,
        favIconUrl,
        title,
        index,
        windowId,
        deviceName,
        userId,
      };
    }
  );

  if (!userId) {
    return { data: [], error: { message: "No user id" } };
  }

  if (client) {
    await client.from(TABLES.ARCHIVED_TABS).upsert(tabsWillBeArchived);
  }
};

export const onOpenTabChange = async (
  callback: (payload: IDatabaseUpdatePayload) => void
) => {
  const { client, userId } = await getClient();
  if (client) {
    client
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: TABLES.OPEN_TABS,
          filter: `userId=eq.${userId}`,
        },
        (payload) => {
          callback(payload as unknown as IDatabaseUpdatePayload);
        }
      )
      .subscribe();
  }
};

export const onArchivedTabChange = async (
  callback: (paylod: IDatabaseUpdatePayload) => void
) => {
  const { client, userId } = await getClient();
  if (client) {
    client
      .channel("custom-all-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: TABLES.ARCHIVED_TABS,
          filter: `userId=eq.${userId}`,
        },
        (payload) => {
          callback(payload as unknown as IDatabaseUpdatePayload);
        }
      )
      .subscribe();
  }
};

export const archiveOpenTabs = async (deviceName?: string) => {
  const { data: openTabs, error } = await getOpenTabs(deviceName);

  if (error) {
    console.error(error);
  }

  if (openTabs) {
    await archiveTab(openTabs);
    await removeTab(openTabs.map<number>((t) => t.id!));
  }
};

export const removeArchivedTabs = async (deviceName?: string) => {
  const archivedTabs = await getArchivedTabs(deviceName);

  const tabIds = archivedTabs.data.map<number>((t) => t.id);
  await removeTab(tabIds, TABLES.ARCHIVED_TABS);
};

export const sendFeedback = async (type: string, description: string) => {
  const { client, userId } = await getClient();
  if (!userId) {
    return { error: { message: "No user id" } };
  }

  if (client) {
    await client.from("feedback").insert([{ type, description }]);
  }
};

const checkTokenExpired = async () => {
  const tabSyncSettings = await getLocalSettings();

  if (
    tabSyncSettings?.token?.expires_in &&
    tabSyncSettings.token.expires_in <= 100
  ) {
    getNewToken();
  }
};

const getNewToken = async () => {
  const tabSyncSettings = await getLocalSettings();

  if (tabSyncSettings?.token?.refresh_token) {
    const newToken = await rootClient.auth.refreshSession({
      refresh_token: tabSyncSettings.token.refresh_token,
    });

    localStorage.setItem(
      "tabSyncSettings",
      JSON.stringify({
        tabSyncSettings: {
          ...tabSyncSettings,
          token: newToken.data.session || tabSyncSettings.token,
        },
      })
    );

    client = null;
  }
};

const getLocalSettings = (): ITabSyncSettings => {
  try {
    const tabSyncSettings = localStorage.getItem("tabSyncSettings");

    return JSON.parse(tabSyncSettings!).tabSyncSettings as ITabSyncSettings;
  } catch (e) {
    console.error("🚀 . e:", e);
    return {
      deviceName: "",
      token: {
        refresh_token: "",
        access_token: "",
        expires_in: 0,
        token_type: "",
        user: {
          id: "",
          app_metadata: {},
          user_metadata: {},
          aud: "",
          created_at: "",
        },
      },
      user: {
        id: "",
        app_metadata: {},
        user_metadata: {},
        aud: "",
        created_at: "",
      },
    };
  }
};
