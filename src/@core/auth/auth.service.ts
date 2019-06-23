import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLogin = false;
  public isManager = false;
  constructor() { }

  public onLogin() {
    return new Observable((subscriber) => {
      setTimeout(() => {
        this.isLogin = true; 
        subscriber.next(this.isLogin);
        subscriber.complete();
      }, 500);
    });
  }
}
