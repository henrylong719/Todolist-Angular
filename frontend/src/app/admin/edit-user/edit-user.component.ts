import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/auth/user.model';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private location: Location
  ) {}

  @ViewChild('userEditForm') userEditForm: NgForm;
  user: User;
  message: string;
  error: string;
  id: string;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.adminService.getUserById(this.id).subscribe((user) => {
      this.user = user;

      setTimeout(() => {
        this.userEditForm.form.patchValue({
          name: this.user.name,
          email: this.user.email,
          isAdmin: this.user.isAdmin,
        });
      });
    });
  }

  onGoBack() {
    this.location.back();
  }

  onSubmit() {
    this.error = '';

    const name = this.userEditForm.value.name;
    const email = this.userEditForm.value.email;
    const password = this.userEditForm.value.password;
    const confirmedPassword = this.userEditForm.value.confirmedPassword;
    const isAdmin = this.userEditForm.value.isAdmin;

    const updatedUser = {
      name,
      email,
      password,
      isAdmin,
    };

    if (password === confirmedPassword) {
      this.adminService.updateUserById(this.id, updatedUser).subscribe(
        () => {
          this.onGoBack();
        },
        (errorMessage) => {
          this.error = errorMessage.error.error;
        }
      );
    } else {
      this.error = 'passwords do not match!';
    }
  }
}
