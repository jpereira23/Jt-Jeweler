import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';

import { DataService } from '../data.service';

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent {
  filter: string = "any";
  jewelry: Array<any>;
  filteredJewelry: Array<any> = []; 
  constructor(private _dataService: DataService, private route: ActivatedRoute, private router: Router)
  {
    this.route.queryParams.subscribe(params => {
      this.filter = params["filter"];
    });

    this._dataService.getJewelry()
      .subscribe(res => this.delegateForJewelry(res));
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

