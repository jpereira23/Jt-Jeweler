"use strict";
var User = (function () {
    function User() {
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.password = "";
        this.streetAddress = "";
        this.city = "";
        this.state = "";
        this.wishList = [];
        this.orders = [];
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map