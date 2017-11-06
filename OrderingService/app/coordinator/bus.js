module.exports = {
    getCar : function(id, callback){
        const url       = '/catalog/get_car/' + id;
        const options   = createGetOptions('127.0.0.1', 3004, url, null);
        createAndSendHttpRequest(options, url, null, function(err, status, response){
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
    }
}

function createAndSendHttpRequest(options, path, data, callback){
    var http    = require('http');
    var request = http.request(options, function(res){
        var raw_data_from_service = '';

        res.on('data', function(chunk){
            raw_data_from_service += chunk;
        });
        
        res.on('end', function(){
            callback(null, res.statusCode, raw_data_from_service);
        });

        res.on('error', function(err){
            callback(err, res.statusCode, null);
        });
    });
    if (data) {
        request.write(data);
    }
    request.end();
}

function createGetOptions(host, port, path, headers_options){
    let item = {
        host    : host,
        port    : port,
        path    : path,
        method  : 'GET',
    }
    if (headers_options){
        for (let I = 0; I < headers_options.length; I++) {
            item.headers[headers_options[I].key] = headers_options[I].value;
        }
    }
    return item;
}