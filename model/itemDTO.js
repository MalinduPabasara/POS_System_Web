function Item(id, name, price, quantity) {
    var __id = id;
    var __name = name;
    var __price = price;
    var __quantity = quantity;

    this.getItemID = function () {
        return __id;
    }
    this.setItemID = function (newID) {
        __id = newID;
    }

    this.getItemName = function () {
        return __name;
    }
    this.setItemName = function (newName) {
        __name = newName;
    }

    this.getItemPrice = function () {
        return __price;
    }
    this.setItemPrice = function (newPrice) {
        __price = newPrice;
    }

    this.getItemQuantity = function () {
        return __quantity;
    }
    this.setItemQuantity = function (newQuantity) {
        __quantity = newQuantity;
    }

}