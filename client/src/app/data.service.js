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
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var DataService = (function () {
    function DataService(_http) {
        this._http = _http;
    }
    DataService.prototype.getUsers = function () {
        var _this = this;
        return this._http.get("/api/users")
            .map(function (result) { return _this.result = result.json().data; });
    };
    DataService.prototype.addUser = function (user) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post("api/adduser", JSON.stringify(user), { headers: headers }).map(function (res) { return res.json(); });
    };
    DataService.prototype.updateUser = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var user = { firstName: "Eduardo", lastName: "Yuja", password: "lll", streetAddress: "1234 ABC St.", city: "Tracy", state: "Ca", wishList: [100002, 10003], order: [4, 5], email: "jpereira1@mail.csuchico.edu" };
        return this._http.put("api/user/" + "5a45883ae48e9a1be8d652db", JSON.stringify(user), { headers: headers }).map(function (res) { return res.json(); });
    };
    DataService.prototype.deleteUser = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.delete("api/user/" + "5a45883ae48e9a1be8d652db", { headers: headers }).map(function (res) { return res.json(); });
    };
    DataService.prototype.addJewel = function (jewel) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post("api/addjewelry", JSON.stringify(jewel), { headers: headers }).map(function (res) { return res.json(); });
    };
    DataService.prototype.getJewelry = function () {
        var _this = this;
        return this._http.get("/api/jewelry")
            .map(function (result) { return _this.result = result.json().data; });
    };
    DataService.prototype.deleteJewel = function (jewel) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        console.log("the second part is " + jewel.itemCode);
        return this._http.delete("api/jewel/" + jewel._id, { headers: headers }).map(function (res) { return res.json(); });
    };
    DataService.prototype.editJewel = function (jewel) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        console.log(jewel.itemCode);
        return this._http.put("api/jewel/" + jewel._id, JSON.stringify(jewel), { headers: headers }).map(function (res) { return res.json(); });
    };
    DataService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DataService);
    return DataService;
}());
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map