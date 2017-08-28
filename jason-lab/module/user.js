const uuidv4 = require('uuid/v4');


const User = module.exports = function(uuid, nickName, fullName){
  this.id = uuidv4();
  this.nickName = nickName;
  this.fullName = fullName;
};

console.log(User);
