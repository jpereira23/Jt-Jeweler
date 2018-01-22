import { Component } from '@angular/core';
import { NavigationExtras, ActivatedRoute, Params, Router} from '@angular/router';
import { WishListService } from '../wishlist.service';
import { DataService } from '../data.service';
import { CartService } from '../cart.service';
import { LayoutService } from '../layout.service'; 
import { Jewel } from '../models/jewel';
import { UserJewel } from '../models/userjewel';

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

  /**
   * this constructor is used to retrieve the route from whereever the product is clicked and obtain information to seek
   * the proper jewel for representation
   * 
   * @param cartService, represents a CartService for when we want to add something to the bag
   * @param _dataService, represents a DataService for when we obtain all the jewelry
   * @param route, represents a ActivatedRoute for when we retrieve a route
   * @param wishListService, represents a WishListService for when we click to add something to the wish list
   */
  constructor(private cartService: CartService, private _dataService: DataService, private route: ActivatedRoute, private wishListService: WishListService, private router: Router) 
  {
    this.route.queryParams.subscribe(params => {
      this.itemCode = params["itemCode"];
    });
    this._dataService.getJewelry()
      .subscribe(res => this.delegateForJewelry(res));
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
        this.jewelryToBePreviewed = jewelry[i];
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

      /**       URGENT WE NEED TO CHANGE THIS         **/
      location.reload();

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
    if(this.wishListService.addWish(this.jewelryToBePreviewed) == true)
    {
      this.wishListSuccess = true; 
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
}


