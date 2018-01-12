import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { DataService } from '../data.service';
@Component({
  selector: 'productPage',
  templateUrl: './productpage.component.html',
  styleUrls: ['./productpage.component.css']
})

export class ProductPageComponent {
  jewelry: Array<any>;
  itemCode: string; 
  loading = false;
  jewelryToBePreviewed: any;
  constructor(private _dataService: DataService, private route: ActivatedRoute, private router: Router) 
  {

    this.route.queryParams.subscribe(params => {
      this.itemCode = params["itemCode"];
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
      }
    }
  } 
}
