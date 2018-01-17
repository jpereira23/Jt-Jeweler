import { Component, Input} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

// Import the DataService
import { DataService } from '../data.service';
import { CartService } from '../cart.service';
import { User } from '../models/user';
import { AuthenticationService } from '../authentication.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  @Input('aWord') theWord: string;   
  // Define a users property to hold our user data
  users: Array<any>;
  signedIn = false  ;
  signedInUser: User;
  jewelry: Array<any>;
  filteredJewelry: Array<any>;
  filter: string = "any";
  // Create an instance of the DataService through dependency injection
  constructor(private _dataService: DataService, private route: ActivatedRoute, private authenticationService: AuthenticationService, private router: Router, private _cartService: CartService) {
  
    this.signedInUser = JSON.parse(localStorage.getItem('currentUser'));
    if(this.signedInUser != null)
    {
      this.signedIn = true;
      console.log('signed in user is ' + this.signedInUser.firstName);    
    }
    
    // Access the Data Service's getUsers() method we defined
    this._dataService.getUsers()
        .subscribe(res => this.users = res);

    this._dataService.getJewelry()
      .subscribe(res => this.jewelry = res);

    this.filteredJewelry = this.jewelry;
    this.filter = "any";
    
  } 

  viewProductPage(i)
  {
    var jewel = this.jewelry[i];
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "itemCode": jewel.itemCode,
        "signedIn": this.signedIn
      }
    };
    this.router.navigate(['productPage'], navigationExtras);  
  }  

  changeFilter(filter)
  {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "filter": filter
      }
    };
    
    this.router.navigate(['category'], navigationExtras);    
  } 

  addItem(i)
  {
    this.jewelry[i].quantity = 1;
    this._cartService.addItem(this.jewelry[i]);
    location.reload();
  }
}
