import { UserJewel } from './userjewel';

export class Order {
  _id: string;
  isUser: boolean;
  jewelry: Array<UserJewel>;
  runningTotal: number;
  user: string;
  orderNumber: number;

  /** 
   * constructor(), is used to intitialize _id, isUsed, jewelry, runningTotal, user and orderNumber to null values
   */
  constructor()
  {
    this._id = "";
    this.isUser = false;
    this.jewelry = [];
    this.runningTotal = 0;
    this.user = "";
    this.orderNumber = 0;
  }
  
  /**
   * compactOrder(), is used to create an Order without an Id so we can send it to the database without a generated id
   */
  public compactOrder()
  {
    var compactOrder = { 
      isUser: this.isUser,
      jewelry: this.jewelry,
      runningTotal: this.runningTotal,
      user: this.user,
      orderNumber: this.orderNumber
      }

      return compactOrder;
  }

  /**
   * convertJSON(order:any), function that takes given JSON into order class
   *
   * @param order, given JSON
   */ 
  public convertJSON(order: any)
  {
    this._id = order._id;
    this.isUser = order.isUser;
    var tempArray: Array<UserJewel> = [];

    for(var i = 0; i < order.jewelry.length; i++)
    {
      var aJewel = new UserJewel();
      aJewel.convertJSON(order.jewelry[i]); 
      tempArray.push(aJewel);
    } 
    this.jewelry = tempArray; 
    this.runningTotal = order.runningTotal;
    this.user = order.user;
    this.orderNumber = order.orderNumber;
  }
}



