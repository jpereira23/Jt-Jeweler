import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class LayoutService {
  private dataObs$ = new Subject<boolean>();
  private _subject = new Subject<any>();
    
  newEvent(event) {
    this._subject.next(event);
  }

  get events$() 
  {
    return this._subject.asObservable(); 
  } 
  getData() {
    return this.dataObs$;
  }
  
  updateValue(data: boolean){ 
    this.dataObs$.next(data); 
  }

}
