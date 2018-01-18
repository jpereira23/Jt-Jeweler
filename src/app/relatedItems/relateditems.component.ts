import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Jewel } from '../models/jewel';
@Component({
  moduleId: module.id,
  selector: 'related-item',
  templateUrl: './relateditems.component.html',
  styleUrls: ['./relateditems.component.css']
})

export class RelatedItemComponent {
  jewelry: Array<Jewel>;
  constructor(private dataService: DataService) 
  {
    this.dataService.getJewelry()
      .subscribe(res => this.delegateGetJewelry(res));   
  }

  public delegateGetJewelry(jewelry: Array<Jewel>)
  {
    this.jewelry = jewelry;
  }
}
