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
var EditJewelryComponent = (function () {
    function EditJewelryComponent(_dataService, route, router) {
        var _this = this;
        this._dataService = _dataService;
        this.route = route;
        this.router = router;
        this.loading = false;
        this.route.queryParams.subscribe(function (params) {
            _this.itemCode = params["itemCode"];
        });
        this._dataService.getJewelry()
            .subscribe(function (res) { return _this.delegateForJewelry(res); });
    }
    EditJewelryComponent.prototype.delegateForJewelry = function (jewelry) {
        this.jewelry = jewelry;
        var i;
        for (i = 0; i < this.jewelry.length; i++) {
            if (this.itemCode != null && this.jewelry[i].itemCode == this.itemCode) {
                this.loading = true;
                this.jewelryToBeEdited = this.jewelry[i];
            }
        }
    };
    EditJewelryComponent.prototype.onSubmit = function () {
        console.log(this.jewelryToBeEdited.itemCode);
        var editJewel = {
            _id: this.jewelryToBeEdited._id,
            jewelName: this.jewelryToBeEdited.jewelName,
            price: this.jewelryToBeEdited.price,
            quantity: this.jewelryToBeEdited.quantity,
            sizes: this.jewelryToBeEdited.sizes,
            colors: this.jewelryToBeEdited.colors,
            isFemale: this.jewelryToBeEdited.isFemale,
            isMale: this.jewelryToBeEdited.isMale,
            category: this.jewelryToBeEdited.category,
            images: this.jewelryToBeEdited.images,
            popularRank: this.jewelryToBeEdited.popularRank,
            itemCode: this.jewelryToBeEdited.itemCode,
            centerStone: this.jewelryToBeEdited.centerStone,
            weightOneDim: this.jewelryToBeEdited.weightOneDim,
            weightThreeDim: this.jewelryToBeEdited.weightThreeDim,
            shape: this.jewelryToBeEdited.shape,
            clarity: this.jewelryToBeEdited.clarity,
            metal: this.jewelryToBeEdited.metal,
            details: this.jewelryToBeEdited.details,
            formalDescription: this.jewelryToBeEdited.formalDescription,
            video: this.jewelryToBeEdited.video
        };
        this._dataService.editJewel(editJewel).subscribe();
        this.router.navigate(['viewJewel']);
    };
    EditJewelryComponent = __decorate([
        core_1.Component({
            selector: 'editJewel',
            templateUrl: './editjewel.component.html',
            styleUrls: ['./editjewel.component.css']
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService, router_1.ActivatedRoute, router_1.Router])
    ], EditJewelryComponent);
    return EditJewelryComponent;
}());
exports.EditJewelryComponent = EditJewelryComponent;
//# sourceMappingURL=editjewel.component.js.map