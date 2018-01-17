import { Component, Input } from '@angular/core';

// Import the DataService
import { DataService } from './data.service';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  signedInUser: any = null;
  aWord = "Introducing a New Line of Jewelry";
  constructor(private authenticationService: AuthenticationService){
    this.signedInUser = JSON.parse(localStorage.getItem('currentUser')); 
    //console.log(this.signedInUser.email);
  }

}
