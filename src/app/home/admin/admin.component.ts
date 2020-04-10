import { Component, OnInit } from '@angular/core';
import { IUser } from '../interfaces/user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  users: IUser[];

  constructor(activatedRoute: ActivatedRoute,
              private service: UserService) {
    activatedRoute.data.subscribe(data => this.users = data.allUsers);
  }

  ngOnInit(): void {

  }

  changeStatus(userId: string) {
     /*  this.service.changeStatus(userId).subscribe(resp => {
        if (resp) {

        }
      }); */
  }

}
