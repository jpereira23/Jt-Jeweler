import { Component } from '@angular/core';

// Import the DataService
import { DataService } from '../data.service';
import { AuthenticationService } from '../authentication.service';
import { User } from '../models/user';
@Component({
  selector: 'app-root',
  templateUrl: './manageaccount.component.html',
  styleUrls: ['./manageaccount.component.css']
})

export class ManageAccountComponent {
  signedInUser: any;
  updated: boolean = false;

  constructor(private _dataService: DataService, private _authenticationService: AuthenticationService)
  {
      this.signedInUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  public onSubmit()
  {
    var editUser = {
      _id: this.signedInUser._id,
      firstName: this.signedInUser.firstName,
      lastName: this.signedInUser.lastName,
      password: this.signedInUser.password,
      email: this.signedInUser.email,
      streetAddress: this.signedInUser.streetAddress,
      city: this.signedInUser.city,
      state: this.signedInUser.state,
      wishList: this.signedInUser.wishList,
      orders: this.signedInUser.orders  
    }
  
    this._dataService.updateUser(editUser).subscribe();
    this._authenticationService.logout();
    this.updated = true;
    this._authenticationService.login(editUser.email, editUser.password);
  }
}
