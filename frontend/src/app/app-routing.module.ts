import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './admin/todo-list/todo-list.component';
import { UserListComponent } from './admin/user-list/user-list.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { TodosComponent } from './todos/todos.component';
import { UserComponent } from './user/user.component';
import { AdminGuard } from './admin/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: TodosComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'auth', component: AuthComponent },
  {
    path: 'admin/user-list',
    component: UserListComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/todo-list',
    component: TodoListComponent,
    canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
