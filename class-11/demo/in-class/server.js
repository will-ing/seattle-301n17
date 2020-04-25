'use strict';

require('dotenv').config();

const express = require('express');

const PORT = process.env.PORT || 3000;

const app = express();

// Bring in EJS as the "view" (templating) engine
app.set('view engine', 'ejs');

app.use( express.urlencoded({extended:true }));

app.use( express.static('./www') );

// This is a good one
app.get('/', (request, response) => {
  response.status(200).send('Hello World');
});

// .render() to show a view, and merge in an object
app.get('/person', (request, response) => {
  let data = {
    name: request.query.name,
    hairStyle: request.query.hair,
    kids: ['Zach', 'Allie'],
  };

  console.log(data);

  response.status(200).render('person.ejs', {person:data});
});

app.post('/article', (request, response) => {
  response.status(200).render('article', {article: request.body.content});
});

// This will force an error
app.get('/badthing', (request,response) => {
  throw new Error('WTF???');
});

// 404 Handler
app.use('*', (request, response) => {
  console.log(request);
  response.status(404).send(`Can't Find ${request.path}`);
});

// Error Handler
app.use( (err,request,response,next) => {
  console.error(err);
  response.status(500).send(err.message);
});

// Startup

function startServer() {
  app.listen( PORT, () => console.log(`Server running on ${PORT}`));
}

startServer();
