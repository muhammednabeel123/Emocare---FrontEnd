import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast } from '../../sweet alert/sweetalert'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
   
  services:any
  professions:''

  credentials = {
    name: '',
    email: '',
    password: '',
    state: '',
    primaryAddress: '',
    profession: '',
    country: '',
    pincode:'',
    experience: '',
    fee:'' ,
    idProof:'',
    certificate:''
  };



  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.http.get('http://localhost:5000/counselor/services').subscribe((res: any) => {
      this.services = Object.values(res).map((service: any) => service);

    });
    
    
    
    this.form = this.formBuilder.group({
     
    });
  }

  idProofPreview: string | null = null;
  certificatePreview: string | null = null;

  onIdProofChange(event: any) {
    const file = event.target.files[0];
    this.credentials.idProof = file;
    this.previewImage(file, 'idProofPreview');
  }

  onCertificateChange(event: any) {
    const file = event.target.files[0];
    this.credentials.certificate = file;
    this.previewImage(file, 'certificatePreview');
  }

  previewImage(file: File, previewProperty: keyof SignupComponent) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this[previewProperty] = e.target.result;
    };
    reader.readAsDataURL(file);
  }
  onServiceSelection() {
    console.log(this.credentials.profession);
  }

  validateAge(value:any) {
    const age = parseInt(value, 10);
    if (isNaN(age) || age < 21) {
      return { invalidAge: true };
    }
    return null;
  }


  submit(): void {

    Toast.fire({
      icon: 'info',
      title: 'Please wait...',
      text: 'Processing your request',
      showConfirmButton: false,
    })
    const formData = new FormData();
    formData.append('name', this.credentials.name);
    formData.append('email', this.credentials.email);
    formData.append('password', this.credentials.password);
    formData.append('state', this.credentials.state);
    formData.append('primaryAddress', this.credentials.primaryAddress);
    formData.append('profession', this.credentials.profession);
    formData.append('country', this.credentials.country);
    formData.append('pincode', this.credentials.pincode);
    formData.append('experience', this.credentials.experience);
    formData.append('age', this.credentials.fee);
    formData.append('idProof', this.credentials.idProof);
    formData.append('certificate', this.credentials.certificate);


    console.log(this.credentials,"this is form data");
    this.http.post('http://localhost:5000/counselor/signup', formData)
      .subscribe(
        (response) => {
          console.log('Success:', this.credentials);
          Toast.fire({
            icon: 'success',
            title: 'Request sent successfully!'
          });
        },
        (error) => {
          console.error('Failed to sent the request');
          Toast.fire({
            icon: 'error',
            title:'Failed to sent the request'
          });
        }
    );
    
  }

  


    // ...
    
    
    
}
