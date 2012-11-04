# chai-supertest

  HTTP assertions made easy via [super-agent](http://github.com/visionmedia/superagent) and
  [chai](https://github.com/chaijs/chai)



## Example



```js
var chaiSupertest = require('chai-supertest');
var request = chaiSupertest.request;
var chai = require("chai");
chai.should();
chai.use(chaiSupertest.httpAsserts);

var express = require('express');

var app = express();

app.get('/user', function(req, res){
  res.send(201, { name: 'tobi' });
});

request(app)
  .get('/user')
  .end(function (res) {
      res.should.be.json;
      res.should.have.status(201);
      res.should.have.header('Content-Length','20');
      res.body.should.equal.({name: 'tobi'});
  });
```

## Notes

  Inspired by [supertest](https://github.com/visionmedia/supertest) and
  [chai-http](https://github.com/chaijs/chai-http)

## License

  MIT