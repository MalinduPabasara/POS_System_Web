$('#btnSaveCustomer').click(function () {
    // $('#tblCustomer>tr').off('dblclick');
    $('#tblCustomer>tr').off('click');
    $('#txtcustomerID').focus();

    // validCustomer();

    let cusID = $('#txtcustomerID').val();
    let cusName = $('#txtcustomerName').val();
    let cusAddress = $('#txtaddress').val();
    let cusDOB = $('#txtdob').val();
    let cusContact = $('#txtcontactNo').val();
    let cusGender = $('#txtGender').val();

    // validCustomer();



    let customer = saveCustomer(cusID, cusName, cusAddress, cusDOB, cusContact, cusGender);
    if (customer) clearCustomerText();


    $('#tblCustomer>tr').click(function () {
        let id = $($(this).children().get(0)).text();
        let name = $($(this).children().get(1)).text();
        let address = $($(this).children().get(2)).text();
        let dob = $($(this).children().get(3)).text();
        let contact = $($(this).children().get(4)).text();
        let gender = $($(this).children().get(5)).text();

        $('#txtcustomerID').val(id);
        $('#txtcustomerName').val(name);
        $('#txtaddress').val(address);
        $('#txtdob').val(dob);
        $('#txtcontactNo').val(contact);
        $('#txtGender').val(gender);
    });

    $('#txtcustomerID').focus();
});


$("#btnGetAllCustomers").click(function () {
    loadAllCustomer();
});

$("#btnUpdate").click(function () {
    let cusID = $("#txtcustomerID").val();
    let cusName = $("#txtcustomerName").val();
    let cusAddress = $("#txtaddress").val();
    let cusdob = $("#txtdob").val();
    let cusContact = $("#txtcontactNo").val();
    let cusGender = $("#txtGender").val();

    let option = confirm(`Are you sure you want to update this Customer ${cusID}`);
    if (option) {
        let res = updateCustomer(cusID, cusName, cusAddress, cusdob, cusContact, cusGender);
        if (res) {
            alert("Customer Updated");
        } else {
            alert("This action cannot be undone..!");
        }
    }
    loadAllCustomer();
    clearCustomerText();

});

$("#btncusDelete").click(function () {
    let cusID = $("#txtcustomerID").val();
    let option = confirm(`Are you sure you want to delete this Customer ${cusID}`);
    if (option) {
        let result = deleteCustomer(cusID);
        if (result) {
            alert("Customer Deleted");
        } else {
            alert("This action cannot be undone..!")
        }

    }
    loadAllCustomer();
    clearCustomerText();
});

$("#txtcustomerID").on('keyup', function (eObj) {
    if (eObj.key == "Enter") {
        let customer = searchCustomer($(this).val());
        if (customer != null) {
            $("#txtcustomerID").val(customer.getCustomerID());
            $("#txtcustomerName").val(customer.getCustomerName());
            $("#txtaddress").val(customer.getCustomerAddress());
            $("#txtdob").val(customer.getCustomerDOB());
            $("#txtcontactNo").val(customer.getCustomerContact());
            $("#txtGender").val(customer.getCustomerGender());
        } else {
            clearCustomerText();
        }
    }
});

function deleteCustomer(id) {
    let customer = searchCustomer(id);
    if (customer != null) {
        let indexNumber = customerDB.indexOf(customer);
        customerDB.splice(indexNumber, 1);
        return true;
    } else {
        return false;
    }
}

function updateCustomer(id, name, address, dob, contact, gender) {
    let customer = searchCustomer(id);
    if (customer != null) {
        customer.setCustomerName(name)
        customer.setCustomerAddress(address)
        customer.setCustomerDOB(dob);
        customer.setCustomerContact(contact);
        customer.setCustomerGender(gender);
        return true;
    } else {
        return false;
    }
}

// function isEmpty() {
//     if (document.forms['frm'].a.value === "") {
//         alert("empty");
//         return false;
//     }
//     return true;
// }

function validCustomer() {
    var a = document.forms['frm']["a"].value;
    var b = document.forms['frm']["b"].value;
    var c = document.forms['frm']["c"].value;
    var d = document.forms['frm']["d"].value;
    var e = document.forms['frm']["e"].value;
    var f = document.forms['frm']["f"].value;
    if (a == null || a == "", b == null || b == "", c == null || c == "", d == null || d == "", e == null || e == "", f == null || f == "") {
        alert("Fields cannot be empty");
        return false;
    }
}


function CusValid(customerValid){
    if (customerValid.getCustomerID()!=''&&
    customerValid.getCustomerName()!=''&&
    customerValid.getCustomerAddress()!==''&&
    customerValid.getCustomerDOB()!==''&&
    customerValid.getCustomerContact()!==''&&
    customerValid.getCustomerGender()!=='') {
        return true;
    }else {
        return false;
    }


}



// let tblrow = "<tr><td>" + cusID + "</td><td>" + cusName + "</td><td>" + cusAddress + "</td><td>" + cusDOB + "</td><td>" + cusContact + "</td><td>" + cusGender + "</td></tr>";
// $('#tblCustomer').append(tblrow);
//
// clerCustomerText();
//
// $('#tblCustomer>tr').click(function () {
//     let id = $(this).children('td:eq(0)').text();
//     let name = $(this).children('td:eq(1)').text();
//     let address = $(this).children('td:eq(2)').text();
//     let dob = $(this).children('td:eq(3)').text();
//     let contact = $(this).children('td:eq(4)').text();
//     let gender = $(this).children('td:eq(5)').text();
//
//     $('#txtcustomerID').val(id);
//     $('#txtcustomerName').val(name);
//     $('#txtaddress').val(address);
//     $('#txtdob').val(dob);
//     $('#txtcontactNo').val(contact);
//     $('#txtGender').val(gender);
//
// });

// $('#tblCustomer>tr').on('dblclick', function () {
//    $(this).remove();
// });

// $('#btncusDelete').on('click', function () {
//
//     // let row=$('#tblCustomer>tr');
//     $(this.$('#tblCustomer>tr')).remove();
//
// });


$('#btnClerCustomer').on('click', function () {
    clearCustomerText();
    $('#txtcustomerID').focus();
});

$('#btnNewCustomer').on('click', function () {
    clearCustomerText();
    $('#txtcustomerID').focus();
})


// saveCustomer
function saveCustomer(id, name, address, dob, contact, gender) {
    let customer = new Customer(id, name, address, dob, contact, gender);
    if (CusValid(customer)){

        customerDB.push(customer);
    }else {
        alert("Empty fields...")
    }



    // load the table
    loadAllCustomer();
    return true;
}

function searchCustomer(id) {
    for (var i in customerDB) {
        if (customerDB[i].getCustomerID() == id) return customerDB[i];
    }
    return null;
}

// get All
function getAllCustomers() {
    return customerDB;
}


// Load All Customers
function loadAllCustomer() {
    let allCustomers = getAllCustomers();
    $('#tblCustomer').empty();
    for (var i in allCustomers) {
        let id = allCustomers[i].getCustomerID();
        let name = allCustomers[i].getCustomerName();
        let address = allCustomers[i].getCustomerAddress();
        let dob = allCustomers[i].getCustomerDOB();
        let contact = allCustomers[i].getCustomerContact();
        let gender = allCustomers[i].getCustomerGender();

        var row = `<tr><td>${id}</td><td>${name}</td><td>${address}</td><td>${dob}</td><td>${contact}</td><td>${gender}</td></tr>`;
        $('#tblCustomer').append(row);
    }
}

function clearCustomerText() {

    $('#txtcustomerID').val("");
    $('#txtcustomerName').val("");
    $('#txtaddress').val("");
    $('#txtdob').val("");
    $('#txtcontactNo').val("");
    $('#txtGender').val("");

    $('#txtcustomerID').focus();

}


// ==============RegEx==============


let cusIDRegEx = /^(C00-)[0-9]{1,3}$/;

$('#txtcustomerID').on('keyup', function (event) {
    if (event.key == 'Enter') {
        $('#txtcustomerName').focus();
    }
    let inputID = $('#txtcustomerID').val();
    if (cusIDRegEx.test(inputID)) {
        $('#txtcustomerID').css('border', '2px solid green');
        $('#lblcusID').text('');
        $('#lblcusID').css({
            'color': 'green',
            'font-size': '12px'
        });
    } else {
        $('#txtcustomerID').css('border', '2px solid red');
        $('#lblcusID').text('Wrong data format (C00-001). Please input correct format.');
        $('#lblcusID').css({
            'color': 'red',
            'font-size': '12px'
        });


    }
});


let cusNameRegEx = /^[a-zA-Z ]+$/;

$('#txtcustomerName').on('keyup', function (event) {
    if (event.key == 'Enter') {
        $('#txtaddress').focus();
    }
    let inputID = $('#txtcustomerName').val();
    if (cusNameRegEx.test(inputID)) {
        $('#txtcustomerName').css('border', '2px solid green');
        $('#lblcustomerName').text('');
        $('#lblcustomerName').css({
            'color': 'green',
            'font-size': '12px'
        });
    } else {
        $('#txtcustomerName').css('border', '2px solid red');
        $('#lblcustomerName').text('Type only letters');
        $('#lblcustomerName').css({
            'color': 'red',
            'font-size': '12px'
        });

    }
});

let cusAddressRegEx = /^[0-9/]{1,4}[A-z ]*$/;
$('#txtaddress').on('keyup', function (event) {
    if (event.key == 'Enter') {
        $('#txtdob').focus();
    }
    let inputID = $('#txtaddress').val();
    if (cusAddressRegEx.test(inputID)) {
        $('#txtaddress').css('border', '2px solid green');
        $('#lblcustomerAddress').text('');
        $('#lblcustomerAddress').css({
            'color': 'green',
            'font-size': '12px'
        });
    } else {
        $('#txtaddress').css('border', '2px solid red');
        $('#lblcustomerAddress').text('Wrong input. Enter valid address');
        $('#lblcustomerAddress').css({
            'color': 'red',
            'font-size': '12px'
        });

    }
});


let cusDOBRegEx = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
$('#txtdob').on('keyup', function (event) {
    if (event.key == 'Enter') {
        $('#txtcontactNo').focus();
    }
    let inputID = $('#txtdob').val();
    if (cusDOBRegEx.test(inputID)) {
        $('#txtdob').css('border', '2px solid green');
        $('#lbldob').text('');
        $('#lbldob').css({
            'color': 'green',
            'font-size': '12px'
        });
    } else {
        $('#txtdob').css('border', '2px solid red');
        $('#lbldob').text('Wrong input. Enter valid birthday (10/10/1990)');
        $('#lbldob').css({
            'color': 'red',
            'font-size': '12px'
        });

    }
});

let cusContactRegEx = /^(0)[0-9]{9}$/;
$('#txtcontactNo').on('keyup', function (event) {
    if (event.key == 'Enter') {
        $('#txtGender').focus();
    }
    let inputID = $('#txtcontactNo').val();
    if (cusContactRegEx.test(inputID)) {
        $('#txtcontactNo').css('border', '2px solid green');
        $('#lblcontact').text('');
        $('#lblcontact').css({
            'color': 'green',
            'font-size': '12px'
        });
    } else {
        $('#txtcontactNo').css('border', '2px solid red');
        $('#lblcontact').text('Please enter 10 digit number');
        $('#lblcontact').css({
            'color': 'red',
            'font-size': '12px'
        });

    }
});


let cusGenderRegEx = /^male$|^female$|^Male$|^Female$$/;
$('#txtGender').on('keyup', function (event) {
    if (event.key == 'Enter') {
        /*$('#txtGender').focus();*/
    }
    let inputID = $('#txtGender').val();
    if (cusGenderRegEx.test(inputID)) {
        $('#txtGender').css('border', '2px solid green');
        $('#lblgender').text('');
        $('#lblgender').css({
            'color': 'green',
            'font-size': '12px'
        });
    } else {
        $('#txtGender').css('border', '2px solid red');
        $('#lblgender').text('Enter Male or Female');
        $('#lblgender').css({
            'color': 'red',
            'font-size': '12px'
        });

    }
});

// function allowonlyNumbers(event){
//     if (event.key.length===1 && /\D/.test(event.key)){
//         event.preventDefault();
//     }
// }

// let cusNameRegEx = /^[0-9]{1,4}(([\-\/][0-9]{1,4})|(\/[ABCDFGHJKLMNPRSTV]{1,2}))*$/; for address
// let cusNameRegEx = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;  /*dob*/
// let cusNameRegEx = /^\d{1,6}(?:\.\d{0,2})?$/; /* for salary*/
//
// $('#txtcustomerName').on('keydown', function (event) {
//     if (event.key == 'Enter') {
//         $('#txtaddress').focus();
//     }
// });
//
// $('#txtaddress').on('keydown', function (event) {
//     if (event.key == 'Enter') {
//         $('#txtdob').focus();
//     }
// });
//
// $('#txtdob').on('keydown', function (event) {
//     if (event.key == 'Enter') {
//         $('#txtcontactNo').focus();
//     }/*else if (event.key.length===1 && /\D/.test(event.key)){
//
//         event.preventDefault();
//     }*/
// });
//
// $('#txtcontactNo').on('keydown', function (event) {
//     if (event.key == 'Enter') {
//         $('#txtGender').focus();
//
//     }/*else if (event.key.length===1 && /\D/.test(event.key)){
//
//         event.preventDefault();
//     }*/
// });
//
// $('#txtGender').on('keydown', function (event) {
//     if (event.key == 'Enter') {
//
//
//     }
// });

$('#txtcustomerID,#txtcustomerName,#txtaddress,#txtdob,#txtcontactNo,#txtGender').on('keydown', function (event) {
    if (event.key == 'Tab') {
        event.preventDefault();

    }
});


// ===========================================================================================================================


// $('#tblCustomer>tr').click(function () {
//     let id = $($(this).children().get(0)).text();
//     let name = $($(this).children().get(1)).text();
//     let address = $($(this).children().get(2)).text();
//     let dob = $($(this).children().get(3)).text();
//     let contact = $($(this).children().get(4)).text();
//     let gender = $($(this).children().get(5)).text();
//
// });

// template literels
// let tblrow2=`<tr><td>$(cusID)</td><td>$(cusName) </td><td>$(cusAddress) </td><td>$(cusDOB)</td><td>$(cusContact)  </td><td>$(cusGender)</td></tr>`;


// $('#tblCustomer>tr').click(function () {
//     let id = $($(this).children().get(0)).text();
//     let name = $($(this).children().get(1)).text();
//     let address = $($(this).children().get(2)).text();
//     let dob = $($(this).children().get(3)).text();
//     let contact = $($(this).children().get(4)).text();
//     let gender = $($(this).children().get(5)).text();
//
//     $('#txtcustomerID').val(id);
//     $('#txtcustomerName').val(name);
//     $('#txtaddress').val(address);
//     $('#txtdob').val(dob);
//     $('#txtcontactNo').val(contact);
//     $('#txtGender').val(gender);
//
//
// });

//
// $('#tblCustomer>tr').click(function () {
//     let id = $($(this).children().get(0)).text();
//     let name = $($(this).children().get(1)).text();
//     let address = $($(this).children().get(2)).text();
//     let dob = $($(this).children().get(3)).text();
//     let contact = $($(this).children().get(4)).text();
//     let gender = $($(this).children().get(5)).text();
//
//     $('#txtcustomerID').val(id);
//     $('#txtcustomerName').val(name);
//     $('#txtaddress').val(address);
//     $('#txtdob').val(dob);
//     $('#txtcontactNo').val(contact);
//     $('#txtGender').val(gender);
//
//     // $('#tblCustomer>tr').click(function (){
//     //     let id= $(this).children('td:eq(0)').text();
//     //     let name= $(this).children('td:eq(1)').text();
//     //     let address= $(this).children('td:eq(2)').text();
//     //     let dob= $(this).children('td:eq(3)').text();
//     //     let contact= $(this).children('td:eq(4)').text();
//     //     let gender= $(this).children('td:eq(5)').text();
//     //
//     // });
//
// });