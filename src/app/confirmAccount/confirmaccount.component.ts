import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../data.service';
import { forkJoin } from 'rxjs/observable/forkJoin'; 

@Component({
  moduleId: module.id,
  selector: 'confirmAccount',
  templateUrl: './confirmaccount.component.html',
  styleUrls: ['./confirmaccount.component.css']
  })

  export class ConfirmAccountComponent {
    token: string = "";
    users: Array<any> = [];
    user: any = null;
    constructor(private route: ActivatedRoute, private _dataService: DataService)
    {
      this.route.queryParams.subscribe(params => {
        this.token = params["id"];
      });

      this._dataService.getTempUsers()
        .subscribe(res => this.getTempUserDelegate(res));
      
    }

    public getTempUserDelegate(users)
    {
      console.log(users.length);
      this.users = users;
      for(var i = 0; i < users.length; i++)
      {
        if(users[i].token == this.token)
        {
          this.user = users[i];
        }
      }
      localStorage.setItem('currentUser', JSON.stringify(this.user)); 
      forkJoin([this._dataService.addUser(this.user), this._dataService.deleteTempUser(this.user)]).subscribe();
      
    }
    
  }
