function sentRes(url,data,method,fn){
    data=data||null;
    if(data==null){
        var content=require('querystring').stringify(data);
    }else{
        var content = JSON.stringify(data); //json format
    }

    var parse_u=require('url').parse(url,true);
    var isHttp=parse_u.protocol=='http:';
    var options={
        host:parse_u.hostname,
        port:parse_u.port||(isHttp?80:443),
        path:parse_u.path,
        method:method,
        headers:{
            'Content-Type':'application/json',
            'Content-Length':Buffer.byteLength(content,"utf8"),
            'Trackingmore-Api-Key':'YOUR API KEY'
        }
    };
    var req = require(isHttp?'http':'https').request(options,function(res){
        var _data='';
        res.on('data', function(chunk){
            _data += chunk;
        });
        res.on('end', function(){
            fn!=undefined && fn(_data);
        });
    });
    req.write(content);
    req.end();
}
//###  测试开始 #####

//1 列出所有运输商
// var postData = null;
// var url      = 'http://api.trackingmore.com/v2/carriers/';
// sentRes(url,postData,"GET",function(data){
//     console.log(data);
// });

//2 识别一个运输商
// var postData = {"tracking_number":"ES953934335AU"};
// var url      = 'http://api.trackingmore.com/v2/carriers/detect';
// sentRes(url,postData,"post",function(data){
//     console.log(data);
// });

//3 创建一个跟踪项目
var postData = {"tracking_number": "ES953934335AU","carrier_code":"australia-post","title":"4PX page","customer_name":"trackingmore user","customer_email":"service@trackingmore.com","order_id":"#123","order_create_time":"2018/09/08 16:51","destination_code":"US","tracking_ship_date":"20180908","tracking_postal_code":"12201","lang":"en","logistics_channel":"API TEST"};
var url      = 'https://api.trackingmore.com/v2/trackings/post';
sentRes(url,postData,"post",function(data){
    console.log(data);
});

//4 获取多个运单号的物流信息
// var postData = null;
// var url      = 'http://api.trackingmore.com/v2/trackings/get?page=1&limit=100&created_at_min=&created_at_max=&update_time_min=&update_time_max=&order_created_time_min=&order_created_time_max=&numbers=ES953934335AU&orders=&lang=cn';
// sentRes(url,postData,"GET",function(data){
//     console.log(data);
// });

//5 列出单个运单号物流信息
// var postData = null;
// var url      = 'http://api.trackingmore.com/v2/trackings/australia-post/ES953934335AU/en';
// sentRes(url,postData,"GET",function(data){
//     console.log(data);
// });

//6 修改单个运单号附加信息（put）
// var postData = {"title": "4PX page","customer_name":"trackingmore user","customer_email":"service@trackingmore.com","order_id":"#123","logistics_channel":"API TEST"};
// var url       = 'http://api.trackingmore.com/v2/trackings/australia-post/ES953934335AU';
// sentRes(url,postData,"PUT",function(data){
//     console.log(data);
// });

//7 删除单个订单号
// var postData = null;
// var url      = 'http://api.trackingmore.com/v2/trackings/australia-post/ES953934335AU';
// sentRes(url,postData,"DELETE",function(data){
//     console.log(data);
// });

//8 查询用户剩余额度
// var postData = null;
// var url      = 'http://api.trackingmore.com/v2/trackings/getuserinfo';
// sentRes(url,postData,"GET",function(data){
//     console.log(data);
// });

//9 查看不同状态快递数量
// var postData = null;
// var url      = 'http://api.trackingmore.com/v2/trackings/getstatusnumber?created_at_min=&created_at_max=&order_created_time_min=&order_created_time_max=';
// sentRes(url,postData,"GET",function(data){
//     console.log(data);
// });

//10 设置单号不再更新
// var postData = [
//     {"tracking_number":"ES953934335AU","carrier_code":"australia-post"},
//     {"tracking_number":"LZ448865302CN","carrier_code":"china-ems"}
//     ];
// var url      = 'http://api.trackingmore.com/v2/trackings/notupdate';
// sentRes(url,postData,"POST",function(data){
//     console.log(data);
// });

//11 查询收货地址是否偏远
// var postData = [{"country":"CN","postcode":"400422"},{"country":"CN","postcode":"412000"];
// var url      = 'http://api.trackingmore.com/v2/trackings/remote';
// sentRes(url,postData,"POST",function(data){
//     console.log(data);
// });

//12 Get cost time iterm results
// var postData = [{"carrier_code":"australia-post","destination":"US","original":"CN"},{"carrier_code":"china-ems","destination":"US","original":"CN"}];
// var url      = 'http://api.trackingmore.com/v2/trackings/costtime';
// sentRes(url,postData,"POST",function(data){
//     console.log(data);
// });

//13 创建多个跟踪项目
// var postData = [
//     {"tracking_number": "ES953934335AU","carrier_code":"australia-post","title":"4PX page","customer_name":"trackingmore user","customer_email":"service@trackingmore.com","order_id":"#123","order_create_time":"2018/09/08 16:51","destination_code":"US","tracking_ship_date":"20180908","tracking_postal_code":"12201","lang":"en","logistics_channel":"API TEST"},
//     {"tracking_number": "LZ448865302CN","carrier_code":"china-ems","title":"4PX page","customer_name":"trackingmore user","customer_email":"service@trackingmore.com","order_id":"#123","order_create_time":"2018/09/08 16:51","destination_code":"US","tracking_ship_date":"20180908","tracking_postal_code":"12201","lang":"en","logistics_channel":"API TEST"}
//     ];
// var url      ='http://api.trackingmore.com/v2/trackings/batch';
// sentRes(url,postData,"POST",function(data){
//     console.log(data);
// });

//14 修改多个运单号附加信息
// var postData = [
//     {"tracking_number":"ES953934335AU","carrier_code":"australia-post","title":"4PX page","customer_name":"trackingmore user","customer_email":"service@trackingmore.com","order_id":"#123","destination_code":"US","status":"7","logistics_channel":"API TEST"},
//     {"tracking_number":"LZ448865302CN","carrier_code":"china-ems","title":"4PX page","customer_name":"trackingmore user","customer_email":"service@trackingmore.com","order_id":"#123","destination_code":"US","status":"7","logistics_channel":"API TEST"}
//     ];
// var url      = 'http://api.trackingmore.com/v2/trackings/updatemore';
// sentRes(url,postData,"POST",function(data){
//     console.log(data);
// });

//15 删除多个单号
// var postData = [
//     {"tracking_number":"ES953934335AU","carrier_code":"australia-post"},
//     {"tracking_number":"LZ448865302CN","carrier_code":"china-ems"}
//     ];
// var url      = 'http://api.trackingmore.com/v2/trackings/delete';
// sentRes(url,postData,"POST",function(data){
//     console.log(data);
// });

//16 修改运输商简码
// var postData = {"tracking_number":"ES953934335AU","carrier_code":"australia-post","update_carrier_code":"china-ems"};
// var url      = 'http://api.trackingmore.com/v2/trackings/update';
// sentRes(url,postData,"POST",function(data){
//     console.log(data);
// });

//17 获取单次跟踪的实时结果
// var postData = {"tracking_number": "ES953934335AU","carrier_code":"australia-post","destination_code": "US","tracking_ship_date":"20180908","tracking_postal_code":"12201","specialNumberDestination":"UK","order":"#123","order_create_time":"2018/09/08 16:51","lang":"en"};
// var url      = 'http://api.trackingmore.com/v2/trackings/realtime';
// sentRes(url,postData,"POST",function(data){
//     console.log(data);
// });

//###  测试结束 #####