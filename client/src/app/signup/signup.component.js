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
var authentication_service_1 = require('../authentication.service');
var user_1 = require('../models/user');
var SignUpComponent = (function () {
    function SignUpComponent(_dataService, authenticationService, router) {
        var _this = this;
        this._dataService = _dataService;
        this.authenticationService = authenticationService;
        this.router = router;
        this.newUser = new user_1.User();
        this.emailError = false;
        this.firstNameError = false;
        this.lastNameError = false;
        this.passwordError = false;
        this._dataService.getUsers()
            .subscribe(function (res) { return _this.users = res; });
        this.authenticationService.logout();
    }
    SignUpComponent.prototype.onSubmit = function () {
        if (this.checkDuplicateEmail(this.newUser.email) == false) {
            var newUser = {
                firstName: this.newUser.firstName,
                lastName: this.newUser.lastName,
                password: this.newUser.password,
                email: this.newUser.email.toLowerCase(),
                streetAddress: this.newUser.streetAddress,
                city: this.newUser.city,
                state: this.newUser.state,
                wishList: this.newUser.wishList,
                orders: this.newUser.orders,
            };
            this.emailError = false;
            this.firstNameError = false;
            this._dataService.addUser(newUser).subscribe();
            this.router.navigate(['signin']);
        }
    };
    /**
     * function to check for duplicate emails and returns true if there is a duplicate and false otherwise
     * @param email, takes in an email to check against
     */
    SignUpComponent.prototype.checkDuplicateEmail = function (email) {
        var i;
        for (i = 0; i < this.users.length; i++) {
            if (this.users[i].email == email) {
                this.emailError = true;
                this.emailMessage = "This email is already being used.";
                return true;
            }
        }
        return false;
    };
    /**
     * function to check if a firstName exists
     */
    SignUpComponent.prototype.checkForFirstName = function () {
        if (typeof this.newUser.firstName != 'undefined' && this.newUser.firstName) {
            this.firstNameError = false;
        }
        else {
            this.firstNameError = true;
            this.firstNameMessage = "First Name is required.";
        }
    };
    /**
     * function to check if a lastName exists
     */
    SignUpComponent.prototype.checkForLastName = function () {
        if (typeof this.newUser.lastName != 'undefined' && this.newUser.lastName) {
            this.lastNameError = false;
        }
        else {
            this.lastNameError = true;
            this.lastNameMessage = "Last Name is required.";
        }
    };
    /**
     * function to check if a password exists
     */
    SignUpComponent.prototype.checkForPassword = function () {
        if (typeof this.newUser.password != 'undefined' && this.newUser.password) {
            this.passwordError = false;
        }
        else {
            this.passwordError = true;
            this.passwordMessage = "Password is required.";
        }
    };
    /**
      * function to check if a email exists
      */
    SignUpComponent.prototype.checkForEmail = function () {
        if (typeof this.newUser.email != 'undefined' && this.newUser.email) {
            this.emailError = false;
        }
        else {
            this.emailError = true;
            this.emailMessage = "Email is required.";
        }
    };
    SignUpComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'signup',
            templateUrl: './signup.component.html',
            styleUrls: ['./signup.component.css']
        }), 
        __metadata('design:paramtypes', [data_service_1.DataService, authentication_service_1.AuthenticationService, router_1.Router])
    ], SignUpComponent);
    return SignUpComponent;
}());
exports.SignUpComponent = SignUpComponent;
//# sourceMappingURL=signup.component.js.map