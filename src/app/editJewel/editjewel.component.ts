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
      }
    }
  }

  public onSubmit()
  {
    console.log(this.jewelryToBeEdited.itemCode);
    var editJewel = {
      _id: this.jewelryToBeEdited._id,
      jewelName: this.jewelryToBeEdited.jewelName,
      price: this.jewelryToBeEdited.price,
      quantity: this.jewelryToBeEdited.quantity,
      sizes: this.jewelryToBeEdited.sizes,
      colors: this.jewelryToBeEdited.colors,
      isFemale: this.jewelryToBeEdited.isFemale,
      isMale: this.jewelryToBeEdited.isMale,
      category: this.jewelryToBeEdited.category,
      images: this.jewelryToBeEdited.images,
      popularRank: this.jewelryToBeEdited.popularRank,
      itemCode: this.jewelryToBeEdited.itemCode,
      centerStone: this.jewelryToBeEdited.centerStone,
      weightOneDim: this.jewelryToBeEdited.weightOneDim, 
      weightThreeDim: this.jewelryToBeEdited.weightThreeDim, 
      shape: this.jewelryToBeEdited.shape, 
      clarity: this.jewelryToBeEdited.clarity, 
      metal: this.jewelryToBeEdited.metal, 
      details: this.jewelryToBeEdited.details, 
      formalDescription: this.jewelryToBeEdited.formalDescription, 
      video: this.jewelryToBeEdited.video
    }
    this._dataService.editJewel(editJewel).subscribe();

    this.router.navigate(['viewJewel']);
  }

}
