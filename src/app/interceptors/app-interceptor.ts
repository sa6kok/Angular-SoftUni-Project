import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from '../shared/services/token-storage.service';

const apiURL = environment.apiUrl;
const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const fullURL = req.url.includes('http') ? req.url : `${apiURL}/${req.url}`;
    let authReq = req;
    const token = this.token.getToken();
    if (token != null) {
      authReq = req.clone({url: fullURL, headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    } else {
      authReq = req.clone({ url: fullURL});
    }
    return next.handle(authReq);
  }
}
