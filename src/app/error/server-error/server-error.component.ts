import { Component } from '@angular/core';
import { Router, NavigationEnd, NavigationError } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent {

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationError) {
        if (event.error.status === 500) {
          this.router.navigate(['/500']);
        }
      }
    });
  }
}