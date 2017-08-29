'use strict';

const debug = require('debug')('app:routes/user');
const User = require('../model/user.js');
const router = module.exports = new require('express').Router();
const jsonParser = require('body-parser').json();

debug('Testing ROUTES');

router.post('/api/chat', jsonParser, function(req, res, next){
  debug('POST: /api/chat');

  User.createUser(req.body)
    .then(user => res.json(user))
    .catch(err => next(err));
});
router.put('/api/chat', jsonParser, function(req, res, next){
  debug('PUT: /api/chat');

  User.updateUser(req.query.id, req.body)
    .then(updatedUser => res.json(updatedUser))
    .catch(err => next(err));
});
router.get('/api/chat', function(req, res, next){
  debug('GET: /api/chat');

  User.getUser(req.query.id)
    .then(user => res.json(user))
    .catch(err => next(err));
});
router.delete('/api/chat', function(req, res, next){
  debug('DELETE: /api/chat');

  User.deleteUser(req.query.id)
    .then(user => res.json(user))
    .catch(err => next(err));
});
