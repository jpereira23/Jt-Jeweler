import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

// Import the DataService
import { DataService } from '../data.service';
import { User } from '../models/user';
import { AuthenticationService } from '../authentication.service';

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

  // Create an instance of the DataService through dependency injection
  constructor(private _dataService: DataService, private route: ActivatedRoute, private authenticationService: AuthenticationService) {
  
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
    
  } 
  
}
