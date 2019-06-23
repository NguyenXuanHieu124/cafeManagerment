import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API } from '../config/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // lấy thông tin user đăng nhập vào app -> query đến table AspNetUsers
  constructor(private http: HttpClient) { }

  _getUserByUserName(username: string): Observable<any>{
    return this.http.get<any>(`${API.HOST}/${API.USER.GET_USER_BY_USERNAME}?username=${username}`);
  }
}
