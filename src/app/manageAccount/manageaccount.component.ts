import { Component } from '@angular/core';

// Import the DataService
import { DataService } from '../data.service';
import { WishListService } from '../wishlist.service';
import { AuthenticationService } from '../authentication.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { User } from '../models/user';
import { UserJewel } from '../models/userjewel';
import { Order } from '../models/order'; 
import { Jewel } from '../models/jewel';
import { CartService } from '../cart.service';

@Component({
  selector: 'manageAccount',
  templateUrl: './manageaccount.component.html',
  styleUrls: ['./manageaccount.component.css']
})

export class ManageAccountComponent {
  signedInUser: User;
  updated: boolean = false;
  personalInformation = true;
  orderHistory = false;
  wishList = false;
  previewedOrderNumber: number = 0;
  previewedOrder: Order = new Order();
  orders: Array<Order> = []; 

  /**
   * contructor(), this function is used to intialize _dataService, _authenticationService, router, route, wishListSerivce and _cartService to its null values. We also use it to get the signedInUser
   * and all the orders for the current user
   * 
   * @param _dataService, is a DataService to get the orders 
   * @param _authenticationService is an AuthenticationService that is used to log out the user when we change the password
   * @param router, is used to go to different routes 
   * @param route, is used to retrieve a route coming our way with information
   * @param wishListService, is used to remove items from the wish list
   * @param _cartService, is used to communicate with adding things to the cart when on the wishlist
   */  
  constructor(private _dataService: DataService, private _authenticationService: AuthenticationService, private router: Router, private route: ActivatedRoute, private wishListService: WishListService, private _cartService: CartService)
  {
      this.signedInUser = JSON.parse(localStorage.getItem('currentUser'));
      if(this.route.queryParams != null)
      {
        this.route.queryParams.subscribe(params => {
          var aParam = params["wishList"];
          if(aParam != null)
          {
            this.wishList = true;
            this.orderHistory = false;
            this.personalInformation = false;
          }
        });
      }
      if(this.signedInUser.orders.length > 0)
      {
        this.previewedOrderNumber = this.signedInUser.orders[0];
        this._dataService.getOrders()
          .subscribe(res => this.delegateToGetOrders(res)); 
      }
  }

  /** 
   * delegateToGetOrders(orders: Array<Order>), is the delegate used to properly give the orders to the proper user
   * 
   * @param orders, is an array of orders
   */
  public delegateToGetOrders(orders: Array<Order>)
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

  /** 
   * onSubmit(), is used for the form when we want to edit a user
   */
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

  /**
   * personalInformationFunc(), is used to set all the proper booleans when we want to see Personal Information tab
   */
  personalInformationFunc()
  {
    this.personalInformation = true;
    this.orderHistory = false;
    this.wishList = false;
  }

  /**
   * orderHistoryFunc(), is used to set all the proper booleans when we want to see Order History tab
   */
  orderHistoryFunc()
  {
    this.personalInformation = false;
    this.orderHistory = true;
    this.wishList = false;
  }

  /**
   * wishListFunc(), is used to set all the proper booleans when we want to see Wish List tab
   */
  wishListFunc()
  {
    this.personalInformation = false;
    this.orderHistory = false;
    this.wishList = true;
  }

  /** 
   * selectPreviewedOrder(index: number), is used to determine which order was selected from the side pane of the orders list
   * 
   * @param index, a number for which order we are talking about
   */
  public selectPreviewedOrder(index: number)
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

  /** 
   * changePassword(), this function is used to help us route to the change password page
   */
  public changePassword()
  {
    this.router.navigate(['changePassword']); 
  }

  /** 
   * removeItem(i:number), this function is used to help us communicate with wishlist remove item function
   * 
   * @param i, gets us the index of the item to remove
   */
  public removeItem(i: number)
  {
    this.wishListService.removeWish(this.signedInUser.wishList[i]);
    this.signedInUser = JSON.parse(localStorage.getItem('currentUser'));
  }
    
  /** 
   * addToCart(i: number), helps us add an item to the cart using the CartService
   *
   * @param i, the index of the item we want to add to cart
   */
  public addToCart(i: number)
  {
    var aJewel = new Jewel();
    aJewel.convertJSON(this.signedInUser.wishList[i]);
    aJewel.quantity = 1;
    var userJewel: UserJewel = aJewel.convertUserJewel();
    this._cartService.addItem(userJewel);
    /**       URGENT WE NEED TO CHANGE THIS         **/

    location.reload();


  }
}
