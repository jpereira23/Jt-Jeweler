import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../data.service';
import { forkJoin } from 'rxjs/observable/forkJoin'; 
import { User } from '../models/user';
import { MatDialog } from '@angular/material';
import { SignInComponent } from '../signin/signin.component';

@Component({
  moduleId: module.id,
  selector: 'confirmAccount',
  templateUrl: './confirmaccount.component.html',
  styleUrls: ['./confirmaccount.component.css']
  })

  export class ConfirmAccountComponent {
    token: string = "";
    user = new User();
    
    /**
     * constructor(), used to intitialize route and _dataService to null values 
     *
     * @param route, is referencing the ActivatedRoute so we can get the id from the email
     * @parma _dataService, is referencing the DataService so we can get the temp users and remove the user and add a user
     */
    constructor(private route: ActivatedRoute, private _dataService: DataService, public dialog: MatDialog)
    {
      this.route.queryParams.subscribe(params => {
        this.token = params["id"];
      });

      this._dataService.getTempUsers()
        .subscribe(res => this.getTempUserDelegate(res));
      
    }

    openDialog(): void {
      let dialogRef = this.dialog.open(SignInComponent, {
        width: '400px',
        height: '484px',
        data: { }
      });
  }

    /** 
     * getTempUserDelegate(users: Array<User>), is used as the delegate to set the proper user from all the temp users
     *
     * @param users, an array of Users that we get from temp users database
     */
    public getTempUserDelegate(users: Array<User>)
    {
      for(var i = 0; i < users.length; i++)
      {
        console.log("users.length is " + users.length);
        console.log("users[i].firstName is " + users[i].firstName);
        console.log("users[i].lastName is " + users[i].lastName);
        console.log("users[i].token is " + users[i].token);
        console.log("this.token is " + this.token);
        if(users[i].token == this.token)
        {
          console.log("hello"); 
          this.user = users[i];
        }
      }
      forkJoin([this._dataService.addUser(this.user), this._dataService.deleteTempUser(this.user)]).subscribe();
      
    }
    
  }
