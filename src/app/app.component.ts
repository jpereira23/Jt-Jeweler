import { Component, Input } from '@angular/core';
import { Order } from './models/order';
// Import the DataService
import { DataService } from './data.service';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  order = new Order(); 
  cartNumber: number = 0;
  signedInUser: any = null;
  constructor(private authenticationService: AuthenticationService){
    this.signedInUser = JSON.parse(localStorage.getItem('currentUser')); 
    this.order = JSON.parse(localStorage.getItem('currentOrder'));
    this.cartNumber = this.order.jewelry.length;
    //console.log(this.signedInUser.email);
  }

}
