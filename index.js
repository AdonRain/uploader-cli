#!/usr/bin/env node

var fs = require('fs');
var request = require('request');
var opts = process.argv.slice(2,4);
var flag = '--server=';

opts.sort(function (a, b){
  return a.indexOf(flag) - b.indexOf(flag);
});

var file = opts[0];
var server = (opts[1].split('='))[1];

request.post({
  url: server,
  formData: {
    file:  fs.createReadStream(file)
  }
}, function(err, res, body) {
  if(err) {
    throw err;
  }

  var url = JSON.parse(body).data.url;

  console.log(url);
});

