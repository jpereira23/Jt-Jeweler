import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Router } from '@angular/router';

import { Jewel } from './models/jewel'; 
import { User } from './models/user';
import { DataService } from './data.service';
@Injectable()
export class WishListService {

  
  /**
   * constructor(), function is used to intitalize dataService and router to its null values
   *
   * @param dataService, references DataService to update the user
   * @param router, references Router which will allow us to sign into the signin page if we try to add a wish and we arent signed in
   */
  constructor(private dataService: DataService,  private router: Router)
  {
  }

  /** 
   * addWish(jewel: Jewel), this function is used to add Jewels to the wish list part of the signedin user 
   *
   * @param jewel, is the jewel we wish to add to the wish list
   */
  addWish(jewel: Jewel)
  {
    var user = new User()
    user.convertJSON(JSON.parse(localStorage.getItem('currentUser')));
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

  /** 
   * isItemInWishList(jewel: Jewel), the isItemInWishList function checks if an item is actually in the wish list and returns a boolean based on its validity
   * 
   * @param jewel, is a Jewel that we request to check if its in the wish list
   */
  isItemInWishList(jewel: Jewel)
  {
    var user = new User();
    user.convertJSON(JSON.parse(localStorage.getItem('currentUser')));

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


  /** 
   * removeWish(jewel: Jewel), is a function that is used to remove a jewel from the signed in users wish list
   *
   * @parma jewel, the Jewel we wish to remove from the users wish list
   */
  removeWish(jewel: Jewel)
  {
    var user = new User();
    user.convertJSON(JSON.parse(localStorage.getItem('currentUser')));
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
      this.dataService.updateUser(user).subscribe(); 
    } 
  }
}
