export class Jewel {
  jewelName: string;
  price: number;
  quantity: number;
  sizes: number[];
  colors: number[];
  isFemale: Boolean;
  isMale: Boolean;
  category: string;
  images: string[];
  popularRank: number;
  itemCode: string;
  centerStone: string;
  weightOneDim: number;
  weightThreeDim: number[];
  shape: string;
  clarity: string;
  metal: string;
  details: string[];
  formalDescription: string;
  video: string;
  constructor()
  {
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
    this.itemCode = "";
    this.centerStone = "";
    this.weightOneDim = 0.0;
    this.weightThreeDim = [];
    this.shape = "";
    this.clarity = "";
    this.metal = "";
    this.details = [];
    this.formalDescription = "";
    this.video = "";
  }   
}
