const uuidv4 = require('uuid/v4');


const User = module.exports = function(uuid, nickname, fullName){
  this.uuid = uuidv4();
  this.nickname = nickname;
  this.fullName - fullName;
};

console.log(User);
