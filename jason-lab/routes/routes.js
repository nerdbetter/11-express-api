
/*
const storage = require('../lib/storage.js');
const User = require('../module/user.js');
const createError = require('http-errors');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const debug = require('debug')('server');

app.use(express.static('./jason-lab'));
app.use(bodyParser.json());

debug('Testing ROUTES');
app.get('/', (req, res) =>{
  res.type('text/plain').send('welcome to the Program');
  debug('routed');

});
app.route('/api/chat')
  .get(function (req, res){
    if(req.url.query.id) {
      debug(req.url.query.id);
      storage.fetchItem('chatUser', req.url.query.id)
        .then(user => {
          res.send(JSON.strigify(user));
          res.end();
        }).catch(err => {
          debug(err);
          res.send(createError(401, 'Please login to view this page.'));
          res.end();
        });
      return;
    }
    res.send(createError(400, 'Bad request'));
    res.end();
  })
  .post('/api/dead', function(req, res){
    try{
      var chatUser = new User(req.body.nickName, req.body.fullName);
      debug(chatUser);
      storage.createItem('chatUser', chatUser);
      res.type('application/json').;
      res.write(JSON.stringify(chatUser));
      res.end();
    } catch(err) {
      console.error('server post', err);
      res.writeHead(400, {
        'Content-Type': 'plain/text'
      });
      res.write('bad request');
      res.end();
    }
  });
  */
