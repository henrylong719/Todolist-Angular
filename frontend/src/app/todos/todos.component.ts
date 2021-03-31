import { Component, OnInit } from '@angular/core';
import { Todo } from './Todo.model';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todos = this.todoService.getTodos();
  }

  onDeleteTodo(todo: Todo) {
    this.todos = this.todos.filter((td) => td._id !== todo._id);

    this.todoService.deleteTodos(todo);
  }

  onAddTodo(todo: Todo) {
    // console.log(todo);
    this.todos.push(todo);
    this.todoService.addTodos(todo);
  }
}
