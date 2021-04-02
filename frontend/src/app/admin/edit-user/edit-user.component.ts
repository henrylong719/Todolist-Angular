import { Component, OnInit } from '@angular/core';
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
    private adminService: AdminService
  ) {}

  user: User;

  ngOnInit(): void {
    const id: string = this.route.snapshot.paramMap.get('id');

    this.adminService.getUserById(id).subscribe((user) => {
      this.user = user;
    });
  }
}
