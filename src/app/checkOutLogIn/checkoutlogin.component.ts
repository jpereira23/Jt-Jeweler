import { ViewEncapsulation, Component, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CartService } from '../cart.service'; 
import { LayoutService } from '../layout.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { DataService } from '../data.service';
import { User } from '../models/user';

@Component({
  selector: 'checkoutlogin',
  templateUrl: './checkoutlogin.component.html',
  styleUrls: ['./checkoutlogin.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class CheckOutLoginComponent {
  users: Array<any>;
  signedIn: User = new User();
  isError: boolean = false;
  isMessage: string = "";
  constructor(public dialogRef: MatDialogRef<CheckOutLoginComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private cartService: CartService, private layoutService: LayoutService, private router: Router, private authenticationService: AuthenticationService, private dataService: DataService)
  {
    this.dataService.getUsers().subscribe(res => this.delegateForUsers(res)); 
  }

  delegateForUsers(users)
  {
    this.users = users; 
  }
  continueAsGuest(){
    this.cartService.checkOut(this.data.order);
    this.router.navigate(['/']);
    this.layoutService.checkOutCart(0);
  }   

  loggingIn(){
    var isEmail: boolean = false;
    for(var i = 0; i < this.users.length; i++)
    {
      if(this.users[i].email.toLowerCase() == this.signedIn.email.toLowerCase())
      {
        isEmail = true;
      }
    }

    if(isEmail == true)
    {
      this.authenticationService.login(this.signedIn.email.toLowerCase(), this.signedIn.password)
        .subscribe(
          data => {
          this.isError = false;
          this.isMessage = "";
          
          this.cartService.checkOut(this.data.order);
          
          this.router.navigate(['']);

          this.dialogRef.close();
          this.layoutService.updateValue(true); 
        },
        error => {
          this.isError = true;
          this.isMessage = "Password is incorrect.";
        });
  }
}

