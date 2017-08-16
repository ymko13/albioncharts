const express = require('express');
const mysql = require('./mysql/mysqlcached.js');
const mysqlschema = require('./mysql/mysqlschema.js');
const mySqlDates = require('./mysql/mysqldates.js');
const queryBuilder = require('./mysql/querybuilder.js');

var router = express.Router();

router.get('/goldprices/',              GET_GoldPrices);
router.get('/goldprices/:timeperiod',   GET_GoldPricesSorted);

module.exports = router;

//Region Controller

function GET_GoldPrices(req, res)
{     
    var query = "SELECT Id, Value FROM " + mysqlschema.GoldOrders;
    mysql.readFrom(query, function(data){
        res.json(data);
    }, 30000);
}

function GET_GoldPricesSorted(req, res)
{
    var query = "SELECT Id, Value FROM " + mysqlschema.GoldOrders;

    var period = parseFloat(req.params.timeperiod);
    
    if(period)
    {
        var whereDate = mySqlDates.currentDateMinusDaysToMySqlDate(period); 
        query = query + " WHERE Id > '" + whereDate + "'";

        mysql.readFrom(query, function(data){
            res.json(data);
        }, 30000);
    }
    else 
    {
        mysql.readFrom(query, function(data){
            res.json(data);
        }, 30000);
    }
}

//End Controller



