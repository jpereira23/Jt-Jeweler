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
// Import the DataService
var data_service_1 = require('../data.service');
var HomeComponent = (function () {
    // Create an instance of the DataService through dependency injection
    function HomeComponent(_dataService, route) {
        var _this = this;
        this._dataService = _dataService;
        this.route = route;
        this.signedIn = false;
        /*
        if(this.route.params)
        {
        this.route.queryParams.subscribe(params => {
            this.firstName = params["firstName"];
          });
        }
        */
        this.signedInUser = JSON.parse(localStorage.getItem('currentUser'));
        if (this.signedInUser != null) {
            this.signedIn = true;
            console.log('signed in user is ' + this.signedInUser.firstName);
        }
        else {
            console.log("its null");
        }
        // Access the Data Service's getUsers() method we defined
        this._dataService.getUsers()
            .subscribe(function (res) { return _this.users = res; });
    }
    /*
    delegateForUsers(users)
    {
      this.users = users;
  
      var i;
      for(i = 0; i < this.users.length; i++)
      {
        if(this.firstName != null && this.users[i].firstName == this.firstName)
        {
          this.signedIn = true;
          this.signedInUser = this.users[i];
  
        }
      }
    }
    */
    HomeComponent.prototype.onUpdate = function () {
        console.log("updating");
        this._dataService.updateUser().subscribe();
    };
    HomeComponent.prototype.onDelete = function () {
        console.log("deleting");
        this._dataService.deleteUser().subscribe();
    };
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.css']
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService, router_1.ActivatedRoute])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map