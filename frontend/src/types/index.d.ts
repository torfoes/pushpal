
export type Role = "member" | "creator" | "manager";


export interface User {
    id: string;
    name: string;
    email: string;
    picture?: string;
}

export interface Membership {
    id: string;
    user: User;
    role: Role;
    organization_id: string;
}

export interface Organization {
    id: string;
    name: string;
    description: string;
    role: Role;
    member_count: number;
    members?: Membership[];
}

export interface Event {
    id: string;
    creator_id: string;
    date: string;
    description: string;
}

interface PushSubscription {
    id: string;
    user_id: string;
    endpoint: string;
    p256dh_key: string;
    auth_key: string;
    is_bot: boolean;
    browser_name: string;
    browser_version: string;
    device_model: string;
    device_type: string;
    device_vendor: string;
    engine_name: string;
    engine_version: string;
    os_name: string;
    os_version: string;
    cpu_architecture: string;
    user_agent: string;
    last_used_at: string;
    created_at: string;
    updated_at: string;
}

export interface PushSubscriptionInput {
    endpoint: string;
    p256dh_key: string;
    auth_key: string;
}