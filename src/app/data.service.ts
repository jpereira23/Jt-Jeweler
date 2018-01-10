import { Injectable } from '@angular/core';
import { User } from './models/user'; 
import { Jewel } from './models/jewel';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  result:any;

  constructor(private _http: Http) { }

  getUsers() {
  return this._http.get("http://192.168.1.69:3000/api/users")
      .map(result => this.result = result.json().data);
  }

  addUser(user: User) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json'); 
    return this._http.post("http://192.168.1.69:3000/api/adduser", JSON.stringify(user), {headers: headers}).map(res => res.json()); 
  }

  updateUser(){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    var user = {firstName: "Eduardo", lastName: "Yuja", password: "lll", streetAddress:"1234 ABC St.", city: "Tracy", state: "Ca", wishList: [100002, 10003], order: [4, 5], email: "jpereira1@mail.csuchico.edu"};
    return this._http.put("http://192.168.1.69:3000/api/user/" + "5a45883ae48e9a1be8d652db", JSON.stringify(user), {headers: headers}).map(res => res.json()); 
  }

  deleteUser()
  {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.delete("http://192.168.1.69:3000/api/user/" + "5a45883ae48e9a1be8d652db", {headers: headers}).map(res => res.json());
  }
  
  addJewel(jewel: Jewel){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post("http://192.168.1.69:3000/api/addjewelry", JSON.stringify(jewel), {headers: headers}).map(res => res.json());
  }

  getJewelry() {
    return this._http.get("http://192.168.1.69:3000/api/jewelry")
      .map(result => this.result = result.json().data);
  }

  deleteJewel(jewel)
  {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log("the second part is " + jewel.itemCode);
    return this._http.delete("http://192.168.1.69:3000/api/jewel/" + jewel._id, {headers: headers}).map(res => res.json());
  }

  editJewel(jewel){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log(jewel.itemCode); 
    return this._http.put("http://192.168.1.69:3000/api/jewel/" + jewel._id, JSON.stringify(jewel), {headers: headers}).map(res => res.json()); 
  }
}


