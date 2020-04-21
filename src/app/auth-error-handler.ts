import {ErrorHandler, Injectable, Injector, NgZone} from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthErrorHandler implements ErrorHandler {

  private router: Router;

  constructor(injector: Injector, private ngZone: NgZone) {
    setTimeout(() => {
      this.router = injector.get(Router);
    });
  }
  handleError(error) {
    console.log('AuthErrorHandler >> Hio');
    console.log(error.status);
    // if (error.status === 401 || error.status === 403 || error.status === 0) {
    //
    //   //router.navigate(['auth/login']);
    //  // setTimeout(() => this.router.navigate(['auth/login', { error: error }], { skipLocationChange: true}));
    //   this.ngZone.run(() => {
    //     //this.router.navigate(['auth/login']).then();
    //     setTimeout(() => this.router.navigate(['/auth/login']));
    //     this.router.navigate(['accounting/cuc']);
    //   });
    //   this.ngZone.run(() => { console.log('Outside Done!'); });
    //   //this.router.navigate(['auth/login']);
    // }
    // IMPORTANT: Rethrow the error otherwise it gets swallowed
    throw error;
  }
  //constructor(private injector: Injector,private router1: Router) { }

  // handleError(error) {
  //   console.log(error.status);
  //   console.log(error.status);
  //   const router = this.injector.get(Router);
  //   if (error.status === 401 || error.status === 403 || error.status===0) {
  //     router.navigate(['auth/login']);
  //   }
  //   throw error;
  // }
}
