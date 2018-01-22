import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';

import { Jewel } from '../models/jewel'; 
import { Order } from '../models/order';

@Component({
  moduleId: module.id,
  selector: 'shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
  })

  export class ShoppingCartComponent {
    order: Order = new Order();
    sizesSelectedError: boolean = false;
    /**
     * constructor(), is used to get the current order
     *
     * @param cartService, used to checkOut an item when we are finished
     * @param router, used to navigate to home page when cart is successfully checked out
     */
    constructor(private cartService: CartService, private router: Router)
    {
      var aOrder = JSON.parse(localStorage.getItem('currentOrder'));
      this.order.convertJSON(aOrder);
    }

    /**
     * removeItem(i: number), this function is used to remove an item from the jewel
     *
     * @param i, the jewel to removes index
     */
    removeItem(i: number)
    {
      
      this.cartService.removeItem(this.order.jewelry[i]);
      location.reload();
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
      }
    }
  }
