module.exports = {
    getCar : function(id, callback){
        const url       = '/catalog/get_car/' + id;
        const options   = createOptions('127.0.0.1', 3004, url, 'GET');
        createAndSendHttpRequest(url, options,null,function(err, status, response){
            if(err)       
                callback(err, status, response);
            else {
                if (response){
                    const object = JSON.parse(response);
                    callback(err, status, object);
                } else {
                    callback(err, status, null);
                }
            }
        });
    },
    createBilling : function(data, callback){
        const url       = '/billings/createBilling';
        const jsonData  = data;
        const options   = createOptions('127.0.0.1', 3003, url, 'PUT');
        createAndSendHttpRequest(url, options, data, function(err, status, response){
            if(err)       
                callback(err, status, response);
            else {
                if (status == 200){
                    if (response){
                        const object = JSON.parse(response);
                        callback(err, status, object);
                    } else {
                        callback(err, status, null);
                    }
                } else {
                    callback(response, status, null);
                }
            }
        });
    }
}

function createAndSendHttpRequest(uri, options, data, callback){
    const request = require('request');
    request.put(options.url,options, function(errors, response, body){
        callback(errors, response, body);
    }).form(data);
}

// function createAndSendHttpRequest(options, path, data, callback){
//     var http    = require('http');
//     var request = http.request(options, function(res){
//         var raw_data_from_service = '';

//         res.on('data', function(chunk){
//             raw_data_from_service += chunk;
//         });
        
//         res.on('end', function(){
//             callback(null, res.statusCode, raw_data_from_service);
//         });

//         res.on('error', function(err){
//             callback(err, res.statusCode, null);
//         });
//     });
//     if (data) {
//         request.write(data);
//     }
//     request.end();
// }

function createOptions(host, port, path, method){
    let item = {
        method  : method,
        uri     : 'http://'+host+':'+port+path,
    }
    return item;
}