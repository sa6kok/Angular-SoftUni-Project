import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

const NOT_FOUND = 'Page not found';
const ERROR = 'error';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  message = NOT_FOUND;

  constructor(activatedRoute: ActivatedRoute) {
    const error = activatedRoute.snapshot.queryParams[ERROR] || NOT_FOUND;
    this.message = error;
  }

  ngOnInit(): void {
  }

}
