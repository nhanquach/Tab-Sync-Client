import { Session, User } from '@supabase/supabase-js';

export interface ITabSyncSettings {
    deviceName: string;
    user: User;
    token: Session;
}
