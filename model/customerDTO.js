function Customer(id,name,address,dob,contact,gender) {
    var __id=id;
    var __name=name;
    var __address=address;
    var __dob=dob;
    var __contact=contact;
    var __gender=gender;

    this.getCustomerID=function () {
        return __id;
    }
    this.setCustomerID=function (newID) {
        __id=newID;
    }

    this.getCustomerName=function () {
        return __name;
    }
    this.setCustomerName=function (newName) {
        __name=newName;
    }

    this.getCustomerAddress=function () {
        return __address;
    }
    this.setCustomerAddress=function (newAddress) {
        __address=newAddress;
    }

    this.getCustomerDOB=function () {
        return __dob;
    }
    this.setCustomerDOB=function (newDOB) {
        __dob=newDOB;
    }

    this.getCustomerContact=function () {
        return __contact;
    }
    this.setCustomerContact=function (newContact) {
        __contact=newContact;
    }

    this.getCustomerGender=function () {
        return __gender;
    }
    this.setCustomerGender=function (newGender) {
        __gender=newGender;
    }
}