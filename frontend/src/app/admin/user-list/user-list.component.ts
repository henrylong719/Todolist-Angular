import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/user.model';
import { AdminService } from '../admin.service';
import {
  faTimes,
  faCheck,
  faTrash,
  faEdit,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private authService: AuthService
  ) {}
  // font awesome logo
  faTrash = faTrash;
  faTimes = faTimes;
  faCheck = faCheck;
  faEdit = faEdit;

  users: User[];
  userSubscribe: Subscription;

  currentUser: User;

  ngOnInit(): void {
    this.adminService.getAllUsers().subscribe((data) => {
      this.users = data;
    });

    this.userSubscribe = this.authService.user.subscribe((user) => {
      this.currentUser = user;
    });
  }

  onDeleteUser(id: string) {
    if (window.confirm('Are you sure you want to delete this user ?')) {
      this.adminService.deleteUser(id).subscribe(() => {
        this.users = this.users.filter((ur) => ur._id !== id);
      });
    }
  }

  onEditUser() {}
}
