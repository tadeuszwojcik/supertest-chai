var http = require('http');
var https = require('https');
var request = require('superagent');
var Request = request.Request;

var port = 3456;

module.exports.request = function (app) {
    if ('function' == typeof app) app = http.createServer(app);
    var addr = app.address();
    var portno = addr ? addr.port : port++;
    if (!addr) app.listen(portno);
    var protocol = app instanceof https.Server ? 'https' : 'http';
    var host = protocol + '://127.0.0.1:' + portno;

    request.Request = function (method, url) {
        var newRequest =new Request(method, host + url);
        newRequest.redirects(0);

        return newRequest;
    }

    return request;
};

module.exports.httpAsserts = require('./lib/asserts');

