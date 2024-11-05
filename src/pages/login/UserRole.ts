export enum UserRole{
    DEFAULT = "DEFAULT",
    EMPRESA = "EMPRESA",
    ADMIN = "ADMIN",
    USER = "USER"
}

const roleHierarchy: Record<UserRole, number> = {
    [UserRole.DEFAULT]: 0,
    [UserRole.USER]: 1,
    [UserRole.EMPRESA]: 2,
    [UserRole.ADMIN]: 3,
};

export function isRoleHigher(role1: UserRole , role2: UserRole): boolean {
    return roleHierarchy[role1] >= roleHierarchy[role2];
}
