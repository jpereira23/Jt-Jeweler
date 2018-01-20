import { Size } from './size';
import { JewelSize } from './jewelSize';
export class AdminSize {
  size: number;
  isUsed: boolean;
  quantity: number;

  /** 
   * constructor, is used to intialize the size, isUsed and quantity to null values
   */
  constructor()
  {
    this.size = 0;
    this.isUsed = false;
    this.quantity = 0;
  }
  /** 
   * jewelSize(), is used to convert an AdminSize to JewelSize
   */
  public jewelSize()
  {
    var jewelSize = new JewelSize();
    jewelSize.quantity = this.quantity;
    jewelSize.size = this.size;
    return jewelSize;
  }
}
