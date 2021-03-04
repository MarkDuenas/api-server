'use strict';

const logger = (req, res, next) => {
  console.log(`REQ PATH:`, req.path);
  console.log(`REQ METHOD:`, req.method);
  next();
}

module.exports = logger;