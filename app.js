const express = require('express');
//const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./models/connect');
//const contactRoutes = require('./routes/contacts');
const bodyParser = require('body-parser');
//const cors = require("cors");

const port = process.env.PORT || 8080;
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app
  //.use(cors(corsOptions))
  //.use(express.json())
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: true }))
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers', 
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
  .use('/', require('./routes'))
  //.use('/contacts', contactRoutes);

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});


