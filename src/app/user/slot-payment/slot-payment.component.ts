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
  constructor(private userService:UserServiceService,private activatedRoute: ActivatedRoute,private http: HttpClient){}
  message:any
  servicer:any
  time:any
  index:any
  userid:any
  paymentHandler: any = null;
  stripeAPIKey: any = environment.stripeAPIKey ;
  stripeToken:any
  
  ngOnInit(): void {   
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

  this.openStripePayment(paymentHandler);
}

openStripePayment(paymentHandler: any) {
  paymentHandler.open({
    name: 'Emocare',
    description: 'Health care',
    amount: 100,
  });
}

paymentStripe(stripeToken: any) {
  this.stripeToken = stripeToken;
}

sendCheckoutRequest() {
  this.userService.checkout(this.index, this.servicer._id, this.userid, this.stripeToken)
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

