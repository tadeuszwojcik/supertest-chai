# chai-supertest

  HTTP assertions made easy via [super-agent](http://github.com/visionmedia/superagent) and
  [chai](https://github.com/chaijs/chai)



## Example



```js
var request = require('supertest')
  , express = require('express');

var app = express();

app.get('/user', function(req, res){
  res.send(201, { name: 'tobi' });
});

request(app)
  .get('/user')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '20')
  .expect(201)
  .end(function(err, res){
    if (err) throw err;
  });
```

  Here's an example with mocha, note how you can pass `done` straight to any of the `.expect()` calls:

```js
describe('GET /users', function(){
  it('respond with json', function(done){
    request(app)
      .get('/user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })
})
```

  Anything you can do with superagent, you can do with supertest - for example multipart file uploads!

```js
request(app)
.post('/')
.attach('test/fixtures/homeboy.jpg', 'avatar')
...
```

## API

  You may use any [super-agent](http://github.com/visionmedia/superagent) methods,
  including `.write()`, `.pipe()` etc and perform assertions in the `.end()` callback
  for lower-level needs.

### .expect(status[, fn])

  Assert response `status` code.

### .expect(status, body[, fn])

  Assert response `status` code and `body`.

### .expect(body[, fn])

  Assert response `body` text with a string, regular expression, or
  parsed body object.

### .expect(field, value[, fn])

  Assert header `field` `value` with a string or regular expression.

### .end(fn)

  Perform the request and invoke `fn(err, res)`.

## Notes

  Inspired by [supertest](https://github.com/visionmedia/supertest) and
  [chai-http](https://github.com/chaijs/chai-http)

## License

  MIT