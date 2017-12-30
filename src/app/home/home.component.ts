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
  // Create an instance of the DataService through dependency injection
  constructor(private _dataService: DataService, private route: ActivatedRoute) {
    // Access the Data Service's getUsers() method we defined
    this._dataService.getUsers()
        .subscribe(res => this.users = res);
    if(this.route.params)
    {
      this.route.params.subscribe((params: Params) => {
        let firstName = params['firstName'];
        console.log(firstName);
      });
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
