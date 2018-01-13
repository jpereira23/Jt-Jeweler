import { Injectable } from '@angular/core';
import { User } from './models/user'; 
import { Jewel } from './models/jewel';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  result:any;

  constructor(private _http: Http) { }

  /**
   * This is for users
   */

  getUsers() {
  return this._http.get("http://192.168.1.69:3000/api/users")
      .map(result => this.result = result.json().data);
  }

  addUser(user: User) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json'); 
    return this._http.post("http://192.168.1.69:3000/api/adduser", JSON.stringify(user), {headers: headers}).map(res => res.json()); 
  }

  updateUser(user){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.put("http://192.168.1.69:3000/api/user/" + user._id, JSON.stringify(user), {headers: headers}).map(res => res.json()); 
  }

  deleteUser()
  {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.delete("http://192.168.1.69:3000/api/user/" + "5a45883ae48e9a1be8d652db", {headers: headers}).map(res => res.json());
  }
  
  /**
   * This is for jewels
   */

  addJewel(jewel){
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

  /** 
   * This is for sizes
   */
  addSize(size){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post("http://192.168.1.69:3000/api/addsize/", JSON.stringify(size), {headers: headers}).map(res => res.json());
  }

  getSizes(){
    return this._http.get("http://192.168.1.69:3000/api/size")
      .map(result => this.result = result.json().data);
  }

  /**
   * This is for images
   */

  addImage(image)
  {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post("http://192.168.1.69:3000/api/addimage/", JSON.stringify(image), {headers: headers}).map(res => res.json());
  }

  getImages(){
    return this._http.get("http://192.168.1.69:3000/api/image/")
    .map(result => this.result = result.json().data);
  }

  /**
   * This is for videos
   */

  addVideo(video)
  {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post("http://192.168.1.69:3000/api/addvideo/", JSON.stringify(video), {headers: headers}).map(res => res.json());
  }

  getVideos(){
    return this._http.get("http://192.168.1.69:3000/api/video/")
    .map(result => this.result = result.json().data);
  }

  /**
   * This is for orders
   */

   addOrder(order)
   {
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      console.log("How we doing"); 
      return this._http.post("http://192.168.1.69:3000/api/addorder/", JSON.stringify(order), {headers: headers}).map(res => res.json()); 
   }

    getOrders()
    {
      return this._http.get("http://192.168.1.69:3000/api/order/")
      .map(result => this.result = result.json().data); 
    }


    updateOrderNumber(ordernumber)
    {
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this._http.put("http://192.168.1.69:3000/api/updateordernumber/" + ordernumber._id, JSON.stringify(ordernumber), {headers: headers}).map(res => res.json()); 
  
    }

    getOrderNumber()
    {
      return this._http.get("http://192.168.1.69:3000/api/ordernumber/")
      .map(result => this.result = result.json().data); 
    }
    
}


