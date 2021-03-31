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

  // generate random string
  makeid(length) {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  onSubmit() {
    const todo = {
      _id: this.makeid(5),
      title: this.addTodoForm.value.title,
      completed: false,
    };

    this.addTodoForm.setValue({
      title: '',
    });

    // console.log(todo);
    this.addTodo.emit(todo);
  }
}
