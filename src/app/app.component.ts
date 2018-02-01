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
  authority: boolean = false;
  constructor(private authenticationService: AuthenticationService){
    this.signedInUser = JSON.parse(localStorage.getItem('currentUser')); 
    //console.log(this.signedInUser.email);
  }

  componentAdded(component)
  {
    console.log("Components cart number " + component.cartNumber);
    this.cartNumber = component.cartNumber;
  } 

  public isItAuthority(isIt){
    this.authority = isIt;
  }

}
