
var cusContent = document.getElementById('customerContent');
var itemContent = document.getElementById('itemContent');
var homeContent = document.getElementById('homeContent');
var pOrderContent = document.getElementById('pordercontent');

    cusContent.style.display='none';
    itemContent.style.display='none';
    pOrderContent.style.display='none';


var btnCustomer=document.getElementById('maincuslink');

btnCustomer.addEventListener('click', function () {
    cusContent.style.display='block';
    itemContent.style.display='none';
    homeContent.style.display='none';
    pOrderContent.style.display='none';

    $('#txtcustomerID').focus();
});

var btnItem=document.getElementById('mainitemlink');

btnItem.addEventListener('click', function () {
    itemContent.style.display='block';
    cusContent.style.display='none';
    homeContent.style.display='none';
    pOrderContent.style.display='none';

    $('#txtitemID').focus();
});

var btnHome=document.getElementById('homelink');

btnHome.addEventListener('click', function () {
    itemContent.style.display='none';
    cusContent.style.display='none';
    pOrderContent.style.display='none';
    homeContent.style.display='block';


});

var btnpOrder=document.getElementById('mainplaceorderlink');

btnpOrder.addEventListener('click', function () {
    itemContent.style.display='none';
    cusContent.style.display='none';
    homeContent.style.display='none';
    pOrderContent.style.display='block';

    $('#txtorderID').focus();
});
