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
var user_1 = require('../models/user');
var authentication_service_1 = require('../authentication.service');
var SignInComponent = (function () {
    function SignInComponent(_dataService, router, authenticationService) {
        var _this = this;
        this._dataService = _dataService;
        this.router = router;
        this.authenticationService = authenticationService;
        this.signedIn = new user_1.User();
        console.log("hmmm....");
        this._dataService.getUsers().subscribe(function (res) { return _this.users = res; });
    }
    SignInComponent.prototype.ngOnInit = function () {
        this.authenticationService.logout();
    };
    SignInComponent.prototype.signIn = function () {
        var _this = this;
        this.authenticationService.login(this.signedIn.email.toLowerCase(), this.signedIn.password)
            .subscribe(function (data) {
            if (_this.signedIn.email.toLowerCase() == 'admin@gmail.com') {
                _this.router.navigate(['admin']);
            }
            else {
                _this.router.navigate(['']);
            }
        }, function (error) {
        });
    };
    SignInComponent = __decorate([
        core_1.Component({
            selector: 'signin',
            templateUrl: './signin.component.html',
            styleUrls: ['./signin.component.css']
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService, router_1.Router, authentication_service_1.AuthenticationService])
    ], SignInComponent);
    return SignInComponent;
}());
exports.SignInComponent = SignInComponent;
//# sourceMappingURL=signin.component.js.map