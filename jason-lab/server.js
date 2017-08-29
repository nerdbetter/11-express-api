const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const debug = require('debug')('server');

const storage = require('./lib/storage.js');
const User = require('./module/user.js');

const bodyParser = require('body-parser');
const createError = require('http-errors');

app.use(express.static('./jason-lab'));
app.use(bodyParser.json());
app.use(require('./lib/error-middleware.js'));

debug('Testing ROUTES');
app.get('/', (req, res) =>{
  res.status(200);
  res.type('text/plain').send('welcome to the Program');
  debug('routed');
});

app.route('/api/chat')
  .get(function (req, res){
    if(req.query.id) {
      debug(req.query.id);
      storage.fetchItem('chatUser', req.query.id)
        .then(user => {
          res.status(200).json(user);
          res.end();
        }).catch(err => {
          debug(err);
          res.send(createError(404, 'ID not found'));
          res.end();
        });
      return;
    }
    res.send(createError(400, 'Must Include ID number'));
    res.end();
  })
  .post(function(req, res){
    try{
      var chatUser = new User(req.body.id, req.body.nickName, req.body.fullName);
      debug(chatUser);
      storage.createItem('chatUser', chatUser);
      res.type('application/json').send(chatUser);
      res.end();
    } catch(err) {
      debug('server post', err);
      res.type('plain/text').send('Bad Request');
      res.status('400');
      res.end();
    }
  })
  .delete(function(req, res) {
    if(req.query.id) {
      storage.deleteItem('chatUser', req.query.id)
        .then(user => {
          res.status(204).json(user);
          res.json((user) + 'Deleted');
          res.end();
        })
        .catch(err => {
          debug(err);
          res.send(createError( 404, 'item not found'));
        });
      return;
    }
    res.send(createError( 400, 'bad request'));
    res.end();
  });

const server = function(){
  debug('booting', 'Chat Program');
  if (!module.parent){
    app.listen(PORT, () =>{
      debug(`listening on ${PORT}`);
    });
  }
};

server();

module.exports = app;
