import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './Todo.model';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: Todo[] = [];

  todoUrl: string = 'http://localhost:5000/api/todos';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.todoUrl}`).pipe(pluck('todos'));
  }

  toggleTodos(todo: Todo) {}

  deleteTodos(todo: Todo) {
    // this.todos = this.todos.filter((td) => td._id !== todo._id);
    // console.log(this.todos);
  }

  addTodos(todo: Todo) {
    // this.todos.push(todo);
  }
}
