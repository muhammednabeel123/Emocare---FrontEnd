import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-counselor',
  templateUrl: './new-counselor.component.html',
  styleUrls: ['./new-counselor.component.css']
})
export class NewCounselorComponent implements OnInit {

  counselor$:any

  
  constructor(   private adminService: AdminService,
    private http: HttpClient,
    private router: Router){}

    ngOnInit(): void {
      this.getCounselor()
      
    }
    getCounselor():void{this.adminService.getNewCounselor().subscribe((res)=>{this.counselor$ = res})}
    
    viewCounselor(id: any): void {this.router.navigate(['admin/view-counselor',id]);}

}
