import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class LayoutService {
  private dataObs$ = new Subject<boolean>();
  
  getData() {
    return this.dataObs$;
  }
  
  updateValue(data: boolean){ 
    this.dataObs$.next(data); 
  }

}
