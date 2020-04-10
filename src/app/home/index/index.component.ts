import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  isLogged: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLogged = this.authService.isLoggedIn;
  }

}
