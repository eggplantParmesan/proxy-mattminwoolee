require('newrelic');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 7778;
const fetch = require('node-fetch');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/cruddy/:productId', (req, res) => {  
  // var productNumber = req.url.split('=')[1];
  res.header('Access-Control-Allow-Origin', '*');
  // console.log(req.params.productId);
  fetch(`http://ec2-52-53-224-142.us-west-1.compute.amazonaws.com/cruddy/${req.params.productId}`)
    .then((response) => {   
      return response.json();
    }).then((json) => {
      res.send(json);
    });
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
