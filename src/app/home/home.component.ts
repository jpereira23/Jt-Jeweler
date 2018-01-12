import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

// Import the DataService
import { DataService } from '../data.service';
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
  
  // Define a users property to hold our user data
  users: Array<any>;
  signedIn = false  ;
  signedInUser: User;
  jewelry: Array<any>;
  filteredJewelry: Array<any>;
  filter: string = "any";
  // Create an instance of the DataService through dependency injection
  constructor(private _dataService: DataService, private route: ActivatedRoute, private authenticationService: AuthenticationService, private router: Router) {
  
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
        "itemCode": jewel.itemCode
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
}
