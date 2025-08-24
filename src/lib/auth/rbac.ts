export enum Permission {
  // Content Management
  CREATE_PRODUCT = 'create:product',
  UPDATE_PRODUCT = 'update:product',
  DELETE_PRODUCT = 'delete:product',
  PUBLISH_PRODUCT = 'publish:product',
  
  CREATE_DESIGN = 'create:design',
  UPDATE_DESIGN = 'update:design',
  DELETE_DESIGN = 'delete:design',
  PUBLISH_DESIGN = 'publish:design',
  
  CREATE_PROGRAM = 'create:program',
  UPDATE_PROGRAM = 'update:program',
  DELETE_PROGRAM = 'delete:program',
  PUBLISH_PROGRAM = 'publish:program',
  
  // User Management
  VIEW_USERS = 'view:users',
  CREATE_USER = 'create:user',
  UPDATE_USER = 'update:user',
  DELETE_USER = 'delete:user',
  MANAGE_ROLES = 'manage:roles',
  
  // Analytics & Reports
  VIEW_ANALYTICS = 'view:analytics',
  EXPORT_DATA = 'export:data',
  
  // System Administration
  MANAGE_SETTINGS = 'manage:settings',
  VIEW_LOGS = 'view:logs',
  MANAGE_BACKUPS = 'manage:backups',
}

export const ROLE_PERMISSIONS = {
  admin: [
    // Full access to all permissions
    ...Object.values(Permission),
  ],
  editor: [
    // Content management permissions
    Permission.CREATE_PRODUCT,
    Permission.UPDATE_PRODUCT,
    Permission.PUBLISH_PRODUCT,
    Permission.CREATE_DESIGN,
    Permission.UPDATE_DESIGN,
    Permission.PUBLISH_DESIGN,
    Permission.CREATE_PROGRAM,
    Permission.UPDATE_PROGRAM,
    Permission.PUBLISH_PROGRAM,
    Permission.VIEW_ANALYTICS,
  ],
  viewer: [
    // Read-only permissions
    Permission.VIEW_ANALYTICS,
  ],
} as const;

export type Role = keyof typeof ROLE_PERMISSIONS;

export function hasPermission(userPermissions: string[], requiredPermission: Permission): boolean {
  return userPermissions.includes(requiredPermission);
}

export function hasAnyPermission(userPermissions: string[], requiredPermissions: Permission[]): boolean {
  return requiredPermissions.some(permission => userPermissions.includes(permission));
}

export function hasAllPermissions(userPermissions: string[], requiredPermissions: Permission[]): boolean {
  return requiredPermissions.every(permission => userPermissions.includes(permission));
}

export function getRolePermissions(role: Role): Permission[] {
  return [...(ROLE_PERMISSIONS[role] || [])];
}

export function canAccessAdminPanel(userRole?: Role): boolean {
  return userRole === 'admin' || userRole === 'editor';
}

export function canManageContent(userPermissions: string[]): boolean {
  const contentPermissions = [
    Permission.CREATE_PRODUCT,
    Permission.UPDATE_PRODUCT,
    Permission.CREATE_DESIGN,
    Permission.UPDATE_DESIGN,
    Permission.CREATE_PROGRAM,
    Permission.UPDATE_PROGRAM,
  ];
  
  return hasAnyPermission(userPermissions, contentPermissions);
}

export function canPublishContent(userPermissions: string[]): boolean {
  const publishPermissions = [
    Permission.PUBLISH_PRODUCT,
    Permission.PUBLISH_DESIGN,
    Permission.PUBLISH_PROGRAM,
  ];
  
  return hasAnyPermission(userPermissions, publishPermissions);
}
