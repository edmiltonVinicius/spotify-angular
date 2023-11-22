import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { PermissionService } from '../services/permission/permission.service';

export const AuthenticationGuard: CanMatchFn = (route, segments) => {
  return inject(PermissionService).hasPermission();
};
