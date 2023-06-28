import { HttpClient } from '@angular/common/http';
import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';
import { SwalService } from '../../swal.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Toast } from 'src/app/sweet alert/sweetalert';

@Component({
  selector: 'app-counsellors',
  templateUrl: './counsellors.component.html',
  styleUrls: ['./counsellors.component.css']
})



export class CounsellorsComponent implements OnInit{

  constructor(private adminService: AdminService,
    private http: HttpClient,
    private swalService: SwalService,
    private router: Router){}
    counselor$:any


  ngOnInit(): void {
    this.getCounselor()
  }

  getCounselor():void{this.adminService.getCounselor().subscribe((res)=>{this.counselor$ = res,console.log(res,"amaha");
  })}

  viewCounselor(id: any): void {this.router.navigate(['admin/view-counselor',id]);}

  block(id: any): void {
    this.swalService.confirmBlock().then((result) => {
      if (result.isConfirmed) {
       
        this.adminService.blockCounselor(id).subscribe(
          (res) => {
            console.log(res);
            this.ngOnInit();
            this.swalService.showSuccessMessage('Blocked!', 'Your user has been blocked.');
          },
          (err) => {
            console.log(err);
            this.swalService.showErrorMessage('Error', 'An error occurred.');
          }
        );
      }
    });
  }

  
  
  
  
  
  
  
  unblock(id: any): void {
    this.swalService.confirmBlock().then((result) => {
      if (result.isConfirmed) {
        this.adminService.unblockCounselor(id).subscribe(
          (res) => {
            console.log(res);
            this.ngOnInit();
            this.swalService.showSuccessMessage('Unblocked!', 'The user has been unblocked.');
          },
          (err) => {
            console.log(err);
            this.swalService.showErrorMessage('Error', 'An error occurred.');
          }
        );
      }
    });
  }


   Requests():void{
    console.log("hellsds");
    
    this.router.navigate(['/admin/new-counselor'])
   }
  
}
