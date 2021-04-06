import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditUserComponent } from './edit-user/edit-user.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { AdminGuard } from './admin.guard';

@NgModule({
  declarations: [UserListComponent, TodoListComponent, EditUserComponent],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    RouterModule.forChild([
      {
        path: 'user-list',
        component: UserListComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'user-list/:id/edit',
        component: EditUserComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'todo-list',
        component: TodoListComponent,
        canActivate: [AdminGuard],
      },
    ]),
  ],
})
export class AdminModule {}
