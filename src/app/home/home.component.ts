import { Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationExtras } from '@angular/router';

// Import the DataService
import { DataService } from '../data.service';
import { CartService } from '../cart.service';
import { User } from '../models/user';
import { Jewel } from '../models/jewel';
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
  /*
  config: SwiperOptions = {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 30
  };
  */
  
  /**
   * Constructor for the home component, here is where we initialize DataService, ActivatedRouter, AuthenticationService, Router, CartService, and
   * we also get all the jewelry from the DataService as well
   *  
   * @param dataSerivce, references the DataService
   * @param router, refernces router so it can allow us to change routes on the fly 
   * @param _cartService, allows us to access the CartService and addItems when we click Add to Shopping Bag
   */
  constructor(private _dataService: DataService, private router: Router, private _cartService: CartService) {
  
    // Access all the jewelry that is created
    this._dataService.getJewelry()
      .subscribe(res => this.delegateForJewelry(res));
    
  } 

  /**
   *  delegateForJewelry(jewelry: Array<jewel>) is used to as the delegate callback to get the jewelry for the jewelry instance
   *
   * @params jewelry, an array that will give us all the jewelry from the DataService
   */
  private delegateForJewelry(jewelry: Array<Jewel>)
  {
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
    /**       URGENT WE NEED TO CHANGE THIS         **/

    location.reload();
  }
}
