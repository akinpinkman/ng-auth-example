import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Promise<boolean> | Observable<boolean | UrlTree> {
    // user subject already observable so I just return it
    //  and since user is object I transform it into a boolean
    return this.authService.user.pipe(
      take(1),
      map((user) => {
        // user'i aldıktan sonra boolean elde etmek istiyorum
        // !!user sayesinde null ya da undefined olmayan değeri true yapıyor ve
        // ikinci ünlem ile false yapıyorum.
        const isAuth = !!user;
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/auth']);
      })
    );
  }
}
