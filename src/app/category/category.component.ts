import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';

import { DataService } from '../data.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent {
  filter: string = "any";
  jewelry: Array<any>;
  filteredJewelry: Array<any> = []; 
  filters: Array<string> = ["High To Low", "Low To High"];
  theFilter: string = "";
  constructor(private _dataService: DataService, private route: ActivatedRoute, private router: Router, private cartService: CartService)
  {
    this.route.queryParams.subscribe(params => {
      this.filter = params["filter"];
    });

    this._dataService.getJewelry()
      .subscribe(res => this.delegateForJewelry(res));
  }
 
  public filterData()
  {
    if(this.theFilter == this.filters[0])
    {
      this.filteredJewelry.sort((a,b)=>b.price-a.price); 
      console.log("Hello");
    }
    else if(this.theFilter == this.filters[1])
    {
      this.filteredJewelry.sort((a,b)=>a.price-b.price); 
      console.log("Goodbye"); 
    }
  }

  public addToCart(index)
  {
    var jewel = this.filteredJewelry[index];
    this.cartService.addItem(jewel);
    location.reload();
  }
  viewProductPage(i)
  {
    var jewel = this.filteredJewelry[i];
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "itemCode": jewel.itemCode
      }
    };
    this.router.navigate(['productPage'], navigationExtras);  
  }  


  delegateForJewelry(jewelry)
  {
    this.jewelry = jewelry;
    if(this.filter == "any")
    {
      this.filteredJewelry = this.jewelry;
    }   
    else
    {
      for(var i = 0; i < this.jewelry.length; i++)
      {
        if(this.jewelry[i].category == this.filter)
        {
          this.filteredJewelry.push(this.jewelry[i]);
        } 
      }
    }
  }
}

