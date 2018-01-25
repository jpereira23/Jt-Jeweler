import { Component, Output, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router, NavigationExtras } from '@angular/router';
import { DataService } from '../data.service';
import { CartService } from '../cart.service';
import { Jewel } from '../models/jewel';
import { Order } from '../models/order';
import { UserJewel } from '../models/userjewel';
@Component({
  moduleId: module.id,
  selector: 'related-item',
  templateUrl: './relateditems.component.html',
  styleUrls: ['./relateditems.component.css']
})

export class RelatedItemComponent {
  jewelry: Array<Jewel>;
  order = new Order();
  cartNumber: number = 0;
  @Output() cNumber: EventEmitter<number> = new EventEmitter<number>();
  @Output() jewel: EventEmitter<Jewel> = new EventEmitter<Jewel>();
  config: SwiperOptions = {
    pagination: '.swiper-pagination',
    paginationClickable: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    spaceBetween: 30,
    slidesPerColumnFill: 'row'
  };

  constructor(private dataService: DataService, private _cartService: CartService, private router: Router) 
  {
    this.dataService.getJewelry()
      .subscribe(res => this.delegateGetJewelry(res));   

    var aOrder = JSON.parse(localStorage.getItem('currentOrder'));
    if(aOrder != null)
    {
      this.order = aOrder;
    }
    this.cartNumber = this.order.jewelry.length;
  }



  public delegateGetJewelry(jewelry: Array<Jewel>)
  {

    jewelry.sort((a,b)=>b.popularRank-a.popularRank);  
    this.jewelry = jewelry;
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
    this.cNumber.next(this.cartNumber);
    

  }

  public viewProductPage(i: number)
  {
    this.jewelry[i].popularRank += 1;
    this.dataService.editJewel(this.jewelry[i]).subscribe();
    this.jewel.next(this.jewelry[i]);
    window.scrollTo(0,0);

  }  


}
