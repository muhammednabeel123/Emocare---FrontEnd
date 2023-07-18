import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SwalService } from 'src/app/swal.service';

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
    private swalService: SwalService

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
    this.swalService.confirmBlock().then((result) => {
      if (result.isConfirmed) {
        this.adminService.blockUser(id).subscribe(
          (res: any) => {
            this.ngOnInit()
            console.log(res);
          },
          (err: any) => {
            console.log(err);
          }
        );
      }
    });
  }
  
   
}
