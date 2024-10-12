
export type Role = "member" | "creator" | "manager";


export interface User {
    id: string;
    name: string;
    email: string;
    picture?: string;
}

export interface Membership extends User{
    id: string;
    organization_id: string;
    role: Role;
}

export interface MemberInfo {
    isMember: boolean;
    role: Role;
}

export interface Organization {
    id: string;
    name: string;
    description: string;
    role: Role;
    member_count: number;
    members?: Membership[];
}

export interface PushSubscription {
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

export interface Event {
    id: string;
    name: string;
    description?: string;
    date: string;
    attendance_required: boolean;
}

export interface Attendance {
    id: string;
    organization_id: string;
    event_id: string;
    checkin_status: boolean;
    checkin_time: string | null;
    rsvp_status: boolean;
    rsvp_time: string | null;
    user_id: string;
    user_name: string;
    user_email: string;
    user_picture: string | null;
    user_role: string;
}


export interface EventDetails extends Event {
    attendances: Attendance[];
}