import { IDatabaseUpdatePayload } from "../interfaces/IDatabaseUpdate";
import { ITab } from "../interfaces/iTab";
import * as supabaseClient from "./supabaseClient";

var backend: typeof supabaseClient;

const getClient = async () => {
  if (backend) {
    return backend;
  }

  return supabaseClient;
};

export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return (await getClient()).signIn({ email, password });
};

export const signUp = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return (await getClient()).signUp({ email, password });
};

export const getUser = async () => {
  return (await getClient()).getUser();
};

export const changePassword = async ({
  newPassword,
}: {
  newPassword: string;
}) => {
  return (await getClient()).changePassword({ newPassword });
};

export const resetPassword = async ({ email }: { email: string }) => {
  return (await getClient()).resetPassword({ email });
};

export const deleteAccount = async () => {
  return (await getClient()).deleteAccount();
}

export const getOpenTabs = async () => {
  return (await getClient()).getOpenTabs();
};

export const getArchivedTabs = async () => {
  return (await getClient()).getArchivedTabs();
};

export const sendTab = async (
  tab: ITab
): Promise<{ data: ITab; error?: { message: string } }> => {
  return (await getClient()).sendTab(tab);
};

export const removeTab = async (tabIds: number[], table?: string) => {
  (await getClient()).removeTab(tabIds, table);
};

export const archiveTab = async (tab: ITab[]) => {
  (await getClient()).archiveTab(tab);
};

export const onOpenTabChange = async (
  callback: (payload: IDatabaseUpdatePayload) => void
) => {
  return (await getClient()).onOpenTabChange(callback);
};

export const onArchivedTabChange = async (
  callback: (payload: IDatabaseUpdatePayload) => void
) => {
  return (await getClient()).onArchivedTabChange(callback);
};

export const archiveOpenTabs = async (deviceName?: string) => {
  return (await getClient()).archiveOpenTabs(deviceName);
};
export const removeArchivedTabs = async (deviceName?: string) => {
  return (await getClient()).removeArchivedTabs(deviceName);
};
