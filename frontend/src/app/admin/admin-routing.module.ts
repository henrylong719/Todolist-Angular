import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { EditUserComponent } from './edit-user/edit-user.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {
    path: 'admin/user-list',
    component: UserListComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/user-list/:id/edit',
    component: EditUserComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/todo-list',
    component: TodoListComponent,
    canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
