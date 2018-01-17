import { Component } from '@angular/core';

// Import the DataService
import { DataService } from '../data.service';
import { AuthenticationService } from '../authentication.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
@Component({
  selector: 'manageAccount',
  templateUrl: './manageaccount.component.html',
  styleUrls: ['./manageaccount.component.css']
})

export class ManageAccountComponent {
  signedInUser: any;
  updated: boolean = false;
  personalInformation = true;
  orderHistory = false;
  wishList = false;
  previewedOrderNumber: number = null;
  previewedOrder: any = null;
  orders: Array<any> = []; 
  constructor(private _dataService: DataService, private _authenticationService: AuthenticationService, private router: Router)
  {
      this.signedInUser = JSON.parse(localStorage.getItem('currentUser'));

      if(this.signedInUser.orders.length > 0)
      {
        this.previewedOrderNumber = this.signedInUser.orders[0];
        console.log(this.previewedOrderNumber);
        this._dataService.getOrders()
          .subscribe(res => this.delegateToGetOrders(res)); 
      }
  }


  public delegateToGetOrders(orders)
  {
    this.orders = orders;

    for(var i = 0; i < this.orders.length; i++)
    {
      if(this.orders[i].orderNumber == this.previewedOrderNumber)
      {
        this.previewedOrder = this.orders[i];
      }
    }
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

  personalInformationFunc()
  {
    this.personalInformation = true;
    this.orderHistory = false;
    this.wishList = false;
  }

  orderHistoryFunc()
  {
    this.personalInformation = false;
    this.orderHistory = true;
    this.wishList = false;
  }

  wishListFunc()
  {
    this.personalInformation = false;
    this.orderHistory = false;
    this.wishList = true;
  }

  public selectPreviewedOrder(index)
  {
    this.previewedOrderNumber = this.signedInUser.orders[index];
    
    for(var i = 0; i < this.orders.length; i++)
    {
      if(this.orders[i].orderNumber == this.previewedOrderNumber)
      {
        this.previewedOrder = this.orders[i];
      }
    }
  }

  public changePassword()
  {
    this.router.navigate(['changePassword']); 
  }
  
}
