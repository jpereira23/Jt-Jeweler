import { Injectable } from '@angular/core';
import { User } from './models/user'; 
import { Order } from './models/order';
import { Jewel } from './models/jewel';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Injectable()
export class DataService {

  result:any;
  url: string = "http://192.168.1.69:3000/api/";
  routesArray: Array<string> = ["forgetPassword", "tempUsers", "tempUser", "users", "checkEmail", "adduser", "user", "addjewelry", "jewelry", "jewel", "addsize", "size", "addimage", "image", "addvideo", "video", "addorder", "order", "updateordernumber", "ordernumber"];
  headers = new Headers();
  
  constructor(private _http: Http) {
    this.headers.append('Content-Type', 'application/json');
  }

  /**
   * This is for users
   */


  forgotPassword(user)  {
    return this._http.post(this.url + this.routesArray[0], JSON.stringify(user), { headers: this.headers}).map(res => res.json()); 
  }
  getTempUsers() {
    return this._http.get(this.url + this.routesArray[1]).map(result => this.result = result.json().data);
  }

  deleteTempUser(user) {
    return this._http.delete(this.url + this.routesArray[2] + "/" + user._id, {headers: this.headers}).map(res => res.json());
  }
  getUsers() {
    return this._http.get(this.url + this.routesArray[3]).map(result => this.result = result.json().data);
  }

  checkEmail(user)
  {
    return this._http.post(this.url + this.routesArray[4], JSON.stringify(user), { headers: this.headers}).map(res => res.json()); 
  }

  addUser(user: User) {
    var addUser = { 
      firstName: user.firstName,
      lastName: user.lastName, 
      password: user.password,
      email: user.email,
      streetAddress: user.streetAddress,
      city: user.city,
      state: user.state, 
      wishList: user.wishList,
      orders: user.orders,
    }

    return this._http.post(this.url + this.routesArray[5], JSON.stringify(addUser), { headers: this.headers}).map(res => res.json()); 
 
  }

  updateUser(user){
    return this._http.put(this.url + this.routesArray[6] + "/" + user._id, JSON.stringify(user), {headers: this.headers}).map(res => res.json());
  }

  /**
   * This is for jewels
   */

  addJewel(jewel){
    return this._http.post(this.url + this.routesArray[7], JSON.stringify(jewel), { headers: this.headers}).map(res => res.json()); 
  }

  getJewelry() {
    return this._http.get(this.url + this.routesArray[8]).map(result => this.result = result.json().data);
  }

  deleteJewel(jewel) {
    return this._http.delete(this.url + this.routesArray[9] + "/" + jewel._id, {headers: this.headers}).map(res => res.json());
  }

  editJewel(jewel){
    return this._http.put(this.url + this.routesArray[9] + "/" + jewel._id, JSON.stringify(jewel), {headers: this.headers}).map(res => res.json());
  }

  /** 
   * This is for sizes
   */
  addSize(size){
    return this._http.post(this.url + this.routesArray[10], JSON.stringify(size), { headers: this.headers}).map(res => res.json()); 
  }

  getSizes(){
    return this._http.get(this.url + this.routesArray[11]).map(result => this.result = result.json().data);
  }

  /**
   * This is for images
   */

  addImage(image) {
    return this._http.post(this.url + this.routesArray[12], JSON.stringify(image), { headers: this.headers}).map(res => res.json()); 
  }

  getImages(){
    return this._http.get(this.url + this.routesArray[13]).map(result => this.result = result.json().data);
  }

  /**
   * This is for videos
   */

  addVideo(video) {
    return this._http.post(this.url + this.routesArray[14], JSON.stringify(video), { headers: this.headers}).map(res => res.json()); 
  }

  getVideos(){
    return this._http.get(this.url + this.routesArray[15]).map(result => this.result = result.json().data);
  }

  /**
   * This is for orders
   */

   addOrder(order: Order) {
      return this._http.post(this.url + this.routesArray[16], JSON.stringify(order.compactOrder()), { headers: this.headers}).map(res => res.json()); 
   }

   getOrders() {
      return this._http.get(this.url + this.routesArray[17]).map(result => this.result = result.json().data);
   }


    updateOrderNumber(ordernumber) {
      return this._http.put(this.url + this.routesArray[18] + "/" + ordernumber._id, JSON.stringify(ordernumber), {headers: this.headers}).map(res => res.json());
    }

    getOrderNumber() {
      return this._http.get(this.url + this.routesArray[19]).map(result => this.result = result.json().data);
    }
    
}


