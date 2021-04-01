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
  getTodoSub: Subscription;
  addTodoSub: Subscription;
  deleteSub: Subscription;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getTodoSub = this.todoService.getTodos().subscribe((todos) => {
      console.log(todos);
      this.todos = todos;
    });
  }

  onDeleteTodo(todo: Todo) {
    this.deleteSub = this.todoService.deleteTodos(todo).subscribe(() => {
      this.todos = this.todos.filter((td) => td._id !== todo._id);
    });
  }

  onAddTodo(todo: Todo) {
    // console.log(todo);
    this.addTodoSub = this.todoService
      .addTodos(todo)
      .subscribe((todo: Todo) => {
        this.todos.push(todo);
      });
  }
  ngOnDestroy() {
    this.getTodoSub.unsubscribe();
    this.deleteSub.unsubscribe();
    this.addTodoSub.unsubscribe();
  }
}
