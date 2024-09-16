
export enum Role {
    Creator = 1,
    Manage = 2,
    Member = 3
}

export interface User {
    id: string;
    name: string;
    email: string;
    picture?: string;
}

export interface Membership extends User {
    role: Role;
    organization_id: string
}

export interface Organization {
    id: string;
    name: string;
    description: string;
    member_count?: number;
    members?: Membership[];
}

export interface Organizations {
    managed_organizations: Organization[];
    member_organizations: Organization[];
}
