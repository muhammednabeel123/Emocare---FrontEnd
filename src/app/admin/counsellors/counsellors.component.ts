import { HttpClient } from '@angular/common/http';
import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-counsellors',
  templateUrl: './counsellors.component.html',
  styleUrls: ['./counsellors.component.css']
})



export class CounsellorsComponent implements OnInit{

  constructor(   private adminService: AdminService,
    private http: HttpClient,
    private router: Router){}
    counselor$:any


  ngOnInit(): void {
    this.getCounselor()
  }

  getCounselor():void{
    this.adminService.getCounselor().subscribe((res)=>{this.counselor$ = res})}

  viewCounselor(id: any): void {this.router.navigate(['admin/view-counselor',id]);}

    

}
