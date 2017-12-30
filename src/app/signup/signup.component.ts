import { Component } from '@angular/core';
import { User } from '../models/user';
// Import the DataService
import { DataService } from '../data.service';

@Component({
  moduleId: module.id,
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignUpComponent {
  newUser = new User();

  constructor(private _dataService: DataService) {
  }
  onSubmit()
  {
    console.log("here");
    console.log("the first name of this user is " + this.newUser.firstName); 
    var newUser = {
      firstName: this.newUser.firstName,
      lastName: this.newUser.lastName,
      password: this.newUser.password,
      email: this.newUser.email,
      streetAddress: this.newUser.streetAddress,
      city: this.newUser.city,
      state: this.newUser.state,
      wishList: this.newUser.wishList,
      orders: this.newUser.orders,
    } 
    console.log("first name is " + newUser.firstName);
    this._dataService.addUser(newUser).subscribe();
  }
}
