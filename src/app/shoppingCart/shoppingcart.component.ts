import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
@Component({
  moduleId: module.id,
  selector: 'shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
  })

  export class ShoppingCartComponent {
    jewelry: Array<any> = [];
    order: any = null;
    constructor(private cartService: CartService, private router: Router)
    {
      this.order = JSON.parse(localStorage.getItem('currentOrder'));
      this.jewelry = this.order.jewelry;
      console.log(this.jewelry.length);
    }

    removeItem(i)
    {
      this.cartService.removeItem(this.jewelry[i]);
      location.reload();
    }

    checkOut()
    {
      this.cartService.checkOut(); 
      this.router.navigate(['/']);  
    }
  }
