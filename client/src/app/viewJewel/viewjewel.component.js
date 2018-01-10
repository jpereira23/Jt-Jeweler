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
var data_service_1 = require('../data.service');
var router_1 = require('@angular/router');
var ViewJewelryComponent = (function () {
    function ViewJewelryComponent(_dataService, router) {
        var _this = this;
        this._dataService = _dataService;
        this.router = router;
        this._dataService.getJewelry()
            .subscribe(function (res) { return _this.jewelry = res; });
    }
    ViewJewelryComponent.prototype.editPage = function (index) {
        var navigationExtras = {
            queryParams: {
                "itemCode": this.jewelry[index].itemCode
            }
        };
        this.router.navigate(['editJewel'], navigationExtras);
    };
    ViewJewelryComponent.prototype.deletePage = function (index) {
        console.log("first part " + this.jewelry[index].itemCode);
        this._dataService.deleteJewel(this.jewelry[index]).subscribe();
        location.reload();
    };
    ViewJewelryComponent = __decorate([
        core_1.Component({
            selector: 'viewJewel',
            templateUrl: './viewjewel.component.html',
            styleUrls: ['./viewjewel.component.css'],
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService, router_1.Router])
    ], ViewJewelryComponent);
    return ViewJewelryComponent;
}());
exports.ViewJewelryComponent = ViewJewelryComponent;
//# sourceMappingURL=viewjewel.component.js.map