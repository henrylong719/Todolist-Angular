import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../Todo.model';
import { faCheck, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  // font awesome logo
  faCheck = faCheck;
  faTrashAlt = faTrashAlt;

  onToggle(todo: Todo) {
    // update UI
    todo.completed = !todo.completed;
    // update server
  }

  onDelete(todo: Todo) {
    this.deleteTodo.emit(todo);
  }
}
