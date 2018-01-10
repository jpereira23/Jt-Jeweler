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
var platform_browser_1 = require('@angular/platform-browser');
var core_1 = require('@angular/core');
var app_routing_1 = require('./app.routing');
var forms_1 = require('@angular/forms');
var angular2_image_upload_1 = require("angular2-image-upload");
var app_component_1 = require('./app.component');
var home_component_1 = require('./home/home.component');
var admin_component_1 = require('./admin/admin.component');
var signup_component_1 = require('./signup/signup.component');
var signin_component_1 = require('./signin/signin.component');
var addjewel_component_1 = require('./addJewel/addjewel.component');
var editjewel_component_1 = require('./editJewel/editjewel.component');
var viewjewel_component_1 = require('./viewJewel/viewjewel.component');
// Import the Http Module and our Data Service
var http_1 = require('@angular/http');
var data_service_1 = require('./data.service');
var authentication_service_1 = require('./authentication.service');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                home_component_1.HomeComponent,
                admin_component_1.AdminComponent,
                signup_component_1.SignUpComponent,
                signin_component_1.SignInComponent,
                addjewel_component_1.AddJewelryComponent,
                editjewel_component_1.EditJewelryComponent,
                viewjewel_component_1.ViewJewelryComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                app_routing_1.routing,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                angular2_image_upload_1.ImageUploadModule.forRoot()
            ],
            providers: [data_service_1.DataService,
                authentication_service_1.AuthenticationService
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map