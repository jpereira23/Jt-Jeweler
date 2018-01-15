import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { DataService } from './data.service';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Router } from '@angular/router';
@Injectable()
export class WishListService {
  constructor(private dataService: DataService, private authenticationService: AuthenticationService, private router: Router)
  {
  }

  addWish(jewel)
  {
    var user = JSON.parse(localStorage.getItem('currentUser'));
    if(user != null)
    {
      if(user.wishList == null)
      {
        user.wishList = [];
      }
      user.wishList.push(jewel);

      localStorage.removeItem('currentUser');
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.dataService.updateUser(user).subscribe();
      return true;
    }  
    else
    {
      this.router.navigate(['signin']);  
      return false;
    } 
  }

  isItemInWishList(jewel)
  {
    var user = JSON.parse(localStorage.getItem('currentUser'));

    if(user != null && user.wishList != null && user.wishList.length > 0)
    {
      for(var i = 0; i < user.wishList.length; i++)
      {
        if(user.wishList[i].jewelName == jewel.jewelName)
        {
          return true;
        }
      }
    }
    return false;
  }

  removeWish(jewel)
  {
    var user = JSON.parse(localStorage.getItem('currentUser'));
    if(user != null && user.wishList != null && user.wishList.length > 0)
    {
      for(var i = 0; i < user.wishList.length; i++)
      {
        if(user.wishList[i].jewelName == jewel.jewelName)
        {
          user.wishList.splice(i, 1);
        }
      }
      localStorage.removeItem('currentUser');
      localStorage.setItem('currentUser', JSON.stringify(user)); 
      this.dataService.updateUser(user); 
    } 
  }
}
