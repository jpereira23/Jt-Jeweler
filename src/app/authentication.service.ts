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
  return this._http.post('/api/authenticate', { email: email, password: password })
    .map((response: Response) => {
      let user = response.json();
      if(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      }

      return user;
    }); 
  }
  
  logout()
  {
    localStorage.removeItem('currentUser');
  } 
}
