var express = require('express');
var app = express();

app.use(express.static('dist'));

app.get('/myFeed', function (req, res) {
  res.redirect(301, '/');
});

app.get('/MyFeed', function (req, res) {
  res.redirect(301, '/');
});

app.get('/AddSpice', function (req, res) {
  res.redirect(301, '/');
});

app.get('/addSpice', function (req, res) {
  res.redirect(301, '/');
});

app.listen(1002, function () {
  console.log('AllSpice web server listening on port 1002!');
});