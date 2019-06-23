import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API } from 'src/@core/config/api';

@Injectable({
    providedIn: 'root'
})
export class RolesService{
    constructor (private http: HttpClient)
    {}

    isManager(userName : string): Observable<boolean>{
        return this.http.get<boolean>("http://localhost:8088/api/ChiNhanhs/ManagerAuthor/?userName="+userName);
    }
}