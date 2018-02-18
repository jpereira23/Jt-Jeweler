import { Component, ViewChild } from '@angular/core';
import { NavigationExtras, ActivatedRoute, Params, Router} from '@angular/router';
import { WishListService } from '../wishlist.service';
import { DataService } from '../data.service';
import { CartService } from '../cart.service';
import { LayoutService } from '../layout.service'; 
import { Jewel } from '../models/jewel';
import { UserJewel } from '../models/userjewel';
import { Order } from '../models/order';
import { SwiperComponent } from 'angular2-useful-swiper';
import { MatDialog } from '@angular/material';
import { SignInComponent } from '../signin/signin.component';

@Component({
  selector: 'productPage',
  templateUrl: './productpage.component.html',
  styleUrls: ['./productpage.component.css']
})


export class ProductPageComponent {
  itemCode: string; 
  loading: boolean = false;
  jewelryToBePreviewed: Jewel;
  userJewel = new UserJewel();
  wishListSuccess:boolean = false;
  sizeSelected: boolean = false;
  cartNumber: number = 0;
  order = new Order(); 
  initialValue: string = "Select Size"; 
  @ViewChild('usefulSwiper') usefulSwiper: SwiperComponent;
  config: SwiperOptions = {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 30,
    slidesPerColumnFill: 'row'
  };

  /**
   * this constructor is used to retrieve the route from whereever the product is clicked and obtain information to seek
   * the proper jewel for representation
   * 
   * @param cartService, represents a CartService for when we want to add something to the bag
   * @param _dataService, represents a DataService for when we obtain all the jewelry
   * @param route, represents a ActivatedRoute for when we retrieve a route
   * @param wishListService, represents a WishListService for when we click to add something to the wish list
   */
  constructor(private cartService: CartService, private _dataService: DataService, private route: ActivatedRoute, private wishListService: WishListService, private router: Router, private layoutService: LayoutService, public dialog: MatDialog) 
  {
    this.route.queryParams.subscribe(params => {
      this.itemCode = params["itemCode"];
    });

    this._dataService.getJewelry()
      .subscribe(res => this.delegateForJewelry(res));


    var aOrder = JSON.parse(localStorage.getItem('currentOrder'));
    if(aOrder != null)
    {
      this.order = aOrder;
    }
    this.cartNumber = this.order.jewelry.length;
 
  }

  /**
   * delegateForJewelry(jewelry: Array<Jewel>), this function is used to figure out which jewel is going to be the one presented based on the itemCode
   *
   * @param jewelry, is an array of jewelry we retrieve from the the DataService
   */
  public delegateForJewelry(jewelry: Array<Jewel>)
  {
    for(var i = 0; i < jewelry.length; i++)
    {
      
      if(this.itemCode != null && jewelry[i].itemCode == this.itemCode)
      {
        this.jewelryToBePreviewed = new Jewel();
        this.jewelryToBePreviewed.convertJSON(jewelry[i]);
        this.jewelryToBePreviewed.quantity = 1; 
        this.loading = true;
      }
    }
    this.wishListSuccess = this.wishListService.isItemInWishList(this.jewelryToBePreviewed);    
  } 
  
  /**
   * addItem(), this function is used to add an item to the shopping bag
   */
  addItem()
  {
    if(this.userJewel.selectedSize != 0)
    {
      this.userJewel.jewel = this.jewelryToBePreviewed;
      this.cartService.addItem(this.userJewel); 
      this.sizeSelected = false; 


      this.order = JSON.parse(localStorage.getItem('currentOrder'));
      this.layoutService.addToCart(1);
      this.cartNumber = this.order.jewelry.length;
    }
    else
    {
      this.sizeSelected = true;
    }
  }

  /**
   *  addToWishList(), this function is used to add an item to the shopping bag
   */
  public addToWishlist()
  {
    var aUser = JSON.parse(localStorage.getItem('currentUser'));
    if(aUser != null && this.wishListService.addWish(this.jewelryToBePreviewed) == true)
    {
      this.wishListSuccess = true; 
    }  
    else
    {
      let dialogRef = this.dialog.open(SignInComponent, {
        width: '400px',
        height: '484px',
        data: { }
      });
    }
  }

  
  public wishList()
  {
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "wishList": true
        }
      };
      this.router.navigate(['manageAccount'], navigationExtras); 
  }

  public changeJewel(jewel: Jewel){
    this.jewelryToBePreviewed = jewel;
  }

  public cartNumberChanged(cNumber: number){
    this.cartNumber = cNumber;
  }

  public addQuantity(){
    this.jewelryToBePreviewed.quantity += 1;
  }

  public subtractQuantity(){
    if(this.jewelryToBePreviewed.quantity > 0)
    {
      this.jewelryToBePreviewed.quantity -=1;
    }
  }

  public changeImage(index){
    this.usefulSwiper.swiper.slideTo(index); 
  }

}


