import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminService } from '../admin.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-add-services',
  templateUrl: './add-services.component.html',
  styleUrls: ['./add-services.component.css']
})
export class AddServicesComponent implements OnInit{
  form: FormGroup;
  
  credentials = {
    name: '',
    description:'',
    image:''

  }
  constructor(  private formBuilder : FormBuilder,private adminService: AdminService,private router:Router){}
  selectedImage: string | ArrayBuffer | null;

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.credentials.image = file
    if (file) {
      this.previewImage(file);
    }
  }

  previewImage(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedImage = reader.result;
    };
    reader.readAsDataURL(file);
  }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
     
    });
  }

  submit():void{
    const formData = new FormData();
    formData.append('name', this.credentials.name);
    formData.append('description', this.credentials.description);
    formData.append('image', this.credentials.image);  
    this.adminService.addService(formData).subscribe((res)=>{this.router.navigate(['/admin/services'])})
    
   }

}
 