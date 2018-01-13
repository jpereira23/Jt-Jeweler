import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { DataService } from './data.service';
import { Http, Headers, Response } from '@angular/http';
import { User } from './models/user';
import 'rxjs/add/operator/map';
import { forkJoin } from 'rxjs/observable/forkJoin';
@Injectable()
export class CartService {
  order: any = null;
  constructor(private dataService: DataService, private authenticationService: AuthenticationService)
  {
    this.order = {
      isUser: false,
      jewelry: [],
      runningTotal: 0,
      user: "",
      orderNumber: 0
    }   
    var aOrder = JSON.parse(localStorage.getItem('currentOrder'));
    if(aOrder == null)
    {
      localStorage.setItem('currentOrder', JSON.stringify(this.order));     
    } 
    else
    {
      this.order = aOrder;
    }
  }
  
  getNumItems()
  {
    return this.order.jewelry.length; 
  }
  addItem(jewel)
  {
    this.order = JSON.parse(localStorage.getItem('currentOrder'));
    this.order.runningTotal += (jewel.price * jewel.quantity);
    this.order.jewelry.push(jewel);
    localStorage.removeItem('currentOrder');
    localStorage.setItem('currentOrder', JSON.stringify(this.order));
  }

  removeItem(jewel)
  {
    this.order = JSON.parse(localStorage.getItem('currentOrder'));
    for(var i = 0; i < this.order.jewelry.length; i++)
    {
      if(this.order.jewelry[i].itemCode == jewel.itemCode)
      {
        this.order.runningTotal -= jewel.price;
        this.order.jewelry.splice(i, 1);
      }
    }
    localStorage.removeItem('currentOrder');
    localStorage.setItem('currentOrder', JSON.stringify(this.order));
  }
  
  checkOut()
  {
    this.dataService.getOrderNumber().subscribe(res => this.checkOutDelegate(res));
  }

  checkOutDelegate(orderNumber)
  {
    orderNumber[0].orderNum += 1;
    this.order.orderNumber = orderNumber[0].orderNum;
    if(this.authenticationService.loggedIn() == true)
    {
      this.order.isUser = true;
      var user:User = JSON.parse(localStorage.getItem('currentUser'));
      this.order.user = user._id;
      if(user.orders == null)
      {
        user.orders = []; 
      }
      console.log(user.orders.length);
      console.log(this.order.orderNumber); 
      user.orders.push(this.order.orderNumber);
      console.log(user.orders[0]);
      localStorage.removeItem('currentUser');
      localStorage.setItem('currentUser', JSON.stringify(user));
      forkJoin([this.dataService.updateOrderNumber(orderNumber[0]),this.dataService.updateUser(user), this.dataService.addOrder(this.order)]).subscribe();
    }
    else
    {
      console.log("fuck off");
      this.dataService.addOrder(this.order);
    }
    localStorage.removeItem('currentOrder'); 

  }

}
