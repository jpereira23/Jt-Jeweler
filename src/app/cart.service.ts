import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { DataService } from './data.service';
import { Http, Headers, Response } from '@angular/http';
import { User } from './models/user';
import 'rxjs/add/operator/map';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Order } from './models/order'; 
import { UserJewel } from './models/userjewel'; 

@Injectable()
export class CartService {
  order = new Order();

  /** 
   * constructor(), this is used to check if there is an order log created if not than we initialize one
   */
  constructor(private dataService: DataService, private authenticationService: AuthenticationService)
  {
    var aOrder = JSON.parse(localStorage.getItem('currentOrder'));
    if(aOrder == null)
    {
      localStorage.setItem('currentOrder', JSON.stringify(this.order));     
    } 
    else
    {
      this.order = new Order();
      this.order.convertJSON(aOrder);
    }
  }
  
  /** 
   * getNumItems(), used to return the number of orders in the current log
   */
  public getNumItems()
  {
    return this.order.jewelry.length; 
  }
  
  /** 
   * addItem(jewel: UserJewel), is used to add a jewel to the order log
   *
   * @param, is a jewel that has a selected item in it
   */
  public addItem(jewel: UserJewel)
  {
    var aOrder = JSON.parse(localStorage.getItem('currentOrder'));
    this.order = new Order();
    this.order.convertJSON(aOrder);
    this.order.runningTotal += (jewel.jewel.price * jewel.jewel.quantity);
    this.order.jewelry.push(jewel);
    localStorage.removeItem('currentOrder');
    localStorage.setItem('currentOrder', JSON.stringify(this.order));
  }

  /** 
   * removeItem(jewel: UserJewel), this function is used to remove an item whenever the remove button is clicked in the shopping cart
   *
   * @param jewel, this is a UserJewel that we use to check to see if its there and remove it
   */
  removeItem(jewel: UserJewel)
  {
    var aOrder = JSON.parse(localStorage.getItem('currentOrder'));
    this.order = new Order();
    this.order.convertJSON(aOrder); 
    for(var i = 0; i < this.order.jewelry.length; i++)
    {
      console.log("ths.order.jewel.itemCode = " + this.order.jewelry[i].jewel.itemCode);
      console.log("jewel.jewel.itemCode = " + jewel.jewel.itemCode);
      if(this.order.jewelry[i].jewel.itemCode === jewel.jewel.itemCode)
      {
        if(this.order.runningTotal > 0)
        {
          this.order.runningTotal -= jewel.jewel.price;
        }
        else
        {
          this.order.runningTotal = 0;
        }
        
        this.order.jewelry.splice(i, 1);

    console.log("a length" + this.order.jewelry.length); 
      }
    }
    console.log(this.order.jewelry.length); 
    localStorage.removeItem('currentOrder');
    localStorage.setItem('currentOrder', JSON.stringify(this.order));
  }
  

  /** 
   *  checkOut(), function that will retrieve the order number and inititate the delegate
   */
  checkOut(order: Order)
  {
    this.order = order;
    this.dataService.getOrderNumber().subscribe(res => this.checkOutDelegate(res));
  }
  
  /**
   * checkOutDelegate(orderNumber: number), this is a delegate that gets the order number, increments it and add an order to the user(updates it), updates the ordernumber
   * and adds an order to the global orders
   *
   * @param orderNumber, the order number we retrieve from the database
   */
  checkOutDelegate(orderNumber: number)
  {

    var thearguments: Array<any> = [];
    orderNumber[0].orderNum += 1;
    this.order.orderNumber = orderNumber[0].orderNum;
    if(this.authenticationService.loggedIn() == true)
    {
      this.order.isUser = true;
      var user:User = JSON.parse(localStorage.getItem('currentUser'));
      if(user.orders == null)
      {
        user.orders = []; 
      }
      user.orders.push(this.order.orderNumber);
      user.currentOrder = null;
      localStorage.removeItem('currentUser');
      localStorage.setItem('currentUser', JSON.stringify(user));
      thearguments.push(this.dataService.updateOrderNumber(orderNumber[0]));
      thearguments.push(this.dataService.updateUser(user));
      thearguments.push(this.dataService.addOrder(this.order));
    }
    else
    {
      thearguments.push(this.dataService.addOrder(this.order)); 
    }

    for(var i = 0; i < this.order.jewelry.length; i++)
    {
    var aJewel = this.order.jewelry[i];
      for(var j = 0; j < aJewel.jewel.sizes.length; j++)
      {
        var aSelectedSize = aJewel.selectedSize;
        var aSize = aJewel.jewel.sizes[j].size;
        console.log("selected size is " + aSelectedSize);
        if(aSelectedSize == aSize)
        {
          aJewel.jewel.sizes[j].quantity -= 1;
          console.log("Making it here");
          thearguments.push(this.dataService.editJewel(aJewel.jewel));
        }
      }  
    }

    forkJoin(thearguments).subscribe();
    localStorage.removeItem('currentOrder'); 

  }

}
