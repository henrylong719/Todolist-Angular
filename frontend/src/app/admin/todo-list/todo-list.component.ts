import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/todos/Todo.model';
import { AdminService } from '../admin.service';
import { faTrash, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  // font awesome logo
  faTrash = faTrash;
  faTimes = faTimes;
  faCheck = faCheck;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getAllTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  getTodoUser() {}

  onDeleteTodo(id: string) {
    if (window.confirm('Are you sure you want to delete this item ?')) {
      this.adminService.deleteTodo(id).subscribe((todos) => {
        this.todos = this.todos.filter((td) => td._id !== id);
      });
    }
  }
}
