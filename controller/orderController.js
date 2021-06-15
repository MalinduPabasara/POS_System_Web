$('#btnadditem').click(function () {

    $('#tblplaceorder>tr').off('click');

    let pCode = $('#txtsitemcode').val();
    let pName = $('#txtpiname').val();
    let pPrice = $('#txtpiprice').val();
    let pQty = $('#txtpipqty').val();
    let pQuantity = $('#txtpipquantity').val();


    let pltotal = $('#totllblval').val();

    // let tblrow = "<tr><td>" + pCode + "</td><td>" + pName + "</td><td>" + pPrice + "</td><td>" + pQty + "</td><td>" + pQuantity + "</td></tr>";
    // $('#tblplaceorder').append(tblrow);

    // isEmpty();

    let order = saveOrder(pCode, pName, pPrice, pQty, pQuantity);
    if (order) clerPlaceOrderText();



    let placeorder = saveOrderDetails(pCode, pName, pPrice, pQty, pltotal);

    $('#tblplaceorder>tr').click(function () {
        let pcode = $(this).children('td:eq(0)').text();
        let pname = $(this).children('td:eq(1)').text();
        let pprice = $(this).children('td:eq(2)').text();
        let pqty = $(this).children('td:eq(3)').text();
        let pquantity = $(this).children('td:eq(4)').text();


        $('#txtpicode').val(pcode);
        $('#txtpiname').val(pname);
        $('#txtpiprice').val(pprice);
        $('#txtpipqty').val(pqty);
        $('#txtpipquantity').val(pquantity);

    });
});

// seach from item to select item form

$("#txtsitemcode").on('keyup', function (eObj) {
    if (eObj.key == "Enter") {
        let item = searchItem($(this).val());
        if (item != null) {
            $("#txtsitemcode").val(item.getItemID());
            $("#txtpiname").val(item.getItemName());
            $("#txtpiprice").val(item.getItemPrice());
            $("#txtpipqty").val(item.getItemQuantity());

        } else {
            clerPlaceOrderText();
        }
    }
});

$("#txtIcustomerID").on('keyup', function (eObj) {
    if (eObj.key == "Enter") {
        let customer = searchCustomer($(this).val());
        if (customer != null) {
            $("#txtIcustomerID").val(customer.getCustomerID());
            $("#txtInvCustomerName").val(customer.getCustomerName());
            $("#txtInvaddress").val(customer.getCustomerAddress());


        } else {
            clearInvoiceText();
        }
    }
});

// seach item
function searchItem(id) {
    for (var i in itemDB) {
        if (itemDB[i].getItemID() == id) return itemDB[i];
    }
    return null;
}
// seach customer
function searchCustomer(id) {
    for (var i in customerDB) {
        if (customerDB[i].getCustomerID() == id) return customerDB[i];
    }
    return null;
}

function OrderValid(orderValid){
    if (orderValid.getOrderCode()!=''&&
        orderValid.getOrderName()!=''&&
        orderValid.getOrderPrice()!==''&&
        orderValid.getOrderQTY()!==''&&
        orderValid.getOrderQuantity()!==''
    ) {
        return true;
    }else {
        return false;
    }


}

function saveOrder(pcode, pname, pprice, pqty, pquantity) {
    let order = new Order(pcode, pname, pprice, pqty, pquantity);

    if (OrderValid(order)){

        orderDB.push(order);
    }else {
        alert("Empty fields...")
    }

    // load the table
    loadAllOrders();
    return true;
}

function saveOrderDetails(pcode, pname, pprice, pqty, total) {
    let order = new OrderDetails(pcode, pname, pprice, pqty, total);
    placeOrderDB.push(order);

    // load the table
    // loadAllOrders();
    loadAllPlaceOrders
    return true;
}

function clearInvoiceText() {
    $('#txtIcustomerID').val("");
    $('#txtInvCustomerName').val("");
    $('#txtInvaddress').val("");

}


function clerPlaceOrderText() {
    $('#txtpicode').val("");
    $('#txtpiname').val("");
    $('#txtpiprice').val("");
    $('#txtpipqty').val("");
    $('#txtpipquantity').val("");

    $('#tblplaceorder').focus();
}

function getAllOrders() {
    return orderDB;
}

function getAllOrderDetails() {
    return placeOrderDB;
}

function loadAllOrders() {
    let allOrders = getAllOrders();
    $('#tblplaceorder').empty();
    for (var i in allOrders) {
        let id = allOrders[i].getOrderCode();
        let name = allOrders[i].getOrderName();
        let price = allOrders[i].getOrderPrice();
        let qty = allOrders[i].getOrderQTY();
        // let quantity = allOrders[i].getOrderQuantity();


        let total= price*qty;

        $('#totllblval').text(total);
        $('#totllblval').css({
            'color': '#c23854',
            'font-size':'24px'
        })
        $('#stotllblval').text(total);
        $('#stotllblval').css({
            'color': '#ec1117',
            'font-size':'24px'
        })


        var row = `<tr><td>${id}</td><td>${name}</td><td>${price}</td><td>${qty}</td><td>${total}</td></tr>`;
        $('#tblplaceorder').append(row);




    }

}

function loadAllPlaceOrders() {
    let allOrders = getAllOrders();
    $('#tblplaceorder').empty();
    for (var i in allOrders) {
        let id = allOrders[i].getOrderDetailsID();
        let name = allOrders[i].getOrderDetailsName();
        let price = allOrders[i].getOrderDetailsPrice();
        let qty = allOrders[i].getOrderDetailsQTY();
        let total = allOrders[i].getOrderDetailsTotal();



        var row = `<tr><td>${id}</td><td>${name}</td><td>${price}</td><td>${qty}</td><td>${total}</td></tr>`;
        $('#tblplaceorder').append(row);

        $('#totllblval').text(total);
        $('#totllblval').css({
            'color': '#c23854',
            'font-size':'24px'
        })
        $('#stotllblval').text(total);
        $('#stotllblval').css({
            'color': '#ec1117',
            'font-size':'24px'
        })

    }

}





// ==========================RegEx====================================

//
// function isEmpty(){
//     if (document.form.a==""){
//         alert("empty");
//     }
//     return;
// }

// function isEmpty(){
//     if (document.forms['frm'].a.value===""){
//         alert("empty");
//         return false;
//     }
//     return true;
// }


let itemCodeRegEx = /^(I00-)[0-9]{1,3}$/;
$('#txtsitemcode').on('keyup', function (event) {
    if (event.key == 'Enter') {
        $('#txtpiname').focus();
    }

    let inputID = $('#txtsitemcode').val();
    if (itemCodeRegEx.test(inputID)) {
        $('#txtsitemcode').css('border', '2px solid green');
        $('#lblsitemcode').text('');
        $('#lblsitemcode').css({
            'color': 'green',
            'font-size': '12px'
        });
    } else {
        $('#txtsitemcode').css('border', '2px solid red');
        $('#lblsitemcode').text('Wrong data format (I00-001). Please input correct format.');
        $('#lblsitemcode').css({
            'color': 'red',
            'font-size': '12px'
        });

    }
});


let itemSelectNameRegEx = /^[a-zA-Z ]+$/;
$('#txtpiname').on('keyup', function (event) {
    if (event.key == 'Enter') {
        $('#txtpiprice').focus();

    }/*else if (event.key == 'w'){
        event.preventDefault();
    }*/


    let inputID = $('#txtpiname').val();
    if (itemSelectNameRegEx.test(inputID)) {
        $('#txtpiname').css('border', '2px solid green');
        $('#lblpiname').text('');
        $('#lblpiname').css({
            'color': 'green',
            'font-size': '12px'
        });
    } else {
        $('#txtpiname').css('border', '2px solid red');
        $('#lblpiname').text('Type only letters');
        $('#lblpiname').css({
            'color': 'red',
            'font-size': '12px'
        });

    }
});

let itemSelectPriceRegEx = /^\d{1,6}(?:\.\d{0,2})?$/;
$('#txtpiprice').on('keyup', function (event) {
    if (event.key == 'Enter') {
        $('#txtpipqty').focus();
    }
    let inputID = $('#txtpiprice').val();
    if (itemSelectPriceRegEx.test(inputID)) {
        $('#txtpiprice').css('border', '2px solid green');
        $('#lblpiprice').text('');
        $('#lblpiprice').css({
            'color': 'green',
            'font-size': '12px'
        });
    } else {
        $('#txtpiprice').css('border', '2px solid red');
        $('#lblpiprice').text('Wrong input. Type only numbers.');
        $('#lblpiprice').css({
            'color': 'red',
            'font-size': '12px'
        });

    }
});


let itemSelectQtyRegEx = /^[0-9]{1,6}$/;

$('#txtpipqty').on('keyup', function (event) {
    if (event.key == 'Enter') {
        $('#txtpipquantity').focus();
    }
    let inputID = $('#txtpipqty').val();
    if (itemSelectQtyRegEx.test(inputID)) {
        $('#txtpipqty').css('border', '2px solid green');
        $('#lblpiqty').text('');
        $('#lblpiqty').css({
            'color': 'green',
            'font-size': '12px'
        });
    } else {
        $('#txtpipqty').css('border', '2px solid red');
        $('#lblpiqty').text('Wrong input. Type only numbers');
        $('#lblpiqty').css({
            'color': 'red',
            'font-size': '12px'
        });

    }
});


let itemSelectQuantityRegEx = /^[0-9]{1,6}$/;

$('#txtpipquantity').on('keyup', function (event) {
    if (event.key == 'Enter') {
        // $('#txtpipquantity').focus();
    }
    let inputID = $('#txtpipquantity').val();
    if (itemSelectQuantityRegEx.test(inputID)) {
        $('#txtpipquantity').css('border', '2px solid green');
        $('#lblpiquantity').text('');
        $('#lblpiquantity').css({
            'color': 'green',
            'font-size': '12px'
        });
    } else {
        $('#txtpipquantity').css('border', '2px solid red');
        $('#lblpiquantity').text('Wrong input. Type only numbers');
        $('#lblpiquantity').css({
            'color': 'red',
            'font-size': '12px'
        });

    }
});


let invOrderIDRegEx = /^(O00-)[0-9]{1,3}$/;
$('#txtIorderID').on('keyup', function (event) {
    if (event.key == 'Enter') {
        $('#txtIcustomerID').focus();
    }

    let inputID = $('#txtIorderID').val();
    if (invOrderIDRegEx.test(inputID)) {
        $('#txtIorderID').css('border', '2px solid green');
        $('#lblinvoiceOrderID').text('');
        $('#lblinvoiceOrderID').css({
            'color': 'green',
            'font-size': '12px'
        });
    } else {
        $('#txtIorderID').css('border', '2px solid red');
        $('#lblinvoiceOrderID').text('Wrong data format (O00-001). Please input correct format.');
        $('#lblinvoiceOrderID').css({
            'color': 'red',
            'font-size': '12px'
        });

    }
});

let invCusIDRegEx = /^(C00-)[0-9]{1,3}$/;
$('#txtIcustomerID').on('keyup', function (event) {
    if (event.key == 'Enter') {
        $('#txtInvCustomerName').focus();
    }

    let inputID = $('#txtIcustomerID').val();
    if (invCusIDRegEx.test(inputID)) {
        $('#txtIcustomerID').css('border', '2px solid green');
        $('#lblIcustomerID').text('');
        $('#lblIcustomerID').css({
            'color': 'green',
            'font-size': '12px'
        });
    } else {
        $('#txtIcustomerID').css('border', '2px solid red');
        $('#lblIcustomerID').text('Wrong data format (C00-001). Please input correct format.');
        $('#lblIcustomerID').css({
            'color': 'red',
            'font-size': '12px'
        });

    }
});

let invCusNameRegEx = /^[a-zA-Z ]+$/;

$('#txtInvCustomerName').on('keyup', function (event) {
    if (event.key == 'Enter') {
        $('#txtInvdate').focus();
    }
    let inputID = $('#txtInvCustomerName').val();
    if (invCusNameRegEx.test(inputID)) {
        $('#txtInvCustomerName').css('border', '2px solid green');
        $('#lblinvoceName').text('');
        $('#lblinvoceName').css({
            'color': 'green',
            'font-size': '12px'
        });
    } else {
        $('#txtInvCustomerName').css('border', '2px solid red');
        $('#lblinvoceName').text('Type only letters');
        $('#lblinvoceName').css({
            'color': 'red',
            'font-size': '12px'
        });

    }
});


let invDateRegEx = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
$('#txtInvdate').on('keyup', function (event) {
    if (event.key == 'Enter') {
        $('#txtIcustomerID1').focus();
    }
    let inputID = $('#txtInvdate').val();
    if (invDateRegEx.test(inputID)) {
        $('#txtInvdate').css('border', '2px solid green');
        $('#lblinvoicedate').text('');
        $('#lblinvoicedate').css({
            'color': 'green',
            'font-size': '12px'
        });
    } else {
        $('#txtInvdate').css('border', '2px solid red');
        $('#lblinvoicedate').text('Wrong input. Enter valid date (10/10/1990)');
        $('#lblinvoicedate').css({
            'color': 'red',
            'font-size': '12px'
        });

    }
});

let invCusID1RegEx = /^(C00-)[0-9]{1,3}$/;
$('#txtIcustomerID1').on('keyup', function (event) {
    if (event.key == 'Enter') {
        $('#txtInvsalary').focus();
    }

    let inputID = $('#txtIcustomerID1').val();
    if (invCusID1RegEx.test(inputID)) {
        $('#txtIcustomerID1').css('border', '2px solid green');
        $('#lblinvoicecusID1').text('');
        $('#lblinvoicecusID1').css({
            'color': 'green',
            'font-size': '12px'
        });
    } else {
        $('#txtIcustomerID1').css('border', '2px solid red');
        $('#lblinvoicecusID1').text('Wrong data format (C00-001). Please input correct format.');
        $('#lblinvoicecusID1').css({
            'color': 'red',
            'font-size': '12px'
        });

    }
});

let invSalaryRegEx = /^\d{1,6}(?:\.\d{0,2})?$/;
$('#txtInvsalary').on('keyup', function (event) {
    if (event.key == 'Enter') {
        $('#txtInvaddress').focus();
    }
    let inputID = $('#txtInvsalary').val();
    if (invSalaryRegEx.test(inputID)) {
        $('#txtInvsalary').css('border', '2px solid green');
        $('#lblinvoiceSalary').text('');
        $('#lblinvoiceSalary').css({
            'color': 'green',
            'font-size': '12px'
        });
    } else {
        $('#txtInvsalary').css('border', '2px solid red');
        $('#lblinvoiceSalary').text('Wrong input. Type only numbers.');
        $('#lblinvoiceSalary').css({
            'color': 'red',
            'font-size': '12px'
        });

    }
});


let invAddressRegEx = /^[0-9/]{1,4}[A-z ]*$/;
$('#txtInvaddress').on('keyup', function (event) {
    if (event.key == 'Enter') {
        // $('#txtdob').focus();
    }
    let inputID = $('#txtInvaddress').val();
    if (invAddressRegEx.test(inputID)) {
        $('#txtInvaddress').css('border', '2px solid green');
        $('#lblinvoceAddress').text('');
        $('#lblinvoceAddress').css({
            'color': 'green',
            'font-size': '12px'
        });
    } else {
        $('#txtInvaddress').css('border', '2px solid red');
        $('#lblinvoceAddress').text('Wrong input. Enter valid address');
        $('#lblinvoceAddress').css({
            'color': 'red',
            'font-size': '12px'
        });

    }
});

let invoiceCashRegEx = /^\d{1,6}(?:\.\d{0,2})?$/;
$('#txtcash').on('keyup', function (event) {
    if (event.key == 'Enter') {
        $('#txtdiscount').focus();
    }
    let inputID = $('#txtcash').val();
    if (invoiceCashRegEx.test(inputID)) {
        $('#txtcash').css('border', '2px solid green');
        $('#lblCash').text('');
        $('#lblCash').css({
            'color': 'green',
            'font-size': '12px'
        });
    } else {
        $('#txtcash').css('border', '2px solid red');
        $('#lblCash').text('Wrong input. Type only numbers.');
        $('#lblCash').css({
            'color': 'red',
            'font-size': '12px'
        });

    }
});


let invoiceDiscountRegEx = /^\d{1,6}(?:\.\d{0,2})?$/;
$('#txtdiscount').on('keyup', function (event) {
    if (event.key == 'Enter') {
        $('#txtbalance').focus();
    }
    let inputID = $('#txtdiscount').val();
    if (invoiceDiscountRegEx.test(inputID)) {
        $('#txtdiscount').css('border', '2px solid green');
        $('#lblDiscount').text('');
        $('#lblDiscount').css({
            'color': 'green',
            'font-size': '12px'
        });
    } else {
        $('#txtdiscount').css('border', '2px solid red');
        $('#lblDiscount').text('Wrong input. Type only numbers.');
        $('#lblDiscount').css({
            'color': 'red',
            'font-size': '12px'
        });

    }
});

let invoiceBalanceRegEx = /^\d{1,6}(?:\.\d{0,2})?$/;
$('#txtbalance').on('keyup', function (event) {
    if (event.key == 'Enter') {
        // $('#txtbalance').focus();
    }
    let inputID = $('#txtbalance').val();
    if (invoiceBalanceRegEx.test(inputID)) {
        $('#txtbalance').css('border', '2px solid green');
        $('#lblBalance').text('');
        $('#lblBalance').css({
            'color': 'green',
            'font-size': '12px'
        });
    } else {
        $('#txtbalance').css('border', '2px solid red');
        $('#lblBalance').text('Wrong input. Type only numbers.');
        $('#lblBalance').css({
            'color': 'red',
            'font-size': '12px'
        });

    }
});

// $('#txtpiname').on('keydown',function (event) {
//     if (event.key=='Enter') {
//         $('#txtpiprice').focus();
//     }
// });
//
// $('#txtpiprice').on('keydown',function (event) {
//     if (event.key=='Enter') {
//         $('#txtpipqty').focus();
//     }
// });
//
// $('#txtpipqty').on('keydown',function (event) {
//     if (event.key=='Enter') {
//         $('#txtpipquantity').focus();
//     }
// });

$('#txtpicode,#txtpiname,#txtpiprice,#txtpipqty,#txtpipquantity').on('click', function (event) {
    if (event.key == 'Tab') {
        event.preventDefault();

    }
});