import { Component, OnInit } from '@angular/core';
import { faListUl } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'todolist';
  faListUl = faListUl;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoLogin();
  }
}
