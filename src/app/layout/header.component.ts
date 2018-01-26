import { Output,Component, Input, OnInit, EventEmitter} from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { CartService } from '../cart.service';
import { LayoutService } from '../layout.service';
import { DataService } from '../data.service';
import { Router, NavigationExtras} from '@angular/router';
import { MatDialog } from '@angular/material';
import { SignInComponent } from '../signin/signin.component';

@Component({
  moduleId: module.id,
  selector: 'layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
  })

export class HeaderComponent {
  signedIn: boolean = false;
  signedInUser: any;
  @Input() numOfItems: number = 0;
  search: string = ""; 
  @Output() aSearch: EventEmitter<string> = new EventEmitter<string>();
  constructor(private authenticationService: AuthenticationService, private cartService: CartService, private router: Router, private layoutService: LayoutService, private dataService: DataService, public dialog: MatDialog)
  {
    this.signedInUser = JSON.parse(localStorage.getItem('currentUser')); 
    this.numOfItems = this.cartService.getNumItems(); 
    if(this.signedInUser != null)
    {
      console.log("hmm");
      this.signedIn = true;
    }
  }

  openDialog(): void {
  let dialogRef = this.dialog.open(SignInComponent, {
    width: '400px',
    height: '484px',
    data: { }
  });
    
  } 

  ngOnInit(){
    this.layoutService.getData().subscribe(data => {
      this.signedIn = data;
      if(this.signedIn == true)
      {
        var user = JSON.parse(localStorage.getItem('currentOrder'));
        if(user.currentOrder != null)
        {
          this.numOfItems = user.currentOrder.length;
        }
      }
    })
  }

  signOut()
  {
    var currentOrder = JSON.parse(localStorage.getItem('currentOrder'));
    this.numOfItems = 0;
    localStorage.removeItem('currentOrder');
    var user = {
      firstName: this.signedInUser.firstName, 
      lastName: this.signedInUser.lastName,
      password: this.signedInUser.password,
      _id: this.signedInUser._id,
      email: this.signedInUser.email,
      streetAddress: this.signedInUser.streetAddress,
      city: this.signedInUser.city,
      state: this.signedInUser.state,
      wishList: this.signedInUser.wishList,
      orders: this.signedInUser.orders,
      token: this.signedInUser.token,
      currentOrder: currentOrder
    }

    this.dataService.updateUser(user).subscribe();
    this.authenticationService.logout();
    this.signedIn = false;
  }

  searching()
  {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "search": this.search
      }
    }
    console.log("hello word");
    this.aSearch.next(this.search);
    this.router.navigate(['searching'], navigationExtras);
  }
}
