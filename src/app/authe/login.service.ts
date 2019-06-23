import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from 'src/@core/interfaces/user.interface';
import { API } from 'src/@core/config/api';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }
  login(user: User): Observable<any> {
    let header = { 'Content-Type': 'application/x-www-form-urlencoded' };
    let body = `UserName=${user.UserName}&Password=${user.Password}&Grant_Type=password`;
    return this.http.post<any>(`${API.HOST}/${API.LOGIN.GET_TOKEN}`, body, { headers: header });
  }
}
