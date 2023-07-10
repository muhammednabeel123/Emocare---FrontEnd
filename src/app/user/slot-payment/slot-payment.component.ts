import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user.service.service';
import { Emitter } from '../emitters/emitter';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-slot-payment',
  templateUrl: './slot-payment.component.html',
  styleUrls: ['./slot-payment.component.css']
})
export class SlotPaymentComponent implements OnInit {
  constructor(private userService:UserServiceService,private activatedRoute: ActivatedRoute,private http: HttpClient ,private router :Router){}
  message:any
  servicer:any
  time:any
  index:any
  userid:any
  paymentHandler: any = null;
  stripeAPIKey: any = environment.stripeAPIKey ;
  stripeToken:any
  optionalParam:String|null
  
  ngOnInit(): void { 
    
    this.activatedRoute.queryParamMap.subscribe(queryParamMap => {
      this.optionalParam = queryParamMap.get('optionalParam');
     console.log(  this.optionalParam,"anything"); 
    })  
    const id = this.activatedRoute.snapshot.paramMap.get('id');
     this.index = this.activatedRoute.snapshot.paramMap.get('index');
      this.activatedRoute.queryParamMap.subscribe(params => {
      const times = params.get('times');
      if (times !== null) {
         this.time = JSON.parse(atob(times));
  
        }});

     this.invokeStripe();
    this.User()
    this.services(id)
    
}
submit() {
  const paymentHandler = (<any>window).StripeCheckout.configure({
    key: this.stripeAPIKey,
    locale: 'auto',
    token: (stripeToken: any) => {
      console.log(stripeToken);
      this.paymentStripe(stripeToken);
      this.sendCheckoutRequest();
    },
  });

  const url = window.location.href;
  const hasOptionalParam = url.includes('optionalParam');

  if (!hasOptionalParam) {
    this.openStripePayment(paymentHandler);
  } else {
    const appointmentId = this.optionalParam;
    this.userService.checkout(this.index, this.servicer._id, this.userid, this.stripeToken, appointmentId)
    .subscribe(
      response => {
        console.log(response);
  
      
        Swal.fire('Success', 'The appointment has been successfully rescheduled.', 'success')
          .then(() => { 
         
            this.router.navigate(['/appointments']);
          });
      },
      error => {
        console.error("Error booking slot:", error);
      }
    );
  }









}

openStripePayment(paymentHandler: any) {
  paymentHandler.open({
    name: 'Emocare',
    description: 'Health care',
    amount:  this.servicer.fee*100,
  });
}

paymentStripe(stripeToken: any) {
  this.stripeToken = stripeToken;
}

sendCheckoutRequest() {
  
  const appoinmentId = this.optionalParam

  
  this.userService.checkout(this.index, this.servicer._id, this.userid, this.stripeToken,appoinmentId)
    .subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error("Error booking slot:", error);
      }
    );
}


  services(id: any) {
    this.userService.getServicer(id).subscribe((res: any) => {
      this.servicer = res

      
    });
  }
  User(){
    this.userService.getUser().subscribe((res:any)=>{
      this.userid = res._id
      console.log(res);
      
      Emitter.authEmitter.emit(true) 
    },(err)=>{
      this.message = 'you are no authenticated'
      Emitter.authEmitter.emit(false)
    })
  }


  //Stripe integration
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
  
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: this.stripeAPIKey,
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
            alert('Payment has been successfull!');
          },
        });
      };
  
      window.document.body.appendChild(script);
    }
  }

  makePayment(amount: any) {
   
  }
  
}

