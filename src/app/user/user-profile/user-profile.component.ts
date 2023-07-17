import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user.service.service';
import { FormsModule } from '@angular/forms';
import { Emitter } from '../emitters/emitter';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private http:HttpClient,private userService:UserServiceService, private router :Router ){}
  previewImageUrl: string = 'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg';
  users:any
  user = {
    name: '',
    email: '',
    oldPassword: '',
    newPassword: '',
    file: '',
    Image:''
  };

  ngOnInit(): void {
    this.userService.getUser().subscribe((res)=>{  Emitter.authEmitter.emit(true), this.user = res});

  }

  handleImageUpload(event: any): void {
    const file = event.target.files[0];
    this.user.file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.user.Image = reader.result as string;
    };

    if (file) {
      reader.readAsDataURL(file);
      this.user.Image = file;
    }
  }

  saveProfile(): void {
     const formData = new FormData();
    formData.append('name', this.user.name);
    formData.append('email', this.user.email);
    formData.append('oldPassword', this.user.oldPassword);
    formData.append('newPassword', this.user.newPassword);
    formData.append('image',this.user.file);





    this.userService.editProfile(formData).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'User profile updated successfully',
        }).then(() => {
          this.router.navigate(['/']);
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
