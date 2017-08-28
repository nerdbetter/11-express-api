const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


const server = function(){
  if (!module.parent){
    app.listen(PORT, () =>{
      console.log(`EXPRESS listening on ${PORT}`);
    });
  }
};

module.exports = server;
