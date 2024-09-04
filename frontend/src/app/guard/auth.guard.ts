import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { getToken } from '../helpers/auth.helper';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const hasToken = getToken() != null;
  const isLoginOrRegister = route.routeConfig?.path == "login" || route.routeConfig?.path == "register";

  if(hasToken && !isLoginOrRegister) {
    return true;
  } else if(!hasToken && isLoginOrRegister) {
    return true
  }
  return false;
};
