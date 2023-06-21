import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';



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
    });
    this.route.params.subscribe(params => {
      this.userId = params['id'];
    });
    this.verifyEmail()
  }

  submit(){
    this.router.navigate(['/'])
    


    
  }
  verifyEmail(): void {
    this.http.get(`http://localhost:5000/user/${this.userId}/verify/${this.token}`)
      .subscribe(
        (res) => {
     console.log(res,"verify response");
     
        },
        (err:any) => {
          console.log(err);
          
        }
      );
  }
  

}