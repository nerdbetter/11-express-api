'use-strict';

module.export = function(req, res, next){
  res.append('Acess-Control-Allow-Origin', '*');
  res.append('Acess-Control-Allow-Headers', '*');
  next();
};
