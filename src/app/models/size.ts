import { AdminSize } from './adminSize'; 

export class Size {
  _id: string;
  size: number; 

  /**
   * constructor, is used to intialize the _id and the size to null values
   */
  constructor()
  {
    this._id = "";
    this.size = 0;
  } 

  /**
   * compactSize(), is used to add a size to the database without intializing an id
   */
  public compactSize()
  {
    var aSize = {
      size: this.size
    }
    return aSize;
  }

  /** 
   * adminSize(), converts a Size to an AdminSize
   */ 
  public adminSize()
  {
    var adminSize = new AdminSize();
    adminSize.size = this.size
    return adminSize;
  }
    
}


