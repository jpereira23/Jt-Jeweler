import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { Http, Headers, RequestOptions } from '@angular/http';

import { DataService } from '../data.service';
import { Jewel } from '../models/jewel';

const URL = 'http://192.168.1.69:3000/upload';

@Component({
  selector: 'addJewel',
  templateUrl: './addjewel.component.html',
  styleUrls: ['./addjewel.component.css']
})  

export class AddJewelryComponent {
  newJewel = new Jewel();
  uploader: FileUploader = new FileUploader({url: URL});
  videoUploader: FileUploader = new FileUploader({url: URL});
  threeDimOne: number = 0.00;
  threeDimTwo: number = 0.00;
  threeDimThree: number = 0.00;
  threeDimArray: Array<number> = [];
  detailsArray: Array<string> = [];
  detail1: string="";
  detail2: string="";
  detail3: string="";  
  imagesArray: Array<string> = [];
  globalImages: Array<any> = [];
  videoUrl: string="";
  aSize: string = "";
  sizes: Array<any> = [];
  yourSizes: Array<string> = [];
  imageErrorMessage: string = "";
  imageError: boolean = false;
  videoErrorMessage: string = "";
  videoError: boolean = false;
  categoriesArray: Array<string> = ["Ring", "Earring", "Band", "Pendant", "Bracelet"];
  constructor(private _dataService: DataService, private router: Router, private _http: Http)
  {
    this._dataService.getSizes()
      .subscribe(res => this.sizes = res);
 } 

  public onSubmit()
  {
    this.threeDimArray.push(this.threeDimOne);
    this.threeDimArray.push(this.threeDimTwo);
    this.threeDimArray.push(this.threeDimThree);
    this.detailsArray.push(this.detail1);
    this.detailsArray.push(this.detail2);
    this.detailsArray.push(this.detail3);
    for(var i = 0; i < this.sizes.length; i++)
    {
      if(this.sizes[i].isUsed == true)
      {
        this.yourSizes.push(this.sizes[i]);
      }
    }    
    var newJewel = {
      jewelName: this.newJewel.jewelName,
      price: this.newJewel.price,
      quantity: this.newJewel.quantity,
      sizes: this.yourSizes,
      isFemale: this.newJewel.isFemale, 
      isMale: this.newJewel.isMale, 
      category: this.newJewel.category,
      images: this.imagesArray,
      popularRank: 0,
      itemCode: this.newJewel.itemCode,
      centerStone: this.newJewel.centerStone,
      weightOneDim: this.newJewel.weightOneDim,
      weightThreeDim: this.threeDimArray,
      shape: this.newJewel.shape,
      clarity: this.newJewel.clarity,
      metal: this.newJewel.metal,
      details: this.detailsArray,
      formalDescription: this.newJewel.formalDescription,
      video: this.videoUrl
    }
    this._dataService.addJewel(newJewel).subscribe();

    this.router.navigate(['viewJewel']);
  }

  public upload()
  {
    const formData: any = new FormData();
  }

  public uploading(event: any)
  {
    this.imagesArray.push("multimedia/" + event.target.files[0].name);
  }

  public uploadingVideo(event: any)
  {
    this.videoUrl = "multimedia/" + event.target.files[0].name;
  }

  public addingSize()
  {
    var size = {
      name: this.aSize,
      isUsed: false,
      quantity: 0 
    };
    this.sizes.push(size);
    this._dataService.addSize(size).subscribe();
  }

  public uploadRequest(item)
  {
    this._dataService.getImages()
      .subscribe(res => this.uploadRequestDelegate(item, res));
  }

  public uploadRequestDelegate(item, images)
  {

    var isCanceled: boolean = false;
    for(var i = 0; i < images.length; i++)
    {
      var name = "multimedia/" + item.file.name;

      if(name == images[i].name)
      {
        item.remove();
        isCanceled = true;
        this.imageErrorMessage = "You are trying to add a duplicate image."
        this.imageError = true;
      }
    }    
    if(isCanceled == false)
    {
      item.upload();
      var image = {
        name: "multimedia/" +item.file.name
      }
      this._dataService.addImage(image).subscribe();
      this.imageErrorMessage = "";
      this.imageError = false; 
    }
  }
  
  public videoUploadRequest(item)
  {
    this._dataService.getVideos()
      .subscribe(res => this.videoUploadRequestDelegate(item, res));
  } 

  public videoUploadRequestDelegate(item, videos)
  { 
    var isCanceled: boolean = false;
    for(var i = 0; i < videos.length; i++)
    {
      var name = "multimedia/" + item.file.name;

      if(name == videos[i].name)
      {
        item.remove();
        isCanceled = true;
        this.videoErrorMessage = "You are trying to add a duplicate video."
        this.videoError = true;
      }
    }    
    if(isCanceled == false)
    {
      item.upload();
      var video = {
        name: "multimedia/" +item.file.name
      }
      this._dataService.addVideo(video).subscribe();
      this.videoErrorMessage = "";
      this.videoError = false; 
    }
  }

}

