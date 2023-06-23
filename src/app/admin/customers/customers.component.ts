import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  users$: any;

  constructor(
    private adminService: AdminService,
    private http: HttpClient,

  ) {}

  ngOnInit(): void {
    this.GetAll();
  }

  GetAll(): void {
    this.adminService.getUsers().subscribe((res: any) => {
      this.users$ = res;
      console.log(this.users$, "this is data");

    });
  }

  blockUser(id: any): void {
    console.log("reaching here");
    
    this.adminService.blockUser(id).subscribe((res: any) => {
    
     
    });
    this.ngOnInit()
    
  }
}
