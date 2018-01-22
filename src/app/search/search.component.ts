import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'searching',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent 
{
  search: string = "";

  constructor(private route: ActivatedRoute)
  {
    this.route.queryParams.subscribe(params => {
      this.search = params["search"]; 
    });
  }
}
