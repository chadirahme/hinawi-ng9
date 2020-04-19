import { Injectable } from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {NbAuthService} from "@nebular/auth";
import {tap} from "rxjs/internal/operators";
import {ApiAuth} from "./@core/services/api.auth";
import {Observable} from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
                private myauthService: ApiAuth) {
    }
    canActivate(): Observable<boolean> | Promise<boolean> | boolean {

        console.log(this.myauthService.isAuthenticated());
        if (this.myauthService.isAuthenticated()) {
            return true;
        }
        // navigate to login page
        this.router.navigate(['auth/login']);
        // you can save redirect url so after authing we can move them back to the page they requested
        return false;
    }

    // canActivate(user: any) {
    //     console.log(user);
    //     //return false;
    //      if(this.myauthService.isAuthenticated()){
    //         //console.log(data);
    //         //if (!data) {
    //             //this.router.navigate(['/dashboard']);
    //          return true;
    //         }
    //     //});
    //     this.router.navigate(['/login']);
    //      return false;
    //
    //     // return this.myauthService.getIsAuthenticated()
    //     //     .subscribe(authenticated =>
    //     //         tap(authenticated => {
    //     //             if (!authenticated) {
    //     //                 this.router.navigate(['auth/login']);
    //     //             }
    //     //         }),
    //     //     );
    // }
}
