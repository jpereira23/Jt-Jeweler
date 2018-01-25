import { Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationExtras } from '@angular/router';

// Import the DataService
import { DataService } from '../data.service';
import { CartService } from '../cart.service';
import { LayoutService } from '../layout.service';
import { AuthenticationService } from '../authentication.service';
import { User } from '../models/user';
import { Jewel } from '../models/jewel';
import { Order } from '../models/order'; 
import { UserJewel } from '../models/userjewel';

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent{
  jewelry: Array<Jewel>;
  categories: Array<string> = ["Ring", "Earring", "Band", "Pendant", "Bracelet"];
  categoryImages: Array<string> = ["multimedia/Ring.png", "multimedia/Earring.png", "multimedia/Band.png", "multimedia/Necklace.png", "multimedia/Bracelet.png"];
  config: SwiperOptions = {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 30,
    slidesPerColumnFill: 'row'
  };
  signedInUser: User = null;
  order = new Order();
  cartNumber: number = 0;
  
  /**
   * Constructor for the home component, here is where we initialize DataService, ActivatedRouter, AuthenticationService, Router, CartService, and
   * we also get all the jewelry from the DataService as well
   *  
   * @param dataSerivce, references the DataService
   * @param router, refernces router so it can allow us to change routes on the fly 
   * @param _cartService, allows us to access the CartService and addItems when we click Add to Shopping Bag
   */
  constructor(private _dataService: DataService, private router: Router, private _cartService: CartService, private layoutService: LayoutService, private authenticationService: AuthenticationService) {
  
    // Access all the jewelry that is created
    this._dataService.getJewelry()
      .subscribe(res => this.delegateForJewelry(res));

    this.signedInUser = JSON.parse(localStorage.getItem('currentUser'));
    var aOrder = JSON.parse(localStorage.getItem('currentOrder'));
    if(aOrder != null)
    {
      this.order = aOrder;
    }
    this.cartNumber = this.order.jewelry.length;
        
  } 

  /**
   *  delegateForJewelry(jewelry: Array<jewel>) is used to as the delegate callback to get the jewelry for the jewelry instance
   *
   * @params jewelry, an array that will give us all the jewelry from the DataService
   */
  private delegateForJewelry(jewelry: Array<Jewel>)
  {
    
    jewelry.sort((a,b)=>b.purchaseRank-a.purchaseRank);  
    console.log(jewelry); 
    this.jewelry = jewelry;
  }
  
  /**
   * viewProductPage(i: number) is used to direct us to the product page with the right jewel that was selected
   *
   * @params i, is a type number that gives us the index of the jewel to look for in jewelry array
   */
  public viewProductPage(i: number)
  {
    var jewel = this.jewelry[i];
    jewel.popularRank += 1;
    this._dataService.editJewel(jewel).subscribe();
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "itemCode": jewel.itemCode
      }
    };
    this.router.navigate(['productPage'], navigationExtras);  
  }  

  /**
   * changeFilter(i: number) is used to guide us to the category page and display the proper categoried jewelry
   * 
   * @param i, a number that tells us which jewelry we are filtering for
   */
  public changeFilter(i: number)
  {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "filter": this.categories[i]
      }
    };
    
    this.router.navigate(['category'], navigationExtras);    
  } 
  /** 
   * addItem(i: number) is used to add an item to the CartService for the orders
   *
   * @param i, the index of what jewelry to add to the order
   */
  public addItem(i: number)
  {
    var aJewel: Jewel = this.jewelry[i];
    aJewel.quantity = 1;
    var userJewel: UserJewel = aJewel.convertUserJewel();
    console.log("jewelry name is " + aJewel.jewelName);
    this._cartService.addItem(userJewel);

    this.order = JSON.parse(localStorage.getItem('currentOrder'));
    this.cartNumber = this.order.jewelry.length;
    

  }
}
