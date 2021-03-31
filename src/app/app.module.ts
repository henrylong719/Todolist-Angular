import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TodosComponent } from './todos/todos.component';
import { TodoItemComponent } from './todos/todo-item/todo-item.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, TodosComponent, TodoItemComponent],
  imports: [BrowserModule, AppRoutingModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
