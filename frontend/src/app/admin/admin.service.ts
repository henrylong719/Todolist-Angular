import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../auth/user.model';
import { pluck } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  users: User[] = [];

  userListUrl: string = 'http://localhost:5000/api/users/admin/user-list';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userListUrl).pipe(pluck('data'));
  }

  deleteUser(id: string) {
    const url = `${this.userListUrl}/${id}`;
    return this.http.delete(url, httpOptions);
  }
}
