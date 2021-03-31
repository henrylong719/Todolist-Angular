import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../Todo.model';
import { faCheck, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;

  constructor() {}

  ngOnInit(): void {}

  // font awesome logo
  faCheck = faCheck;
  faTrashAlt = faTrashAlt;
}
