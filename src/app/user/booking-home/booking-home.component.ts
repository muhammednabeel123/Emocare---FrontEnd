import { getAllService } from './../userState/user.interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserServiceService } from '../user.service.service';
import { Emitter } from '../emitters/emitter';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CounselorView } from '../userState/user.interface';

@Component({
  selector: 'app-booking-home',
  templateUrl: './booking-home.component.html',
  styleUrls: ['./booking-home.component.css']
})
export class BookingHomeComponent implements OnInit, OnDestroy {
  counselors: CounselorView[] = [];
  services : getAllService[] = []
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 2;
  

  message: string;
  isClicked: string | null = null;
  selectedServiceId: string | null | undefined | number = null;
  private userSubscription: Subscription | undefined;

  constructor(private http: HttpClient, private userService: UserServiceService, private router: Router) {}

  ngOnInit(): void {
  
    this.userSubscription = this.userService.getUser().subscribe(
      (res: any) => {},
      (err) => {this.router.navigate(['/'])})
      this.getAllService()
    }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  getServices(id?: string) {
    this.selectedServiceId = id;
    
    this.userService.getServiceById(id).subscribe(
      (response: CounselorView | CounselorView[]) => {
        if (Array.isArray(response)) {
          this.counselors = response.filter((counselor: CounselorView) => !counselor.is_Blocked && counselor.is_Available && counselor.is_verified);
        } else {
          this.counselors = [response].filter((counselor: CounselorView) => !counselor.is_Blocked && counselor.is_Available &&  counselor.is_verified );
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  BookId(id:string|undefined) {this.router.navigate(['/slot', id])}

  getAllService() {
    this.userService.getAllServices().subscribe((res: getAllService[]) => {this.services = res ; console.log(this.services,"heythsus"); // Log the content of this.services
      },
      (error) => {
        console.log(error);
      }
    );
  }

  
  handleButtonClick(): void {this.router.navigate(['/'])}
}

