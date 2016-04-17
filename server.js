var express = require('express');
var app = express();

app.use(express.static('src'));

app.listen(1001, function () {
  console.log('AllSpice web server listening on port 1001!');
});