import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Todo } from './Todo.model';
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
export class TodoService {
  todos: Todo[] = [];

  todoUrl: string = 'http://localhost:5000/api/todos';

  constructor(private http: HttpClient) {}

  // testing use of rxjs Subject
  // completedUpdate = new Subject<string>();

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.todoUrl}`).pipe(pluck('data'));
  }

  toggleTodos(todo: Todo) {
    const url = `${this.todoUrl}/${todo._id}`;
    return this.http.put<Todo[]>(url, httpOptions).subscribe();
  }

  deleteTodos(todo: Todo) {
    const url = `${this.todoUrl}/${todo._id}`;
    return this.http.delete<Todo[]>(url, httpOptions);
  }

  addTodos(todo: Todo) {
    return this.http
      .post<Todo[]>(this.todoUrl, todo, httpOptions)
      .pipe(pluck('data'));
  }
}
