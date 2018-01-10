"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var data_service_1 = require('../data.service');
var jewel_1 = require('../models/jewel');
var URL = 'http://localhost:3000/upload';
var AddJewelryComponent = (function () {
    function AddJewelryComponent(_dataService, router) {
        this._dataService = _dataService;
        this.router = router;
        this.newJewel = new jewel_1.Jewel();
        this.threeDimOne = 0.00;
        this.threeDimTwo = 0.00;
        this.threeDimThree = 0.00;
        this.threeDimArray = [];
        this.detailsArray = [];
        this.detail1 = "";
        this.detail2 = "";
        this.detail3 = "";
    }
    AddJewelryComponent.prototype.onSubmit = function () {
        this.threeDimArray.push(this.threeDimOne);
        this.threeDimArray.push(this.threeDimTwo);
        this.threeDimArray.push(this.threeDimThree);
        this.detailsArray.push(this.detail1);
        this.detailsArray.push(this.detail2);
        this.detailsArray.push(this.detail3);
        var newJewel = {
            jewelName: this.newJewel.jewelName,
            price: this.newJewel.price,
            quantity: this.newJewel.quantity,
            sizes: [],
            colors: [],
            isFemale: this.newJewel.isFemale,
            isMale: this.newJewel.isMale,
            category: "N/A",
            images: [],
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
            video: "N/A"
        };
        this._dataService.addJewel(newJewel).subscribe();
        this.router.navigate(['viewJewel']);
    };
    AddJewelryComponent.prototype.upload = function () {
        this.makeFileRequest("http://localhost:3000/upload", [], this.filesToUpload).then(function (result) {
            console.log(result);
        }, function (error) {
            console.error(error);
        });
    };
    AddJewelryComponent.prototype.fileChangeEvent = function (fileInput) {
        this.filesToUpload = fileInput.target.files;
        console.log(fileInput.target.files[0].name);
    };
    AddJewelryComponent.prototype.makeFileRequest = function (url, params, files) {
        return new Promise(function (resolve, reject) {
            var formData = new FormData();
            var xhr = new XMLHttpRequest();
            for (var i = 0; i < files.length; i++) {
                formData.append("uploads[]", files[i], files[i].name);
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    }
                    else {
                        reject(xhr.response);
                    }
                }
            };
            xhr.open("POST", url, true);
            xhr.send(formData);
        });
    };
    AddJewelryComponent = __decorate([
        core_1.Component({
            selector: 'addJewel',
            templateUrl: './addjewel.component.html',
            styleUrls: ['./addjewel.component.css']
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService, router_1.Router])
    ], AddJewelryComponent);
    return AddJewelryComponent;
}());
exports.AddJewelryComponent = AddJewelryComponent;
//# sourceMappingURL=addjewel.component.js.map