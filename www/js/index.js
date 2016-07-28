/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
//var dataArr = []
//
////var dataArr = ['Test0', 'Test1', 'Test2', 'Test3', 'Test4', 'Test5', 'Test7', 'Test8'];
//document.addEventListener("online", function () {
//        alert('on')
//    }, false);
//$(document).ready(function () {
//    
//   // var networkState = navigator.connection.type;
//console.log('networkState ',networkState)
//   
//  
//
//
//    var stringData1 = localStorage.getItem('discount');
//    var dataget = JSON.parse(stringData1);
//    console.log('dataget', dataget, stringData1)
//    if (!stringData1 && networkState)
//    {
//        $.ajax({
//            type: 'POST',
//            url: 'http://45.114.246.221/sreiSalesKit/api/v2/getAssets/getAllAssets?token=206216057901430ce566b711a3057369&pageNo=0&perPageRecord=10',
//            data: {'apikey': ''},
//            cache: false,
//            dataType: 'json',
//            success: function (data) {
//                $('.offer-display').empty();
//                console.log('sssssssss', data.assetObj);
//                for (var i = 0; i < data.assetObj.length; i++) {
//                    var discount = data.assetObj[i].assetname;
//                    var discount1 = data.assetObj[i].asset_cost;
//                    var offerDisplayDiv = '<div class="offer-display offer-display-single pos-rel animated bounceInUp offerElement" id="offerElementb' + i + '">' + discount + discount1 + '<div class="clearfix"></div></div>';
//                    dataArr.push(discount)
//
//                    //$('#genericOfferByRestaurantList').append(offerDisplayDiv);
//
//
//                }
//                var stringData = JSON.stringify(data.assetObj);
//                console.log('stringData ', stringData)
//                localStorage.setItem('discount', stringData);
//                console.log('localStorage ', localStorage.getItem('discount'))
//            }
//
//        });
//    } else if(networkState=="none"){
//        $('.offer-display').empty();
//        for (var i = 0; i < dataget.length; i++) {
//            var discount = dataget[i].assetname;
//            var discount1 = dataget[i].asset_cost;
//            var offerDisplayDiv = '<div class="offer-display offer-display-single pos-rel animated bounceInUp offerElement" id="offerElementb' + i + '">' + discount + discount1 + '<div class="clearfix"></div></div>';
//
//            dataArr.push(discount)
//
//
//        }
//    }
//    
//    document.addEventListener("offline", this.onOffline, false);
//    console.log("ready function worked ");
//    var html = '';
//    onOnline = function () {
//
//    }
//    $.each(dataArr, function (index, data) {
//        html += '<label><input type="checkbox" name="vehicle" value="' + data + '">' + data + '</label>';
//    });
//    $('.checkbox-cnt').html(html);
//    $('input[type="checkbox"]').checkboxradio({
//        defaults: true
//    });
//
//    $(document).off("click", '.next-page');
//    $(document).on("click", '.next-page', function () {
//        console.log("first page  button worked");
//        var html = '';
//        $('.checkbox-cnt input[type="checkbox"]').each(function () {
//            var el = $(this);
//
//            if (el.attr('checked')) {
//                console.log("checked");
//                html += '<p>' + el.val() + '</p>';
//            }
//        });
//        $('.check-res').html(html);
//        var next = $.mobile.activePage.next('#bar');
//        alert(123)
//
//        $.mobile.changePage(next, {
//            transition: 'slide'
//        });
//    });
//});


/***
 * On Reday function for document
 * 
 */
$(document).ready(function () {

    /*****
     * Click function for show list button in main page
     */

    $(document).off('click', '#go_to_next');
    $(document).on('click', '#go_to_next', function () {
        /***
         * Call load list function
         */
        loadSecondPage();

    });

    /***
     * Check if loading with list page from url
     */
    if (window.location.hash == '#list') {
        loadSecondPage();
    }


});


function showList(data) {
    var html = '';
    $.each(data, function (index, object) {
       
        html += '<li class="list-item"><div class="list-item-inner"><img height=50 width=50 src="'+object.image+'"></img>' 
                + object.assetname + '<div></li>';
    });
    if (html.length > 0) {
        html = '<ul>' + html + '</ul>';
    } else {
        html = '<span>Data Not Found</span>';
    }

    $('.list-container').html(html);
}

function loadSecondPage() {
    /***
     * check if system is online or not through js api
     */
    if (navigator.onLine) {
        var localData = localStorage.getItem('arrData');
        /**
         * Check if data is in local storage
         * then list will show from localstoarge data
         */
        if (localData) {
            var res = $.parseJSON(localData);
            /***
             * Call Show list funtion for show list
             */
            showList(res);
            //return false;
        } else {
            /***\
             * If data are not stored in local storage then data ill fetch from server
             */
            $.ajax({
                type: 'POST',
                url: 'http://45.114.246.221/sreiSalesKit/api/v2/getAssets/getAllAssets?token=206216057901430ce566b711a3057369&pageNo=0&perPageRecord=10',
                data: {'apikey': ''},
                cache: false,
                dataType: 'json',
                success: function (data) {


                    if (data.responseMessage == "Success" && data.assetObj.length > 0) {
                        /***
                         * Call Show list funtion for show list
                         */
                        showList(data.assetObj);
                        /**
                         * Save data in local storage
                         */
                        localStorage.setItem('arrData', JSON.stringify(data.assetObj))

                    } else {
                        $('.list-container').html('<span>Data Not Found</span>');
                    }

                }
            })
        }


    } else {
        var localData = localStorage.getItem('arrData');
        if (localData) {
            var res = $.parseJSON(localData);
            /***
             * Call Show list funtion for show list
             */
            showList(res);
            //return false;
        } else {
            $('.list-container').html('<span>Data Not Found</span>');
        }


    }
}