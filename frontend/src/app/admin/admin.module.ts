import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditUserComponent } from './edit-user/edit-user.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [UserListComponent, TodoListComponent, EditUserComponent],
  imports: [CommonModule, FormsModule, FontAwesomeModule, AdminRoutingModule],
})
export class AdminModule {}
