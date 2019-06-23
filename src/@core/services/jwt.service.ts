import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  setToken(token) {
    localStorage.setItem('jwt', token);
  }
  setUserName(username) {
    localStorage.setItem('username', username);
  }
  getUserName() {
    return localStorage.getItem('username');                                                                                        
  }
  getToken() {
    return localStorage.getItem('jwt');
  }
  destroyToken() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
  }
}
