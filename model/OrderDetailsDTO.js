function OrderDetails(id,name,price,qty,total) {
    var __id=id;
    var __name=name;
    var __price=price;
    var __qty=qty;
    var __total=total;

    this.getOrderDetailsID=function () {
        return __id;
    }
    this.setOrderDetailsID=function (newID) {
        __id=newID;
    }

    this.getOrderDetailsName=function () {
        return __name;
    }
    this.setOrderDetailsName=function (newName) {
        __name=newName;
    }

    this.getOrderDetailsPrice=function () {
        return __price;
    }
    this.setOrderDetailsPrice=function (newPrice) {
        __price=newPrice;
    }

    this.getOrderDetailsQTY=function () {
        return __qty;
    }
    this.setOrderDetailsQTY=function (newQTY) {
        __qty=newQTY;
    }

    this.getOrderDetailsTotal=function () {
        return __total;
    }
    this.setOrderDetailsTotal=function (newTotal) {
        __total=newTotal;
    }

}