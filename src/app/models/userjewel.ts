import { Jewel } from './jewel';

export class UserJewel
{
  jewel: Jewel;
  selectedSize: number;
  
  /**
   * constructor, is used to intialize the jewel and the selectedSize to null values
   */
  constructor()
  {
    this.jewel = new Jewel();
    this.selectedSize = 0;
  }  

  convertJSON(aJewel: any)
  {
    var actualJewel = new Jewel();
    actualJewel.convertJSON(aJewel.jewel);
    this.jewel = actualJewel;
    this.selectedSize = aJewel.selectedSize;
  } 
}

