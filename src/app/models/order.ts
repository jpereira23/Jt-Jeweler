import { Jewel } from './jewel';
export class Order {
  _id: string;
  isUser: boolean;
  jewelry: Array<Jewel>;
  runningTotal: number;
  user: string;
  orderNumber: number;

  constructor()
  {
    this._id = "";
    this.isUser = false;
    this.jewelry = [];
    this.runningTotal = 0;
    this.user = "";
    this.orderNumber = 0;
  }

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



