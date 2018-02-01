import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';

import { DataService } from '../data.service';
import { Jewel } from '../models/jewel';
import { Size } from '../models/size';
import { AdminSize } from '../models/adminSize';
import { JewelSize } from '../models/jewelSize';
import { Weight3D } from '../models/weight3d';
import { DetailList } from '../models/detaillist';

const URL = 'http://172.124.232.210:443/upload';

@Component({
  selector: 'addJewel',
  templateUrl: './addjewel.component.html',
  styleUrls: ['./addjewel.component.css']
})  

export class AddJewelryComponent {
  newJewel = new Jewel();
  uploader: FileUploader = new FileUploader({url: URL});
  videoUploader: FileUploader = new FileUploader({url: URL});
  weight3d = new Weight3D();
  detailList = new DetailList();
  imagesArray: Array<string> = [];
  videoUrl: string="";
  aSize: string = "";
  sizes: Array<AdminSize> = [];
  jewelSizes: Array<JewelSize> = [];
  imageErrorMessage: string = "";
  imageError: boolean = false;
  videoErrorMessage: string = "";
  videoError: boolean = false;
  categoriesArray: Array<string> = ["Ring", "Earring", "Band", "Pendant", "Bracelet"];

  /** 
   * constructor(), is used to intitalize _dataService and router, and also get us the sizes we need for adding the jewel
   *
   * @param _dataService, represents a DataService so we can use it to add Jewels and Sizes to the database 
   * @param router, represents a router so we can route to the ViewJewel page after we are doing adding the jewel
   */ 
  constructor(private _dataService: DataService, private router: Router)
  {
    this._dataService.getSizes()
      .subscribe(res => this.getSizeOnDelegate(res));
  } 

  /** 
   * getSizeOnDelegate(sizesArray: Array<Size>), a method used as a delgate to delegate the sizes from the database to the sizes: Array<AdminSize> variable
   *
   * @param sizesArray, sizesArray represents the response from the DataService when we try and get sizes from the database
   */ 
  private getSizeOnDelegate(sizesArray: Array<Size>)
  {
    for(var i = 0; i < sizesArray.length; i++)
    {
      this.sizes.push(sizesArray[i].adminSize());
    }
  }

  /** 
   *  onSubmit(), this function is used to submit a piece of jewelry to the database after the form has been complete
   */
  public onSubmit()
  {
    for(var i = 0; i < this.sizes.length; i++)
    {
      if(this.sizes[i].isUsed == true)
      {
        this.jewelSizes.push(this.sizes[i].jewelSize());
      }
    }    
    
    this._dataService.addJewel(this.newJewel.compactJewel(this.imagesArray, this.videoUrl, this.jewelSizes)).subscribe();

    this.router.navigate(['viewJewel']);
  }

  /**
   * uploading(event: any), is used to append an array to the imagesArray so we can communicate with the newJewel
   * 
   * @param event, is a type of Event that will capture the true value of the thing being uploaded
   */
  public uploading(event: any)
  {
    this.imagesArray.push("multimedia/" + event.target.files[0].name);
  }

  /** 
   * uploadingVideo(event: any), is used to give the videoUrl the actualy video url that was uploaded
   *
   * @param even, is a type of Event that will capture the true value of the thing being uploaded
   */
  public uploadingVideo(event: any)
  {
    this.videoUrl = "multimedia/" + event.target.files[0].name;
  }

  /** 
   * addingSize(), is a function that will take the size and its quantity and add it to the array
   * 
   */
  public addingSize()
  {
    var size = new Size();
    size.size = +this.aSize;

    this.sizes.push(size.adminSize());
    this._dataService.addSize(size.compactSize()).subscribe();
  }

  /**
   * uploadRequest(item: any), is function that handles an upload of an image
   *
   * @param item, is the item being uploaded
   */
  public uploadRequest(item: any)
  {
    this._dataService.getImages()
      .subscribe(res => this.uploadRequestDelegate(item, res));
  }

  /**
   * uploadRequestDelegate(item, images), is a function that proceses the uploaded item and makes sure it hasnt been uploaded already
   *
   * @param item, is the item being uploaded
   * @param images, are the images we are checking against
   */
  public uploadRequestDelegate(item: any, images: Array<any>)
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

  /**
   * videoUploadRequest(item: any), used to upload a video
   * 
   * @param item, the item to be uploaded
   */ 
  public videoUploadRequest(item: any)
  {
    this._dataService.getVideos()
      .subscribe(res => this.videoUploadRequestDelegate(item, res));
  } 

  /**
   * videoUploadRequestDelegate(item, videos), used to check the uploaded video to prevent duplicates
   *
   * @param item, is the item we are uploading
   * @param videos, is the array of videos we are checking against
   */
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

