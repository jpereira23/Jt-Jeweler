import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

// Import the DataService
import { DataService } from '../data.service';
import { HomeComponent } from '../home/home.component';
import { User } from '../models/user';
import { AuthenticationService } from '../authentication.service'; 
import { LayoutService } from '../layout.service';

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SignInComponent {
  signedIn = new User;
  users: Array<any>;
  home: HomeComponent; 
  isError: boolean = false;
  isMessage: string = "";
  constructor(private _dataService: DataService, private router: Router, private authenticationService: AuthenticationService, private layoutService: LayoutService){
    console.log("hmmm....");
    this._dataService.getUsers().subscribe(res => this.delegateForUsers(res));
  }
  
  delegateForUsers(users)
  {
    this.users = users;
  }
  ngOnInit()
  {
    this.authenticationService.logout();
  } 

  signIn()
  {
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
          if(this.signedIn.email.toLowerCase() == 'admin@gmail.com')
          {
            this.router.navigate(['admin']);
          }
          else
          {  
            this.router.navigate(['']);
          }
          this.layoutService.updateValue(true); 
        },
        error => {
          this.isError = true; 
          this.isMessage = "Password is incorrect.";
      });  
    }
    else
    {
          this.isMessage = "Email is incorrect.";
          this.isError = true;
    }
  }
}
