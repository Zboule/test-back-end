var express = require('express');
var cors = require('cors');
var app = express();

app.get('/test', cors(), function (req, res) {
  res.json([{
    id: 1,
    username: "samsepi0l"
  }, {
    id: 2,
    username: "D0loresH4ze"
  }]);
});

app.listen(process.env.PORT || 3000);