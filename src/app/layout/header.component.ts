import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { CartService } from '../cart.service';
import { LayoutService } from '../layout.service';

import { Router } from '@angular/router';
@Component({
  moduleId: module.id,
  selector: 'layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
  })

export class HeaderComponent {
  signedIn: boolean = false;
  signedInUser: any;
  numOfItems: number = 0;
  constructor(private authenticationService: AuthenticationService, private cartService: CartService, private router: Router, private layoutService: LayoutService)
  {
    this.signedInUser = JSON.parse(localStorage.getItem('currentUser')); 
    this.numOfItems = this.cartService.getNumItems(); 
    if(this.signedInUser != null)
    {
      console.log("hmm");
      this.signedIn = true;
    }
  }

  ngOnInit(){
    this.layoutService.getData().subscribe(data => {
        this.signedIn = data;
        })
  }

  signOut()
  {
    this.authenticationService.logout();
    this.signedIn = false;
  }

  shoppingCart()
  {
    this.router.navigate(['shoppingCart']);  
  }
}
