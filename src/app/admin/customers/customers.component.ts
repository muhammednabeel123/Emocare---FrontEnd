import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  users:any

  constructor(private adminService :AdminService,private http:HttpClient ){}
  ngOnInit(): void {
    this.adminService.getUsers().subscribe((res:any) =>{
      this.users = res
      console.log(this.users,"this is data");
      
      })
    }

    blockUser(id:any) {

      this.adminService.blockUser(id).subscribe((res:any) =>{
        this.users = res
        
      })
    }




}
