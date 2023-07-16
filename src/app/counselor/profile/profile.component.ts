import Swal from 'sweetalert2';
import { CounselorService } from './../counselor.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
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
    Image: ''
  };

  constructor(private counselorService : CounselorService){}

  ngOnInit(): void {
    console.log("hello anything");
    
    this.counselorService.getCounselor().subscribe(
      (res: any) => {
      this.counselor = res 
      },
      
    );
   
  }

 
  handleImageUpload(event: any): void {
    const file = event.target.files[0];
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
    formData.append('state', this.counselor.state);
    formData.append('experience', this.counselor.experience);
    formData.append('fee', this.counselor.fee);
    formData.append('Image', this.counselor.Image);


    this.counselorService.editProfile(formData).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'User profile updated successfully'
        });
        // Navigate to home component
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to update user profile'
        });
      }
    );
  }
}
  


