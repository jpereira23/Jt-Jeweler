import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

// Import the DataService
import { DataService } from '../data.service';
import { User } from '../models/user';

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  
  // Define a users property to hold our user data
  users: Array<any>;
  signedIn = false;
  firstName: string;
  signedInUser: User;
  // Create an instance of the DataService through dependency injection
  constructor(private _dataService: DataService, private route: ActivatedRoute) {
    if(this.route.params)
    {
    this.route.queryParams.subscribe(params => {
        this.firstName = params["firstName"];
      });
    }
    // Access the Data Service's getUsers() method we defined
    this._dataService.getUsers()
        .subscribe(res => this.delegateForUsers(res));
    
  } 

  delegateForUsers(users)
  {
    this.users = users;

    var i;
    for(i = 0; i < this.users.length; i++)
    {
      if(this.firstName != null && this.users[i].firstName == this.firstName)
      {
        this.signedIn = true;
        this.signedInUser = this.users[i];

      }
    } 
  }
  onUpdate(){
    console.log("updating");
    this._dataService.updateUser().subscribe();
  }

  onDelete(){
    console.log("deleting");
    this._dataService.deleteUser().subscribe();
  }
  
  
}
