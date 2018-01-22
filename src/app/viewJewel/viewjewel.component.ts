import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Router, NavigationExtras } from '@angular/router';
import { Jewel } from '../models/jewel';
import { forkJoin } from 'rxjs/observable/forkJoin';
@Component({
  selector: 'viewJewel',
  templateUrl: './viewjewel.component.html',
  styleUrls: ['./viewjewel.component.css'],
})

export class ViewJewelryComponent {
  jewelry: Array<any>;
  images: Array<any>; 
  constructor(private _dataService: DataService, private router: Router)
  {
    this._dataService.getJewelry().subscribe(res =>  this.delegateSir(res))
  }

  delegateSir(array)
  {
    this.jewelry = array;
   this._dataService.getImages().subscribe(res=> this.images = res)
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
    var id:string = "";
    for(var i = 0; i < this.images.length; i++)
    {
      if(this.images[i].name == this.jewelry[index].images[0])
      {
        id = this.images[i]._id;
        console.log(id);
      }
    }
    console.log(id); 

    forkJoin([this._dataService.deleteJewel(this.jewelry[index]),this._dataService.deleteImage(id)]).subscribe();    


           location.reload();
  }
}
