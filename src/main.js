/**
 * Created by Ken on 14-5-22.
 */

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));


app.listen(8888);
console.log('Listening on port 8888');