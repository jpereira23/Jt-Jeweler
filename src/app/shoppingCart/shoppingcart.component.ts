import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';

import { Jewel } from '../models/jewel'; 
import { Order } from '../models/order';
import { LayoutService } from '../layout.service'; 

@Component({
  moduleId: module.id,
  selector: 'shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
  })

  export class ShoppingCartComponent {
    order: Order = new Order();
    cartNumber: number = 0;
 
    runningTotal: number = 0;
    sizesSelectedError: boolean = false;
    /**
     * constructor(), is used to get the current order
     *
     * @param cartService, used to checkOut an item when we are finished
     * @param router, used to navigate to home page when cart is successfully checked out
     */
    constructor(private cartService: CartService, private router: Router, private layoutService: LayoutService)
    {
      var aOrder = JSON.parse(localStorage.getItem('currentOrder'));
      if(aOrder != null)
      {
        this.order.convertJSON(aOrder);

      }

      this.cartNumber = this.order.jewelry.length;
      this.runningTotal = this.order.runningTotal; 
    }

    /**
     * removeItem(i: number), this function is used to remove an item from the jewel
     *
     * @param i, the jewel to removes index
     */
    removeItem(i: number)
    {
      
      this.cartService.removeItem(this.order.jewelry[i]);
      this.runningTotal -= this.order.jewelry[i].jewel.price; 
      this.order = JSON.parse(localStorage.getItem('currentOrder'));
      this.cartNumber = this.order.jewelry.length;
      this.layoutService.removeItem(0); 
    }
    
    /**
     * checkOut, this function prepares everything for the CartService checkOut function
     */
    checkOut()
    {
      this.sizesSelectedError = false;
      for(var i = 0; i < this.order.jewelry.length; i++)
      {
        if(this.order.jewelry[i].selectedSize == 0)
        {
          this.sizesSelectedError = true;
        }
      }
      if(this.sizesSelectedError == false)
      {
        this.cartService.checkOut(this.order); 
        this.router.navigate(['/']);  
        this.layoutService.checkOutCart(0); 
      }
    }
    /** 
     * changeQuantity(), keeps track of running when the quantity of the value is incremented
     */
    changeQuantity()
    {
      this.runningTotal = 0;
      for(var index = 0; index < this.order.jewelry.length; index++)
      {
        this.runningTotal += this.order.jewelry[index].jewel.price * this.order.jewelry[index].jewel.quantity;
      }
    }
  }
