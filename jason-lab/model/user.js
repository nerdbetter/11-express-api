'use strict';

const debug = require('debug')('app:User');
const storage = require('../lib/storage.js');

const createError = require('http-errors');

const uuidv4 = require('uuid/v4');
const User = module.exports = function(nickName, fullName){

  debug('constructor');

  this.id = uuidv4();
  this.nickName = nickName;
  this.fullName = fullName;
};

User.createUser = function(body){
  if(!body){
    return Promise.reject(createError(400, 'User body is missing'));
  }
  let user = new User(body.nickName, body.fullName);

  return storage.createItem('user', user);
};

User.updateUser = function(id, body){
  debug(`updateUser(${id})`);
  return storage.fetchItem('user', id)
    .then( user => {
      for(var prop in user){
        if(prop === 'id') continue;
        if(prop in body){
          user[prop] = body[prop];
        }
      }
      return user;
    });
};
User.getUser = function(id){
  debug(`getUser(${id})`);
  return storage.fetchItem('user', id);
};

User.deleteUser = function(id){
  debug(`deleteUser(${id})`);
  return storage.deleteItem('user', id);
};
