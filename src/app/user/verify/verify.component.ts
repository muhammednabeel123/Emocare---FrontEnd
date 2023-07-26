import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
  constructor(private http:HttpClient,private router:Router,private route:ActivatedRoute ){}
  token:any
  userId:any
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.token = params['token'];
      console.log(this.token,"token");
      
    });
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      console.log(this.userId,"this");
      
    });
  
  }

  submit(){
    this.verifyEmail()
   
    

 
    
  }
  verifyEmail(): void {
    const apiUrl = environment.user_api;
    this.http.get(`${apiUrl}/user/${this.userId}/verify/${this.token}`)
      .subscribe(
        (res) => {
          this.router.navigate(['/login']);
        },
        (err: any) => {
          console.log(err);
        }
      );
  }
  

}
