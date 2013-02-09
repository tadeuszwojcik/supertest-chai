# supertest-chai

  HTTP assertions made easy via [super-agent](http://github.com/visionmedia/superagent) and
  [chai](https://github.com/chaijs/chai)

  Addresses problem with persisting cookies between requests (issues: https://github.com/visionmedia/supertest/issues/26 and https://github.com/visionmedia/supertest/issues/46).



## Example



```js
var supertestChai = require('supertest-chai');
var request = supertestChai.request;
var chai = require("chai");
chai.should();
chai.use(supertestChai.httpAsserts);

var express = require('express');

var app = express();

app.get('/user', function (req, res) {
    res.send(201, { name: 'tobi' });
});

app.get('/questions', function (req, res) {
    res.send(200, 'test');
});

request(app)
    .get('/user')
    .end(function (res) {
             res.should.be.json;
             res.should.have.status(201);
             res.should.have.header('Content-Length', '15');
             res.body.should.deep.equal({name: 'tobi'});
         });

// Access to superagent's agent, making requests using 'user' persists cookies ascross them
var user = request(app).agent();

user
    .get('/questions')
    .end(function (res) {
             res.should.be.html;
             res.should.have.status(200);
             res.should.have.header('Content-Length', '4');
             res.text.should.equal('test');
         });
```

## Notes

  Inspired by [supertest](https://github.com/visionmedia/supertest) and
  [chai-http](https://github.com/chaijs/chai-http)

## License

  MIT
