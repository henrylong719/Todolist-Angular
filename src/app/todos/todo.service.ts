import { Injectable } from '@angular/core';
import { Todo } from './Todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor() {}

  todos: Todo[] = [
    {
      _id: '1',
      title: 'clean the room',
      completed: false,
    },
    {
      _id: '2',
      title: 'clean the room2',
      completed: true,
    },
    {
      _id: '3',
      title: 'clean the room3',
      completed: false,
    },
    {
      _id: '4',
      title: 'clean the room4',
      completed: false,
    },
  ];

  getTodos() {
    return this.todos;
  }
}