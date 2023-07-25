import Swal from 'sweetalert2';
import { CounselorService } from './../counselor.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id:string
  message:string
  token:string|null

  counselor: any = {
    name: '',
    currentPassword: '',
    newPassword: '',
    address: [''],
    pincode: '',
    service: { name: '' },
    state: '',
    experience: '',
    fee: '',
    Image: '',
    file: '',
  };

  constructor(private counselorService : CounselorService, private router:Router  ){}

  ngOnInit(): void {
 
    const token = localStorage.getItem('CToken');
    this.token = localStorage.getItem('CToken');
    if (token) {
      this.counselorService.getCounselor(token).subscribe(
        (res: any) => {
          this.id= res._id
          this.counselor = res
       
        },
        (err) => {
          this.message = 'You are not authenticated';
        }
      );

    
    } else { 


  console.log('Token not found in localStorage');
}
   
  }

 
  handleImageUpload(event: any): void {
    const file = event.target.files[0];
    this.counselor.file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.counselor.Image = reader.result as string;
    };

    if (file) {
      reader.readAsDataURL(file);
      this.counselor.Image = file;
    }
  }

  saveProfile(): void {
    const formData = new FormData();
    formData.append('name', this.counselor.name);
    formData.append('currentPassword', this.counselor.currentPassword);
    formData.append('newPassword', this.counselor.newPassword);
    formData.append('address', this.counselor.address[0]);
    formData.append('pincode', this.counselor.pincode);
    formData.append('service', this.counselor.service.name);
    formData.append('state', this.counselor.state);
    formData.append('experience', this.counselor.experience);
    formData.append('fee', this.counselor.fee);
    formData.append('email', this.counselor.email);
    formData.append('image',this.counselor.file);
    
    this.counselorService.editProfile(formData,this.token).subscribe(
      (response) =>{
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'User profile updated successfully',
        }).then(() => {
          this.router.navigate(['/counselor/home']);
        });;
      },
      (error) => {
        const errorMessage = error.error?.error || 'Incorrect Password';
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage,
        });
      }
    );
  }
}
  


