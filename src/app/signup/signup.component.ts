import { ViewEncapsulation, Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
// Import the DataService
import { DataService } from '../data.service';
import { AuthenticationService } from '../authentication.service';
import { User } from '../models/user';

@Component({
  moduleId: module.id,
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class SignUpComponent {
  newUser = new User();
  users: Array<User>;
  emailError:boolean = false;
  firstNameError:boolean = false; 
  lastNameError:boolean = false;
  passwordError:boolean = false;
  emailMessage: string;
  firstNameMessage: string;
  lastNameMessage: string;
  passwordMessage: string;


  /** 
   * constructor(), this function is used to intitialize the _dataService, authenticationService and router to its null values and also to get the users from the db
   *
   * @param _dataService, references a DataService that will get us the users and send in a new user
   * @param authenticationService, references a AuthenticationService to logout on intialization because it doesnt make sense to signup when you are logged in
   * @param router, references a Router so taht we can route to sign in page once you are done signing up
   */
  constructor(private _dataService: DataService, private authenticationService: AuthenticationService, private router: Router) {
    this._dataService.getUsers()
        .subscribe(res => this.users = res);
    this.authenticationService.logout();
  }


  /**
   * onSubmit(), is used to submit the entered form in the signup page
   */
  public onSubmit()
  {
    if(this.checkDuplicateEmail(this.newUser.email) == false)
    {
      var newUser = {
        firstName: this.newUser.firstName,
        lastName: this.newUser.lastName,
        password: this.newUser.password,
        email: this.newUser.email.toLowerCase(),
        streetAddress: this.newUser.streetAddress,
        city: this.newUser.city,
        state: this.newUser.state,
      }
      var aUser = new User();
      aUser.intitializeNewUser(newUser);
      this.emailError = false;
      this.firstNameError = false;
      this._dataService.checkEmail(aUser).subscribe();
      this.router.navigate(['signin']);
    }
      
  }
  
  /**
   * function to check for duplicate emails and returns true if there is a duplicate and false otherwise
   *
   * @param email, takes in an email to check against
   */
  private checkDuplicateEmail(email: string)
  {
    var i;
    for(i = 0; i < this.users.length; i++)
    {
      if(this.users[i].email == email)
      {
        this.emailError = true;
        this.emailMessage = "This email is already being used.";
        return true;
      } 
    }   
    return false;
  }
  /**
   * function to check if a firstName exists
   */
  public checkForFirstName()
  {
    if(typeof this.newUser.firstName !='undefined' && this.newUser.firstName){
      this.firstNameError = false;
    }
    else
    {
      this.firstNameError = true;
      this.firstNameMessage = "First Name is required.";

    }

  }

  /**
   * function to check if a lastName exists
   */
  public checkForLastName()
  {
    if(typeof this.newUser.lastName !='undefined' && this.newUser.lastName){
      this.lastNameError = false;
    }
    else
    {
      this.lastNameError = true;
      this.lastNameMessage = "Last Name is required.";

    }

  }

  /**
   * function to check if a password exists
   */
  public checkForPassword()
  {
    if(typeof this.newUser.password !='undefined' && this.newUser.password){
      this.passwordError = false;
    }
    else
    {
      this.passwordError = true;
      this.passwordMessage = "Password is required.";

    }

  }

 /**
   * function to check if a email exists
   */
  public checkForEmail()
  {
    if(typeof this.newUser.email !='undefined' && this.newUser.email){
      this.emailError = false;
    }
    else
    {
      this.emailError = true;
      this.emailMessage = "Email is required.";

    }

  }


  
}
