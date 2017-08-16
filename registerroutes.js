const express = require('express');
const async = require('async');

var goldPricesRouter = require('./controllers/goldprices_controller.js');
var marketOrdersRouter = require('./controllers/marketprices_controller.js');
var ingestRouter = require('./controllers/ingest_controller.js');
var htmlServant = require('./html/htmlservant.js');

function parallel(middlewares) {
    return function (req, res, next) {
      async.each(middlewares, function (mw, cb) {
        mw(req, res, cb);
      }, next);
    };
  }

function Init(app)
{
    var getRouter = express.Router();
    getRouter.use('/api', goldPricesRouter, marketOrdersRouter);

    var ingestRouterReal = express.Router();
    ingestRouterReal.use('/api/ingest', ingestRouter);
    
    app.use(parallel([htmlServant, getRouter, ingestRouterReal]));
}

module.exports = {
    Init:Init
};
