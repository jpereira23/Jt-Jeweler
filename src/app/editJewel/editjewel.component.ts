import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { DataService } from '../data.service';
import { Jewel } from '../models/jewel';
@Component({
  selector: 'editJewel',
  templateUrl: './editjewel.component.html',
  styleUrls: ['./editjewel.component.css']
})

export class EditJewelryComponent {
  jewelry: Array<any>;
  jewelryToBeEdited: any;
  loading = false;
  itemCode: string;
  aKey: string = "";
  keywords: Array<string> = [];
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

    var i;
    for(i = 0; i < this.jewelry.length; i++)
    {
      if(this.itemCode != null && this.jewelry[i].itemCode == this.itemCode)
      {
        this.loading = true;
        this.jewelryToBeEdited = this.jewelry[i];  
        this.keywords = this.jewelry[i].keywords;
      }
    }
  }

  public onSubmit()
  {
   
    this._dataService.editJewel(this.jewelryToBeEdited).subscribe();

    this.router.navigate(['viewJewel']);
  }

  public addingKey()
  {
    this.keywords.push(this.aKey);
  }

}
