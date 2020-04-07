import { Component, OnInit } from '@angular/core';
import { IUser } from '../interfaces/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  users: IUser[];

  constructor() { }

  ngOnInit(): void {
  }

}
