import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { AppComponent } from '../app.component';
@Component({
  moduleId: module.id,
  selector: 'layout-admin',
  templateUrl: './adminHeader.component.html',
  styleUrls: ['./adminHeader.component.css'],
  })

export class AdminHeaderComponent {
  
  constructor(private authenticationService: AuthenticationService)
  {
      
  }
  signOut()
  {
    this.authenticationService.logout();
    location.reload();
  } 
}
