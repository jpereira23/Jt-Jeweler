import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { WishListService } from '../wishlist.service';
import { DataService } from '../data.service';
import { CartService } from '../cart.service';
@Component({
  selector: 'productPage',
  templateUrl: './productpage.component.html',
  styleUrls: ['./productpage.component.css']
})

export class ProductPageComponent {
  jewelry: Array<any>;
  itemCode: string; 
  signedIn: boolean = false;
  loading = false;
  jewelryToBePreviewed: any;
  quantity: number = 0;
  wishListSuccess:boolean = false;
  constructor(private cartService: CartService, private _dataService: DataService, private route: ActivatedRoute, private router: Router, private wishListService: WishListService) 
  {
    this.route.queryParams.subscribe(params => {
      this.itemCode = params["itemCode"];
      this.signedIn = params["signedIn"];
    });
    this._dataService.getJewelry()
      .subscribe(res => this.delegateForJewelry(res));
  }

  delegateForJewelry(jewelry)
  {
    this.jewelry = jewelry;

    for(var i = 0; i < this.jewelry.length; i++)
    {
      if(this.itemCode != null && this.jewelry[i].itemCode == this.itemCode)
      {
        this.loading = true;
        this.jewelryToBePreviewed = this.jewelry[i];
        this.jewelryToBePreviewed.quantity = 1; 
      }
    }

    this.wishListSuccess = this.wishListService.isItemInWishList(this.jewelryToBePreviewed);    
  } 
  
  addItem()
  {
    this.cartService.addItem(this.jewelryToBePreviewed); 
    location.reload();
  }

  public addToWishlist()
  {
    if(this.wishListService.addWish(this.jewelryToBePreviewed) == true)
    {
      this.wishListSuccess = true; 
    }  
  }
}
