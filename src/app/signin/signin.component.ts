import { ViewEncapsulation, Component, Inject } from '@angular/core';

import { Router, NavigationExtras } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// Import the DataService
import { DataService } from '../data.service';
import { HomeComponent } from '../home/home.component';
import { User } from '../models/user';
import { AuthenticationService } from '../authentication.service'; 
import { LayoutService } from '../layout.service';

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class SignInComponent {
  signedIn = new User;
  users: Array<any>;
  home: HomeComponent; 
  isError: boolean = false;
  isMessage: string = "";
  constructor(private _dataService: DataService, private router: Router, private authenticationService: AuthenticationService, private layoutService: LayoutService, public dialogRef: MatDialogRef<SignInComponent>, @Inject(MAT_DIALOG_DATA) public data: any){
    this._dataService.getUsers().subscribe(res => this.delegateForUsers(res));
  }
  
  onNoClick(): void{
    this.dialogRef.close();
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
          
          this.dialogRef.close();
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
