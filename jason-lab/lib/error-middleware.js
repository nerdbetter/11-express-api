'use strict';

const createError = require('http-errors');
const debug = require('debug')('app:error-middleware');

module.exports = function(err, req, res, next){
  console.log(err.message);
  debug('status', err.status);

  if(err.status){
    debug('server error');
  }
  else{
    err = new createError.InternalServerError(err.message);
  }
  res.status(err.status).send(err.name);
  next();
};
