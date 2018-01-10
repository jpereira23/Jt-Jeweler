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
// Import the DataService
var data_service_1 = require('../data.service');
var AdminComponent = (function () {
    // Create an instance of the DataService through dependency injection
    function AdminComponent(_dataService) {
        var _this = this;
        this._dataService = _dataService;
        console.log("Hello");
        // Access the Data Service's getUsers() method we defined
        this._dataService.getUsers()
            .subscribe(function (res) { return _this.users = res; });
    }
    AdminComponent.prototype.onUpdate = function () {
        console.log("updating");
        this._dataService.updateUser().subscribe();
    };
    AdminComponent.prototype.onDelete = function () {
        console.log("deleting");
        this._dataService.deleteUser().subscribe();
    };
    AdminComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'admin',
            templateUrl: './admin.component.html',
            styleUrls: ['./admin.component.css']
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService])
    ], AdminComponent);
    return AdminComponent;
}());
exports.AdminComponent = AdminComponent;
//# sourceMappingURL=admin.component.js.map