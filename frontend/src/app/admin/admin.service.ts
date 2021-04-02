import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../auth/user.model';
import { pluck } from 'rxjs/operators';
import { Todo } from '../todos/Todo.model';

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

  todoListUrl: string = 'http://localhost:5000/api/todos/admin/todo-list';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userListUrl).pipe(pluck('data'));
  }

  deleteUser(id: string) {
    const url = `${this.userListUrl}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  getUserById(id: string): Observable<User> {
    const url = `${this.userListUrl}/${id}`;
    return this.http.get<User>(url);
  }

  updateUserById(id: string, updatedUser) {
    const url = `${this.userListUrl}/${id}`;
    return this.http.put(url, updatedUser, httpOptions);
  }

  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.todoListUrl}`).pipe(pluck('data'));
  }

  deleteTodo(id: string) {
    const url = `http://localhost:5000/api/todos/user-todos/${id}`;
    return this.http.delete<Todo[]>(url, httpOptions);
  }
}
