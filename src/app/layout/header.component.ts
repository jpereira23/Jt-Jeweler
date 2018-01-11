import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  moduleId: module.id,
  selector: 'layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
  })

export class HeaderComponent {
  signedIn: boolean = false;
  signedInUser: any;
  constructor(private authenticationService: AuthenticationService)
  {
    this.signedInUser = JSON.parse(localStorage.getItem('currentUser')); 
    if(this.signedInUser != null)
    {
      console.log("hmm");
      this.signedIn = true;
    }
  }

  signOut()
  {
    this.authenticationService.logout();
    location.reload(); 
  }

}
