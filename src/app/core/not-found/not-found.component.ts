import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  message = 'Page not found';

  constructor(activatedRoute: ActivatedRoute) {
    const error = activatedRoute.snapshot.paramMap.get('error');
    if (error) {
      this.message = error;
    }
   }

  ngOnInit(): void {
  }

}
