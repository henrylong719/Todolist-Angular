import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Todo } from './Todo.model';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit, OnDestroy {
  todos: Todo[] = [];
  todoSub: Subscription;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoSub = this.todoService.getTodos().subscribe((todos) => {
      console.log(todos);
      this.todos = todos;
    });
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
  ngOnDestroy() {
    this.todoSub.unsubscribe();
  }
}
