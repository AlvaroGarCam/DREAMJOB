import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { map, take } from 'rxjs/operators';

@Injectable({
     providedIn: 'root'
})
export class AuthGuard implements CanActivate {
     constructor(
          private router: Router,
          private userService: UserService
     ) { }

     canActivate(
          route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot
     ): Observable<boolean> {
          return this.userService.isAuthenticated.pipe(
               take(1),
               map(isAuthenticated => {
                    if (!isAuthenticated) {
                         // Si no está autenticado, redirigir al login
                         this.router.navigateByUrl('/login');
                         return false;
                    }
                    return true;
               })
          );
     }
}