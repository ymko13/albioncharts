const express = require('express');
const mysql = require('./mysql/mysql.js');
const mySqlDates = require('./mysql/mysqldates.js');
const queryBuilder = require('./mysql/querybuilder.js');

var router = express.Router();

router.get('/goldprices/',              GET_GoldPrices);
router.get('/goldprices/:timeperiod',   GET_GoldPricesSorted);

module.exports = router;

//Region Controller

function GET_GoldPrices(req, res)
{     
    mysql.query("SELECT Id, Value FROM gold_prices", function (err, result, fields) 
    {
        if (err) throw err;
        res.json(result);
    }); 
}

function GET_GoldPricesSorted(req, res)
{    
    var period = parseFloat(req.params.timeperiod);
    if(period) queryGoldPricesBasedOnPeriod(res, period);
    else res.end();
}

//End Controller

//Region Functions

function queryGoldPricesBasedOnPeriod(res, period)
{
    var whereDate = mySqlDates.currentDateMinusDaysToMySqlDate(period); 
    mysql.query("SELECT Id, Value FROM gold_prices WHERE Id > '" + whereDate + "'", function (err, result, fields) 
    {
        if (err) throw err;
        res.json(result);
    }); 
}

//End Functions



