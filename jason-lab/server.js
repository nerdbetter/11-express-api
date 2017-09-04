const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const debug = require('debug')('app:server');

const bodyParser = require('body-parser');


app.use(express.static('./jason-lab'));
app.use(bodyParser.json());
//app.use(require('./lib/cors-middleware.js'));
app.use(require('./routes/user-routes.js'));
app.use(require('./lib/error-middleware.js'));

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
