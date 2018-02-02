import { Weight3D } from './weight3d';
import { DetailList } from './detaillist';
import { JewelSize } from './jewelSize';
import { UserJewel } from './userjewel'; 
export class Jewel {
  _id: string;
  jewelName: string;
  price: number;
  quantity: number;
  sizes: Array<JewelSize>;
  colors: number[];
  isFemale: Boolean;
  isMale: Boolean;
  category: string;
  images: string[];
  popularRank: number;
  purchaseRank: number;
  itemCode: string;
  centerStone: string;
  weightOneDim: number;
  weight3d: Weight3D;
  shape: string;
  clarity: string;
  metal: string;
  detaillist: DetailList;
  formalDescription: string;
  video: string;
  keywords:string[]; 
  
  /** 
   * constructor(), is used to intialize jewelName, price, quantity, sizes, colors, isFemale, isMale, category, images, popularRank, itemCode, centerStone, weightOneDim, weightThreeDim, shape, clarity, metal, details, formalDescription and video to null values
   */
  constructor()
  {
    this._id = "";
    this.jewelName = "";
    this.price = 0.0;
    this.quantity = 0;
    this.sizes = [];
    this.colors = [];
    this.isFemale = false;
    this.isMale = false;
    this.category = "";
    this.images = [];
    this.popularRank = 0;
    this.purchaseRank = 0;
    this.itemCode = "";
    this.centerStone = "";
    this.weightOneDim = 0.0;
    this.weight3d = new Weight3D();
    this.shape = "";
    this.clarity = "";
    this.metal = "";
    this.detaillist = new DetailList();
    this.formalDescription = "";
    this.video = "";
    this.keywords = [];
  }   

  /**
   * convertUserJewel(), this is a function that will take this jewel and convert it into a UserJewel
   */
  public convertUserJewel()
  { 
    var userJewel = new UserJewel();
    userJewel.jewel = this;    
    
    return userJewel;
  }
  /**
   * compactJewel(), is used to make a Jewel without an id so we can add it to the database without generating an id for us
   *
   * @param imagesArray, is an array of images for the jewel
   * @param video, the url of the video for the jewel
   * @param jewelSizes: the array of sizes for the jewel
   */
  public compactJewel(imagesArray: Array<string>, video: string, jewelSizes: Array<JewelSize>)
  {
    var newJewel = {
      jewelName: this.jewelName,
      price: this.price,
      quantity: this.quantity,
      sizes: jewelSizes,
      colors: this.colors,
      isFemale: this.isFemale,
      isMale: this.isMale,
      category: this.category,
      images: imagesArray,
      popularRank: this.popularRank,
      purchaseRank: this.purchaseRank,
      itemCode: this.itemCode,
      centerStone: this.centerStone,
      weightOneDim: this.weightOneDim,
      weight3d: this.weight3d,
      shape: this.shape,
      clarity: this.clarity,
      metal: this.metal,
      detaillist: this.detaillist,
      formalDescription: this.formalDescription,
      video: video,
      keywords: this.keywords
    }

    return newJewel;
  }

  public convertJSON(jsonJewel: any)
  {
    this._id = jsonJewel._id;
    this.jewelName = jsonJewel.jewelName;
    this.price = jsonJewel.price;
    this.quantity = jsonJewel.quantity;
    this.sizes = [];
    for(var i = 0; i < jsonJewel.sizes.length; i++)
    {
      var aSize = new JewelSize();
      aSize.size = jsonJewel.sizes[i].size;
      aSize.quantity = jsonJewel.sizes[i].quantity;
      this.sizes.push(aSize);
    }
    this.colors = jsonJewel.colors;
    this.isFemale = jsonJewel.isFemale;
    this.isMale = jsonJewel.isMale;
    this.category = jsonJewel.category;
    this.images = jsonJewel.images;
    this.popularRank = jsonJewel.popularRank;
    this.purchaseRank = jsonJewel.purchaseRank;
    this.itemCode = jsonJewel.itemCode;
    this.centerStone = jsonJewel.centerStone;
    var weight3d = new Weight3D();
    weight3d.dimensionOne = jsonJewel.weight3d.dimensionOne;
    weight3d.dimensionTwo = jsonJewel.weight3d.dimensionTwo;
    weight3d.dimensionThree = jsonJewel.weight3d.dimensionThree;
    this.weight3d = weight3d;
    this.shape = jsonJewel.shape;
    this.clarity = jsonJewel.clarity;
    this.metal = jsonJewel.metal;
    var detaillist = new DetailList();
    detaillist.detailOne = jsonJewel.detaillist.detailOne;
    detaillist.detailTwo = jsonJewel.detaillist.detailTwo;
    detaillist.detailOne = jsonJewel.detaillist.detailOne;
    this.detaillist = detaillist;
    this.formalDescription = jsonJewel.formalDescription;
    this.video = jsonJewel.video;
    this.keywords = jsonJewel.keywords;
  }
   
}
