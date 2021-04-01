import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Todo } from '../todos/Todo.model';
import { TodoService } from '../todos/todo.service';
import { faTrash, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { User } from '../auth/user.model';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, OnDestroy {
  todos: Todo[] = [];
  user: User;
  userSub: Subscription;
  @ViewChild('userEditForm') userEditForm: NgForm;

  // font awesome logo
  faTrash = faTrash;
  faTimes = faTimes;
  faCheck = faCheck;

  error: string;
  message: string;

  constructor(
    private todoService: TodoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });

    this.userSub = this.authService.user.subscribe((user) => {
      this.user = user;
    });

    setTimeout(() => {
      this.userEditForm.form.patchValue({
        name: this.user.name,
        email: this.user.email,
      });
    });
  }

  onDeleteTodo(todo: Todo) {
    if (window.confirm('Are you sure you want to delete this item ?')) {
      this.todoService.deleteTodos(todo).subscribe(() => {
        this.todos = this.todos.filter((td) => td._id !== todo._id);
      });
    }
  }

  onSubmit() {
    this.message = '';
    this.error = '';

    const name = this.userEditForm.value.name;
    const email = this.userEditForm.value.email;
    const password = this.userEditForm.value.password;
    const confirmedPassword = this.userEditForm.value.confirmedPassword;

    const updatedUser = {
      name,
      email,
      password,
    };

    if (password === confirmedPassword) {
      this.authService.updateUserProfile(updatedUser).subscribe(
        () => {
          this.message = 'Successfully Update!';
        },
        (errorMessage) => {
          this.error = errorMessage.error.error;
        }
      );
    } else {
      this.error = 'passwords do not match';
    }
  }
  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
