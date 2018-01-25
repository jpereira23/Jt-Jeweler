import { Output, Component, Input, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../data.service';
import { Order } from '../models/order';

import { Jewel } from '../models/jewel';
@Component({
  moduleId: module.id,
  selector: 'searching',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent 
{
  search: string = "";
  jewelry: Array<Jewel> = [];
  theJewelry: Array<Jewel> = [];
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


  constructor(private route: ActivatedRoute, private dataService: DataService)
  {
    this.dataService.getJewelry().subscribe(res => this.delegateForJewelry(res));
    this.route.queryParams.subscribe(params => {
      this.search = params["search"]; 
    });
    var aOrder = JSON.parse(localStorage.getItem('currentOrder'));
    if(aOrder != null)
    {
      this.order = aOrder;
    }
    this.cartNumber = this.order.jewelry.length;

  }

  public delegateForJewelry(jewelry: Array<Jewel>)
  {
    this.jewelry = null;
    this.jewelry = [];

    this.theJewelry = jewelry;
    for(var i = 0; i < jewelry.length; i++)
    {
      for(var j = 0; j < jewelry[i].keywords.length; j++)
      {
        if((jewelry[i].jewelName.indexOf(this.search) != -1 || jewelry[i].keywords[j].indexOf(this.search)) != -1 && this.jewelry.indexOf(jewelry[i]) == -1)
        {
          this.jewelry.push(jewelry[i]);
        }
      }
    }
  }

  searchChanged(aSearch: string)
  {
    this.jewelry = null;
    this.jewelry = [];
    for(var i = 0; i < this.theJewelry.length; i++)
    {
      for(var j = 0; j < this.theJewelry[i].keywords.length; j++)
      {
        if((this.theJewelry[i].jewelName.indexOf(this.search) != -1 || this.theJewelry[i].keywords[j].indexOf(this.search) != -1 ) && this.jewelry.indexOf(this.theJewelry[i]) == -1)
        {
          this.jewelry.push(this.theJewelry[i]);
        }
      }
    }

  }
}
