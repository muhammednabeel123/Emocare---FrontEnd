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
  wallet:number|null
  selectedPaymentOption: string;
  remainingBalance:number|null
  hasOptionalParam:any
  hasOptionalParams: boolean = false;
  
  ngOnInit(): void { 
    
    this.activatedRoute.queryParamMap.subscribe(queryParamMap => {
      this.optionalParam = queryParamMap.get('optionalParam');
      this.hasOptionalParams = queryParamMap.has('optionalParam');
     
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
   this.hasOptionalParam = url.includes('optionalParam');

  if (!this.hasOptionalParam && this.selectedPaymentOption === 'stripe') {
    this.openStripePayment(paymentHandler);
  } else if (this.selectedPaymentOption === 'wallet') {
    this. remainingBalance = (this.wallet ?? 0) - this.servicer.fee;
    if (this.remainingBalance >= 0) {
      this.wallet = this.remainingBalance;       
      this.checkoutWithWallet();
      
    } else {
      Swal.fire('Error', 'Insufficient balance in wallet.', 'error');
    }
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

selectPaymentOption(option: string) {
  this.selectedPaymentOption = option;
}
;
openStripePayment(paymentHandler: any) {
  paymentHandler.open({
    name: 'Emocare',
    description: 'Health care',
    panelLabel: `Pay ${
      this.servicer.fee.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}`,
  });
}

paymentStripe(stripeToken: any) {
  this.stripeToken = stripeToken;
  
}

checkoutWithWallet() {
  const appointmentId = this.optionalParam;
   this.remainingBalance = (this.wallet ?? 0) 
  this.userService.checkout(this.index, this.servicer._id, this.userid,this.stripeToken,undefined, this.wallet)
    .subscribe(
      response => {
        console.log(response);

        Swal.fire('Success', 'The appointment has been successfully scheduled.', 'success')
          .then(() => {
            this.router.navigate(['/appointments']);
          });
      },
      error => {
        console.error("Error booking slot:", error);
      }
    );
}

sendCheckoutRequest() {
  
  const appoinmentId = this.optionalParam

  
  this.userService.checkout(this.index, this.servicer._id, this.userid, this.stripeToken,appoinmentId)
    .subscribe(
      response => {

        Swal.fire('Success', 'The appointment has been successfully scheduled.', 'success')
        .then(() => {
          this.router.navigate(['/appointments']);
        });
      },
      error => {
        console.error("Error booking slot:", error);
      }
    );
}


services(id: any) {
  this.userService.getServicer(id).subscribe(
    (res: any) => {
      this.servicer = res;
      console.log(this.servicer);
    },
    (error: any) => {
      if (error.status === 500) {

        this.router.navigate(['/500']);
      } else {
        console.log('Other error occurred:', error);
      }
    }
  );
}

  User(){
    this.userService.getUser().subscribe((res:any)=>{
      this.userid = res._id
      this.wallet = res.wallet
 
      
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

