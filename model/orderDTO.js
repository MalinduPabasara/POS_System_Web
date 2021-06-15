function Order(code, name, price, qty, quantity) {
    var __code = code;
    var __name = name;
    var __price = price;
    var __qty = qty;
    var __quantity = quantity;

    this.getOrderCode = function () {
        return __code;
    }
    this.setOrderCode = function (newCode) {
        __code = newCode;
    }
    this.getOrderName = function () {
        return __name;
    }
    this.setOrderName = function (newName) {
        __name = newName;
    }
    this.getOrderPrice = function () {
        return __price;
    }
    this.setOrderPrice = function (newPrice) {
        __price = newPrice;
    }
    this.getOrderQTY = function () {
        return __qty;
    }
    this.setOrderQTY = function (newQTY) {
        __qty = newQTY;
    }
    this.getOrderQuantity = function () {
        return __quantity;
    }
    this.setOrderQuantity = function (newQuantity) {
        __quantity = newQuantity;
    }


}