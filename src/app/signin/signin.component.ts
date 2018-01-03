import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

// Import the DataService
import { DataService } from '../data.service';
import { HomeComponent } from '../home/home.component';
import { User } from '../models/user';

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SignInComponent {
  signedIn = new User();
  users: Array<any>;
  home: HomeComponent; 

  constructor(private _dataService: DataService, private router: Router){
    this._dataService.getUsers().subscribe(res => this.users = res);
  }
  
  signIn()
  {
    
    var i;
    for(i = 0; i < this.users.length; i++)
    {
      if(this.users[i].email == this.signedIn.email && this.users[i].password == this.signedIn.password)
      {
        let navigationExtras: NavigationExtras = {
          queryParams: {
            "firstName": this.users[i].firstName
          }
        };
        console.log("it worked");
        this.router.navigate([''], navigationExtras);
      }
    }
  }
}
