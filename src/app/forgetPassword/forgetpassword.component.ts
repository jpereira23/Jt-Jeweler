import { Component } from '@angular/core';
import { DataService } from '../data.service';
@Component({
  moduleId: module.id,
  selector: 'forgetPassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls:  ['./forgetpassword.component.css']
  })

export class ForgetPasswordComponent {
  users: Array<any> = [];
  email: string = "";
  constructor(private dataService: DataService)
  {
    this.dataService.getUsers()
    .subscribe(res => this.delegateForUsers(res)); 
  }

  public delegateForUsers(users)
  {
    this.users = users;
  }

  public forgotPassword()
  {
    for(var i = 0; i < this.users.length; i++)
    {
      if(this.users[i].email == this.email)
      {
        this.dataService.forgotPassword(this.users[i]).subscribe();
      }
    }
  }
}
