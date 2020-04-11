import { Component, OnInit } from '@angular/core';
import { IUser } from '../interfaces/user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { ToastrService } from 'ngx-toastr';

const USER_STATUS_CHANGED = 'User status changed succesfully!';
const USER_STATUS_NOT_CHANGED = 'User status was not chaged!';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  users: IUser[];

  constructor(private activatedRoute: ActivatedRoute,
              private service: UserService,
              private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => this.users = data.allUsers);
  }

  changeStatus(userId: string) {
       this.service.changeStatus(userId).subscribe(resp => {
        if (resp) {
            this.service.getAllUsers().subscribe(data => this.users = data);
            this.toastr.success(USER_STATUS_CHANGED);
        } else {
          this.toastr.error(USER_STATUS_NOT_CHANGED);
        }
      });
  }

}
