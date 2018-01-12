import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

// Import the DataService
import { DataService } from '../data.service';
import { HomeComponent } from '../home/home.component';
import { User } from '../models/user';
import { AuthenticationService } from '../authentication.service'; 

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SignInComponent {
  signedIn = new User();
  users: Array<any>;
  home: HomeComponent; 

  constructor(private _dataService: DataService, private router: Router, private authenticationService: AuthenticationService){
    console.log("hmmm....");
    this._dataService.getUsers().subscribe(res => this.users = res);
  }

  ngOnInit()
  {
    this.authenticationService.logout();
  } 

  signIn()
  {
    this.authenticationService.login(this.signedIn.email.toLowerCase(), this.signedIn.password)
    .subscribe(
      data => { 
        if(this.signedIn.email.toLowerCase() == 'admin@gmail.com')
        {
          this.router.navigate(['admin']);
        }
        else
        {  
          console.log("Fuck"); 
          this.router.navigate(['']);
        }
      },
      error => {
      
    });  
  }
}
