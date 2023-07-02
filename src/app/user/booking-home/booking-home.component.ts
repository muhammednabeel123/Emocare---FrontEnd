import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-booking-home',
  templateUrl: './booking-home.component.html',
  styleUrls: ['./booking-home.component.css']
})
export class BookingHomeComponent implements OnInit {
  counselor:any
  ngOnInit(): void {
  
   }
   isClicked: string | null = null;

   constructor(private http:HttpClient){}
   getServices(id: string) {
    this.http.get(`http://localhost:5000/services/${id}`)
        .subscribe(
            (response) => {
                this.counselor = response;
                this.isClicked = id === this.isClicked ? null : id; // Toggle the clicked state
                console.log(response, "this data");
            },
            (error) => {
           console.log(error);
           
            }
        );
}

BookId(id:any){
  console.log(id);
  
}




}
