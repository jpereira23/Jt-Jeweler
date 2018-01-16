import { Component } from '@angular/core';

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

  constructor()
  {
    
  }
}
