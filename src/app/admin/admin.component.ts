import { Component } from '@angular/core';

// Import the DataService
import { DataService } from '../data.service';

@Component({
  moduleId: module.id,
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent {
  
  // Define a users property to hold our user data
  users: Array<any>;

  // Create an instance of the DataService through dependency injection
  constructor(private _dataService: DataService) {
  console.log("Hello");
  // Access the Data Service's getUsers() method we defined
  this._dataService.getUsers()
        .subscribe(res => this.users = res);
  }

  onUpdate(){
    console.log("updating");
    //this._dataService.updateUser().subscribe();
  }

  onDelete(){
    console.log("deleting");
    this._dataService.deleteUser().subscribe();
  }
}
