var express = require('express');
var bodyParser = require('body-parser');
var api = require('./routes/api');

const PORT = 3000;

var app = express();

app.use(bodyParser.json());
app.use('/api' , api);

app.listen(PORT , function(){
  console.log('Listening to port' + PORT);
});
