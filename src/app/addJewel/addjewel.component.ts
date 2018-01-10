import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';

import { DataService } from '../data.service';
import { Jewel } from '../models/jewel';

const URL = 'http://192.168.1.69:3000/upload';

@Component({
  selector: 'addJewel',
  templateUrl: './addjewel.component.html',
  styleUrls: ['./addjewel.component.css']
})  

export class AddJewelryComponent {
  newJewel = new Jewel();
  uploader: FileUploader = new FileUploader({url: URL});
  threeDimOne: number = 0.00;
  threeDimTwo: number = 0.00;
  threeDimThree: number = 0.00;
  threeDimArray: Array<number> = [];
  detailsArray: Array<string> = [];
  detail1: string="";
  detail2: string="";
  detail3: string="";  

  constructor(private _dataService: DataService, private router: Router)
  {
  } 

  public onSubmit()
  {
    this.threeDimArray.push(this.threeDimOne);
    this.threeDimArray.push(this.threeDimTwo);
    this.threeDimArray.push(this.threeDimThree);
    this.detailsArray.push(this.detail1);
    this.detailsArray.push(this.detail2);
    this.detailsArray.push(this.detail3);
    var newJewel = {
      jewelName: this.newJewel.jewelName,
      price: this.newJewel.price,
      quantity: this.newJewel.quantity,
      sizes: [],
      colors: [],
      isFemale: this.newJewel.isFemale, 
      isMale: this.newJewel.isMale, 
      category: "N/A",
      images: [],
      popularRank: 0,
      itemCode: this.newJewel.itemCode,
      centerStone: this.newJewel.centerStone,
      weightOneDim: this.newJewel.weightOneDim,
      weightThreeDim: this.threeDimArray,
      shape: this.newJewel.shape,
      clarity: this.newJewel.clarity,
      metal: this.newJewel.metal,
      details: this.detailsArray,
      formalDescription: this.newJewel.formalDescription,
      video: "N/A"
    }
    this._dataService.addJewel(newJewel).subscribe();

    this.router.navigate(['viewJewel']);
  }

  public upload()
  {
    const formData: any = new FormData();
  }
}

