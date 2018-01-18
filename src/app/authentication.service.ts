import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService { 
constructor(private _http: Http) { 
  console.log("before hmmm...");
}

  login(email: string, password: string) 
  {
    return this._http.post('http://192.168.1.69:3000/api/authenticate', { email: email, password: password })
      .map((response: Response) => {
        let user = response.json();
        if(user) {
          console.log("first name is " + user.firstName); 
          localStorage.removeItem('currentOrder'); 
          if(user.currentOrder != null)
          {
            
            localStorage.setItem('currentOrder', JSON.stringify(user.currentOrder));
          }
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
    }); 
  }
  
  logout()
  {
    localStorage.removeItem('currentUser');
  } 

  loggedIn()
  {
    var aUsr = JSON.parse(localStorage.getItem('currentUser'));
    if(aUsr == null)
    {
      return false;
    }    
    else
    {
      return true;
    }   
  }
}
