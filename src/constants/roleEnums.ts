export enum CustomerRoles {
    Basic = 10,
}
export enum AdminUserRoles {
    SuperAdmin = 1000,
    Customers = 10,
    Stores = 20,
    Vouchers = 30,
    PushNotifications = 40,
    Admins = 50,
}

export const customerRoleNames = {
    [CustomerRoles.Basic]: 'Basic',
};

export const adminUserRoleNames: { [key: number]: string | undefined | null } = {
    [AdminUserRoles.SuperAdmin]: 'Super Admin',
    [AdminUserRoles.Customers]: 'Customers',
    [AdminUserRoles.Stores]: 'Stores',
    [AdminUserRoles.Vouchers]: 'Vouchers',
    [AdminUserRoles.PushNotifications]: 'Push Notifications',
    [AdminUserRoles.Admins]: 'Admins',
};
