import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css'],
})
export class AddTodoComponent implements OnInit {
  @Output() addTodo: EventEmitter<any> = new EventEmitter();
  @ViewChild('addTodoForm') addTodoForm: NgForm;
  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    const todo = {
      title: this.addTodoForm.value.title,
      completed: false,
    };

    this.addTodo.emit(todo);
  }
}
