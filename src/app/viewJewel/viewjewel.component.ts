import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Router, NavigationExtras } from '@angular/router';
import { Jewel } from '../models/jewel';

@Component({
  selector: 'viewJewel',
  templateUrl: './viewjewel.component.html',
  styleUrls: ['./viewjewel.component.css'],
})

export class ViewJewelryComponent {
  jewelry: Array<any>;

  constructor(private _dataService: DataService, private router: Router)
  {
    this._dataService.getJewelry()
      .subscribe(res => this.jewelry = res);
  }

  editPage(index)
  {
    let navigationExtras: NavigationExtras = { 
      queryParams: {
        "itemCode": this.jewelry[index].itemCode 
      }
    };
    
    this.router.navigate(['editJewel'], navigationExtras);
  }
  
  deletePage(index)
  {
    console.log("first part " + this.jewelry[index].itemCode);
    this._dataService.deleteJewel(this.jewelry[index]).subscribe();  

    location.reload();
  }
}
