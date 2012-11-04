module.exports = function (chai, _) {
    var i = _.inspect;
    var Assertion = chai.Assertion;
    var contentTypes = {
        json: 'application/json',
        text: 'text/plain',
        html: 'text/html'
    };

    Assertion.addMethod('status', function (code) {
        new Assertion(this._obj).to.have.property('statusCode');
        var statusCode = this._obj.statusCode;

        this.assert(
            statusCode == code
            , 'expected #{this} to have status code #{exp} but got #{act}'
            , 'expected #{this} to not have status code #{act}'
            , code
            , statusCode
        );
    });

    Assertion.addMethod('header', function (key, value) {
        var header = this._obj.headers[key.toLowerCase()];
        if (arguments.length === 2) {
            this.assert(
                header == value
                ,
                'expected header \'' + key + '\' to have value ' + value + ' but got ' + i(header)
                , 'expected header \'' + key + '\' to not have value ' + value
                , value
                , header
            );
        } else {
            this.assert(
                'undefined' !== typeof header || null === header
                , 'expected header \'' + key + '\' to exist'
                , 'expected header \'' + key + '\' to not exist'
            );
        }
    });

    function checkContentType(name) {
        var val = contentTypes[name];

        Assertion.addProperty(name, function () {
            new Assertion(this._obj).to.have.headers;
            var ct = this._obj.headers['content-type']
                , ins = i(ct) === 'undefined'
                    ? 'headers'
                    : i(ct);

            this.assert(
                ct && ~ct.indexOf(val)
                , 'expected ' + ins + ' to include \'' + val + '\''
                , 'expected ' + ins + ' to not include \'' + val + '\''
            );
        });
    }

    Object
        .keys(contentTypes)
        .forEach(checkContentType);
}