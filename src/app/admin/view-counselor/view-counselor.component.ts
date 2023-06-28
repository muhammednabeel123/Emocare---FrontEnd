import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalService } from '../../swal.service';

@Component({
  selector: 'app-view-counselor',
  templateUrl: './view-counselor.component.html',
  styleUrls: ['./view-counselor.component.css']
})
export class ViewCounselorComponent implements OnInit {

  id: any;
  user$: any;
  imageUrls:any;

  constructor(private adminService: AdminService, private route: ActivatedRoute,private router:Router, private swalService: SwalService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.userView(this.id);
      
      
    });
  }

  userView(id: any): void {
    this.adminService.ViewCounselor(id).subscribe((res: any) => {
      console.log(res,"response");
      
    this.user$ = res;
    this.imageUrls = [this.user$.id_proof];});}


    Accept(id: any): void {
      this.swalService.confirmBlock().then((result) => {
        if (result.isConfirmed) {
          this.adminService.AcceptCounselor(id).subscribe(
            (res: any) => {
              this.router.navigate(['/admin/counselor']);
              this.swalService.showSuccessMessage('Accepted!', 'Your request has been accepted.');
            },
            (err: any) => {
              console.log(err);
              this.swalService.showErrorMessage('Error', err );
            }
          );
        }
      });
    }

    Decline(id: any): void {
      this.swalService.confirmBlock().then((result) => {
        if (result.isConfirmed) {
          this.adminService.DeclineCounselor(id).subscribe(
            (res: any) => {
              console.log(res, "this response of decline");
              this.swalService.showSuccessMessage('Declined!', 'Your counsellor been declined.');
            },
            (err: any) => {
              console.log(err);
              this.swalService.showErrorMessage('Error',err);
            }
          );
        }
      });
    }
    

      



}


