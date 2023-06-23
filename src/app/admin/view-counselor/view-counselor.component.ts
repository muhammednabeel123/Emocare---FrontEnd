import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-counselor',
  templateUrl: './view-counselor.component.html',
  styleUrls: ['./view-counselor.component.css']
})
export class ViewCounselorComponent implements OnInit {

  id:any;
  user$:any

  constructor(private adminService: AdminService,private route: ActivatedRoute){}
  ngOnInit(): void {  this.route.paramMap.subscribe(params => {
    this.id = params.get('id');
    this.userView(this.id)
  }); }

  userView(id:any):void{ this.adminService.ViewCounselor(id).subscribe((res:void)=>{ this.user$ = res } ) }
    
  

}
