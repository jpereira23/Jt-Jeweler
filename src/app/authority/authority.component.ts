import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'authority',
  templateUrl: './authority.component.html',
  styleUrls: ['./authority.component.css']
})


export class AuthorityComponent{
  username: string ="";
  password: string ="";  
  @Output() authority: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(){}

  public logIn(){
    if(this.username == "InHouse" && this.password == "routs7/Errol")
    {
      this.authority.next(true);
    }
  }   
}
