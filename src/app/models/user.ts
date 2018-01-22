import { Order } from './order'; 
import { Jewel } from './jewel';

export class User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  streetAddress: string;
  city: string;
  state: string;
  wishList: Array<Jewel>;
  orders: number[];
  currentOrder: Order;
  token: string;
  
  constructor()
  {
    this._id = "";
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.password = "";
    this.streetAddress = "";
    this.city = "";
    this.state = "";
    this.wishList = [];
    this.orders = [];
    this.currentOrder = new Order();
    this.token = ""; 
  }

  compactUser()
  {
    var user = {
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password,
      email: this.email,
      streetAddress: this.streetAddress,
      city: this.city,
      state: this.state,
      wishList: this.wishList,
      orders: this.orders,
      currentOrder: this.currentOrder,
      token: this.token
    }
    return user;
  }

  intitializeNewUser(newUser: any)
  {
    this.firstName = newUser.firstName;
    this.lastName = newUser.lastName;
    this.password = newUser.password;
    this.email = newUser.email;
    this.streetAddress = newUser.streetAddress;
    this.city = newUser.city;
    this.state = newUser.state;
  }

  public convertJSON(jsonUser: any)
  {
    this._id = jsonUser._id;
    this.firstName = jsonUser.firstName;
    console.log("firstName is " + this.firstName);
    this.lastName = jsonUser.lastName;
    console.log("lastName is " + this.lastName); 
    this.email = jsonUser.email;
    this.password = jsonUser.password;
    this.streetAddress = jsonUser.streetAddress;
    this.city = jsonUser.city;
    this.state = jsonUser.state;
    var aWishList: Array<Jewel> = [];

    for(var i = 0; i < jsonUser.wishList.length; i++)
    {
      var aJewel = new Jewel();
      aJewel.convertJSON(jsonUser.wishList[i]);
      aWishList.push(aJewel);
    }
    this.wishList = aWishList;
    this.orders = jsonUser.orders;
    if(jsonUser.currentOrder != null)
    {
      var aOrder = new Order();
      aOrder.convertJSON(jsonUser.currentOrder);
      this.currentOrder = aOrder;
    }
    else
    {
      this.currentOrder = null;
    }
    this.token = jsonUser.token;
  }

}

