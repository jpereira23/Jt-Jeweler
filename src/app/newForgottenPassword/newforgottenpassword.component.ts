import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  moduleId: module.id,
  selector: 'newForgottenPassword',
  templateUrl: './newforgottenpassword.component.html',
  styleUrls: ['./newforgottenpassword.component.css']
})

export class NewForgottenPasswordComponent {
  token: string = "";
  user: any = null;
  newPassword: string = "";
  confirmPassword: string = "";
  isError: boolean = false;
  errorMessage: string = "";
  constructor(private route: ActivatedRoute, private dataService: DataService, private router: Router)
  {
    this.route.queryParams.subscribe(params => {
      this.token = params["id"];
    });

    this.dataService.getUsers()
      .subscribe(res => this.getUsersDelegate(res)); 
  }  

  public getUsersDelegate(users)
  {
    for(var i = 0; i < users.length; i++)
    {
      if(users[i].token == this.token)
      {
        this.user = users[i]; 
      }
    } 
  }

  public onSubmit()
  {
      if(this.confirmPassword == this.newPassword)
      {
        this.isError = false;
        this.errorMessage = "";
        var aUser = {
          _id: this.user._id,
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          password: this.newPassword,
          email: this.user.email,
          streetAddress: this.user.streetAddress,
          city: this.user.city,
          state: this.user.state,
          wishList: this.user.wishList,
          orders: this.user.orders,
          token: this.user.token
        }

        this.dataService.updateUser(aUser).subscribe();
        this.router.navigate(['signin']);
      }
      else
      {
        this.isError = true;
        this.errorMessage = "Passwords do not match."; 
      }
  }
}
