'use strict';
// TODO: Done: Install and require the node postgres package into your server.js, and ensure that it's now a new dependency in your package.json
const pg = require('pg');

const express = require('express');
// REVIEW: Require in body-parser for post requests in our server
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();
// REVIEW: Create a connection string for the url that will connect to our local postgres database
const conString = process.env.DATABASE_URL || 'postgres://localhost:5432';

// REVIEW: Install the middleware plugins so that our app is aware and can use the body-parser module
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));


// NOTE: Routes for requesting HTML resources
app.get('/', function(request, response) {
  response.sendFile('index.html', {root: '.'});
});

app.get('/new', function(request, response) {
  response.sendFile('new.html', {root: '.'});
});



// NOTE: Routes for making API calls to enact CRUD Operations on our database
app.get('/articles/all', function(request, response) {
  let client = new pg.Client(conString); // Pass the conString to pg, which creates a new client object

  client.connect(function(err) { // Use the client object to connect to our DB.
    if (err) console.error(err);
    client.query('SELECT * FROM articles', function(err, result) { // Make a request to the DB
      if (err) console.error(err);
      response.send(result);
      client.end();
    });
  })
});

app.post('/articles/insert', function(request, response) {
  console.log(request.body);
  let client = new pg.Client(conString)

  client.connect(function(err) {
    if (err) console.error(err);

    client.query(
      ``, // TODO: Write the SQL query to insert a new record
      [request.body], // TODO: Get each value from the request's body
      function(err) {
        if (err) console.error(err);
        client.end();
      }
    );
  })
  response.send('insert complete');
});

app.put('/articles/update', function(request, response) {
  let client = new pg.Client(conString);

  client.connect(function(err) {
    if (err) console.error(err);

    client.query(
      ``, // TODO: Write the SQL query to update an existing record
      [], // TODO: Get each value from the request's body
      function(err) {
        if (err) console.error(err);
        client.end();
      }
    );
  })
  response.send('insert complete');
});

app.delete('/articles/delete', function(request, response) {
  let client = new pg.Client(conString);

  client.connect(function(err) {
    if (err) console.error(err);

    client.query(
      ``, // TODO: Write the SQL query to delete a record
      function(err) {
        if (err) console.error(err);
        client.end();
      }
    );
  });
  response.send('Delete complete');
});

app.delete('/articles/truncate', function(request, response) {
  let client = new pg.Client(conString);

  client.connect(function(err) {
    if (err) console.error(err);

    client.query(
      '', // TODO: Write the SQl query to truncate the table
      function(err) {
        if (err) console.error(err);
        client.end();
      }
    );
  });
  response.send('Delete complete');
});

app.listen(PORT, function() {
  console.log(`Server started on port ${PORT}!`);
});
