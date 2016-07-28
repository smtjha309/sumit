/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var dataArr = ['Test0', 'Test1', 'Test2', 'Test3', 'Test4', 'Test5', 'Test7', 'Test8'];

$(document).ready(function () {
 document.addEventListener("online", function(){
      alert('on')
 }, false);
	document.addEventListener("offline", this.onOffline, false);
    console.log("ready function worked ");
    var html = '';
     onOnline= function(){
        
     }
    $.each(dataArr, function (index, data) {
        html += '<label><input type="checkbox" name="vehicle" value="' + data + '">' + data + '</label>';
    });
    $('.checkbox-cnt').html(html);
    $('input[type="checkbox"]').checkboxradio({
        defaults: true
    });

    $(document).off("click", '.next-page');
    $(document).on("click", '.next-page', function () {
        console.log("first page  button worked");
        var html = '';
        $('.checkbox-cnt input[type="checkbox"]').each(function () {
            var el = $(this);

            if (el.attr('checked')) {
                console.log("checked");
                html += '<p>' + el.val() + '</p>';
            }
        });
        $('.check-res').html(html);
        var next = $.mobile.activePage.next('#bar');
        alert(123)
        var stringData1 = localStorage.getItem('discount');
        var dataget = JSON.parse(stringData1);
        console.log('dataget', dataget, stringData1)
        if (!stringData1)
        {
            $.ajax({
                type: 'POST',
                url: 'http://45.114.246.221/sreiSalesKit/api/v2/getAssets/getAllAssets?token=206216057901430ce566b711a3057369&pageNo=0&perPageRecord=10',
                data: {'apikey': ''},
                cache: false,
                dataType: 'json',
                success: function (data) {
                    $('.offer-display').empty();
                    console.log('sssssssss', data.assetObj);
                    for (var i = 0; i < data.assetObj.length; i++) {
                        var discount = data.assetObj[i].assetname;
                        var discount1 = data.assetObj[i].asset_cost;
                        var offerDisplayDiv = '<div class="offer-display offer-display-single pos-rel animated bounceInUp offerElement" id="offerElementb' + i + '">' + discount + discount1 + '<div class="clearfix"></div></div>';
                        
                        $('#genericOfferByRestaurantList').append(offerDisplayDiv);


                    }
                    var stringData = JSON.stringify(data.assetObj);
                    console.log('stringData ', stringData)
                    localStorage.setItem('discount', stringData);
                    console.log('localStorage ', localStorage.getItem('discount'))
                }

            });
        } else {
            $('.offer-display').empty();
            for (var i = 0; i < dataget.length; i++) {
                var discount = dataget[i].assetname;
                var discount1 = dataget[i].asset_cost;
                var offerDisplayDiv = '<div class="offer-display offer-display-single pos-rel animated bounceInUp offerElement" id="offerElementb' + i + '">' + discount + discount1 + '<div class="clearfix"></div></div>';
               
                $('#genericOfferByRestaurantList').append(offerDisplayDiv);


            }
        }
        $.mobile.changePage(next, {
            transition: 'slide'
        });
    });
});