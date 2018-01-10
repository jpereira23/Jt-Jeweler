"use strict";
var router_1 = require('@angular/router');
var home_component_1 = require('./home/home.component');
var admin_component_1 = require('./admin/admin.component');
var signup_component_1 = require('./signup/signup.component');
var signin_component_1 = require('./signin/signin.component');
var editjewel_component_1 = require('./editJewel/editjewel.component');
var addjewel_component_1 = require('./addJewel/addjewel.component');
var viewjewel_component_1 = require('./viewJewel/viewjewel.component');
var appRoutes = [
    {
        path: '',
        component: home_component_1.HomeComponent
    },
    {
        path: 'admin',
        component: admin_component_1.AdminComponent
    },
    {
        path: 'signup',
        component: signup_component_1.SignUpComponent
    },
    {
        path: 'signin',
        component: signin_component_1.SignInComponent
    },
    {
        path: 'addJewel',
        component: addjewel_component_1.AddJewelryComponent
    },
    {
        path: 'viewJewel',
        component: viewjewel_component_1.ViewJewelryComponent
    },
    {
        path: 'editJewel',
        component: editjewel_component_1.EditJewelryComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map