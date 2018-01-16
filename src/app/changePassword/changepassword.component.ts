import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router'; 
@Component({
  moduleId: module.id,
  selector: 'changePassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})

export class ChangePasswordComponent {
  newPassword: string = "";
  originalPassword: string = "";
  verifyPassword: string = ""; 
  user: any = null;
  errorMessage: string = "";
  isError: boolean = false;

  constructor(private dataService: DataService, private router: Router)
  {
    this.user = JSON.parse(localStorage.getItem('currentUser'));            
  }

  onSubmit()
  {
    if(this.user.password == this.originalPassword && this.newPassword == this.verifyPassword)
    {
      this.isError = false;
      this.errorMessage = ""; 
      var updateUser = {
        _id: this.user._id,
        firstName: this.user.firstName, 
        lastName: this.user.lastName,
        password: this.newPassword,
        email: this.user.email, 
        streetAddress: this.user.streetAddress,
        city: this.user.city, 
        state: this.user.state, 
        wishList: this.user.wishList, 
        orders: this.user.orders,
        token: this.user.token
      }
      localStorage.removeItem('currentUser');
      localStorage.setItem('currentUser', JSON.stringify(updateUser)); 
      this.dataService.updateUser(updateUser).subscribe(); 
      this.router.navigate(['manageAccount']); 
    }
    else if(this.user.password != this.originalPassword)
    {
      this.isError = true;
      this.errorMessage = "The password you entered is not your original password.";
    }
    else if(this.verifyPassword != this.newPassword)
    {
      this.isError = true;
      this.errorMessage = "The passwords do not match."; 
    } 
  }
}
