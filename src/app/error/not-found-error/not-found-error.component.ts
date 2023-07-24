import { Component } from '@angular/core';
import { Router, NavigationEnd, NavigationError } from '@angular/router';

@Component({
  selector: 'app-not-found-error',
  templateUrl: './not-found-error.component.html',
  styleUrls: ['./not-found-error.component.css']
})
export class NotFoundErrorComponent {

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationError) {
        if (event.error.status === 404) {
          this.router.navigate(['/404']);
        }
      }
    });
  }
}
