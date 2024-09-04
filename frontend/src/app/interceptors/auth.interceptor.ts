import { HttpInterceptorFn } from '@angular/common/http';
import { getToken } from '../helpers/auth.helper';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let token = getToken();

  if(token) {
    const updatedRquest = req.clone({
      headers: req.headers.append("Authorization", `Token ${token}`),
    });
    return next(updatedRquest);
  }
  
  return next(req);
};
