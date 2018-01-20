import { Jewel } from './jewel';
export class Order {
  _id: string;
  isUser: boolean;
  jewelry: Array<Jewel>;
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
}



