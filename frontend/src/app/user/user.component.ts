import { Component, OnInit } from '@angular/core';
import { Todo } from '../todos/Todo.model';
import { TodoService } from '../todos/todo.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  todos: Todo[] = [];

  // font awesome logo
  faTrash = faTrash;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  onDeleteTodo(todo: Todo) {
    if (window.confirm('Are you sure you want to delete this item ?')) {
      this.todoService.deleteTodos(todo).subscribe(() => {
        this.todos = this.todos.filter((td) => td._id !== todo._id);
      });
    }
  }
}
