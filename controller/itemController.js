$('#btnSaveItem').click(function () {

    $('#tblItem>tr').off('click');

    validItem();

    let iID = $('#txtitemID').val();
    let iName = $('#txtitemName').val();
    let iPrice = $('#txtprice').val();
    let iQuantity = $('#txtquantity').val();

    let item = saveItem(iID, iName, iPrice, iQuantity);
    if (item) clearItemText();

    // let tblrow = "<tr><td>" + iID + "</td><td>" + iName + "</td><td>" + iPrice + "</td><td>" + iQuantity + "</td></tr>";
    // $('#tblItem').append(tblrow);


    $('#tblItem>tr').click(function () {
        let id = $(this).children('td:eq(0)').text();
        let name = $(this).children('td:eq(1)').text();
        let price = $(this).children('td:eq(2)').text();
        let quantity = $(this).children('td:eq(3)').text();

        $('#txtitemID').val(id);
        $('#txtitemName').val(name);
        $('#txtprice').val(price);
        $('#txtquantity').val(quantity);

    });
    $('#txtitemID').focus();

});

$("#btnGetAllItem").click(function () {
    loadAllItems();
});

$("#btnitemUpdate").click(function () {
    let iID = $("#txtitemID").val();
    let iName = $("#txtitemName").val();
    let iPrice = $("#txtprice").val();
    let iQuantity = $("#txtquantity").val();

    let option = confirm(`Are you sure you want to update this Item ${iID}`);
    if (option) {
        let res = updateItem(iID, iName, iPrice, iQuantity);
        if (res) {
            alert("Item Updated");
        } else {
            alert("This action cannot be undone..!");
        }
    }
    loadAllItems();
    clearItemText();

});

$("#btnitemdelete").click(function () {
    let iID = $("#txtitemID").val();
    let option = confirm(`Are you sure you want to delete this Item ${iID}`);
    if (option) {
        let result = deleteItem(iID);
        if (result) {
            alert("Item Deleted");
        } else {
            alert("This action cannot be undone..!")
        }

    }
    loadAllItems();
    clearItemText();
});


$("#txtitemID").on('keyup', function (eObj) {
    if (eObj.key == "Enter") {
        let item = searchItem($(this).val());
        if (item != null) {
            $("#txtitemID").val(item.getItemID());
            $("#txtitemName").val(item.getItemName());
            $("#txtprice").val(item.getItemPrice());
            $("#txtquantity").val(item.getItemQuantity());

        } else {
            clearItemText();
        }
    }
});

function deleteItem(id) {
    let item = searchItem(id);
    if (item != null) {
        let indexNumber = itemDB.indexOf(item);
        itemDB.splice(indexNumber, 1);
        return true;
    } else {
        return false;
    }
}

function updateItem(id, name, price, quantity) {
    let item = searchItem(id);
    if (item != null) {
        item.setItemName(name)
        item.setItemPrice(price);
        item.setItemQuantity(quantity);

        return true;
    } else {
        return false;
    }
}

function ItemValid(itemValid){
    if (itemValid.getItemID()!=''&&
        itemValid.getItemName()!=''&&
        itemValid.getItemPrice()!==''&&
        itemValid.getItemQuantity()!=='') {
        return true;
    }else {
        return false;
    }
}

function saveItem(id, name, price, quantity) {
    let item = new Item(id, name, price, quantity);
    if (ItemValid(item)){

        itemDB.push(item);
    }else {
        alert("Empty fields...")
    }

    // load the table

    loadAllItems();
    return true;
}


function searchItem(id) {
    for (var i in itemDB) {
        if (itemDB[i].getItemID() == id) return itemDB[i];
    }
    return null;
}


// get All
function getAllItems() {
    return itemDB;
}


function loadAllItems() {
    let allItems = getAllItems();
    $('#tblItem').empty();
    for (var i in allItems) {
        let id = allItems[i].getItemID();
        let name = allItems[i].getItemName();
        let price = allItems[i].getItemPrice();
        let quantity = allItems[i].getItemQuantity();

        var row = `<tr><td>${id}</td><td>${name}</td><td>${price}</td><td>${quantity}</td></tr>`;
        $('#tblItem').append(row);
    }
}

function validItem() {
    var g = document.forms['ifrm']["g"].value;
    var h = document.forms['ifrm']["h"].value;
    var i = document.forms['ifrm']["i"].value;
    var j = document.forms['ifrm']["j"].value;
    if (g == null || g == "", h == null || h == "", i == null || i == "",j==null||j=="") {
        alert("Fields cannot be empty");
        return false;
    }
}

function clearItemText() {
    $('#txtitemID').val("");
    $('#txtitemName').val("");
    $('#txtprice').val("");
    $('#txtquantity').val("");

    $('#txtitemID').focus();
}


$('#btnNewItem').on('click', function () {
    clerItemText();
    $('#txtitemID').focus();

});

$('#btnClerItem').on('click', function () {
    clerItemText();
    $('#txtitemID').focus();

})

// =========RegEx=========================

let itemIDRegEx = /^(I00-)[0-9]{1,3}$/;

$('#txtitemID').on('keyup', function (event) {
    if (event.key == 'Enter') {
        $('#txtitemName').focus();
    }

    let inputID = $('#txtitemID').val();
    if (itemIDRegEx.test(inputID)) {
        $('#txtitemID').css('border', '2px solid green');
        $('#lblitemID').text('');
        $('#lblitemID').css({
            'color': 'green',
            'font-size': '12px'
        });
    } else {
        $('#txtitemID').css('border', '2px solid red');
        $('#lblitemID').text('Wrong data format (I00-001). Please input correct format.');
        $('#lblitemID').css({
            'color': 'red',
            'font-size': '12px'
        });


    }
});

let itemNameRegEx = /^[a-zA-Z ]+$/;

$('#txtitemName').on('keyup', function (event) {
    if (event.key == 'Enter') {
        $('#txtprice').focus();
    }
    let inputID = $('#txtitemName').val();
    if (itemNameRegEx.test(inputID)) {
        $('#txtitemName').css('border', '2px solid green');
        $('#lblitemName').text('');
        $('#lblitemName').css({
            'color': 'green',
            'font-size': '12px'
        });
    } else {
        $('#txtitemName').css('border', '2px solid red');
        $('#lblitemName').text('Type only letters.');
        $('#lblitemName').css({
            'color': 'red',
            'font-size': '12px'
        });

    }
});

let itemPriceRegEx = /^\d{1,6}(?:\.\d{0,2})?$/;
$('#txtprice').on('keyup', function (event) {
    if (event.key == 'Enter') {
        $('#txtquantity').focus();
    }
    let inputID = $('#txtprice').val();
    if (itemPriceRegEx.test(inputID)) {
        $('#txtprice').css('border', '2px solid green');
        $('#lblitemPrice').text('');
        $('#lblitemPrice').css({
            'color': 'green',
            'font-size': '12px'
        });
    } else {
        $('#txtprice').css('border', '2px solid red');
        $('#lblitemPrice').text('Wrong input. Type only numbers.');
        $('#lblitemPrice').css({
            'color': 'red',
            'font-size': '12px'
        });

    }
});


let itemQuantityRegEx = /^[0-9]{1,6}$/;
$('#txtquantity').on('keyup', function (event) {
    if (event.key == 'Enter') {
        // $('#txtquantity').focus();
    }
    let inputID = $('#txtquantity').val();
    if (itemQuantityRegEx.test(inputID)) {
        $('#txtquantity').css('border', '2px solid green');
        $('#lblitemquantity').text('');
        $('#lblitemquantity').css({
            'color': 'green',
            'font-size': '12px'
        });
    } else {
        $('#txtquantity').css('border', '2px solid red');
        $('#lblitemquantity').text('Wrong input.');
        $('#lblitemquantity').css({
            'color': 'red',
            'font-size': '12px'
        });

    }
});

//
// $('#txtitemName').on('keydown', function (event) {
//     if (event.key == 'Enter') {
//         $('#txtprice').focus();
//     }
// });
//
// $('#txtprice').on('keydown', function (event) {
//     if (event.key == 'Enter') {
//         $('#txtquantity').focus();
//     }
// });
//
// $('#txtquantity').on('keydown', function (event) {
//     if (event.key == 'Enter') {
//
//     }
// });

$('#txtitemID,#txtitemName,#txtprice,#txtquantity').on('keydown', function (event) {
    if (event.key == 'Tab') {
        event.preventDefault();

    }
});