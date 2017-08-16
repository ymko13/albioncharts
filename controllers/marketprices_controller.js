const express = require('express');
const mysql = require('./mysql/mysqlcached.js');
const mysqlschema = require('./mysql/mysqlschema.js');
const mySqlDates = require('./mysql/mysqldates.js');
const queryBuilder = require('./mysql/querybuilder.js');

var router = express.Router();

router.get('/market/',                              GET_MarketOrders);
router.get('/market/:location/:type/:dateoffset',   GET_MarketOrdersBaseOnItemTypeAndLocation);

module.exports = router;

//Region Controller

function GET_MarketOrders(req, res) 
{
    var query = "SELECT * FROM " + mysqlschema.MarketAuctions;

    var date = req.query.dateoffset ? mySqlDates.currentDateMinusDaysToMySqlDate(req.query.dateoffset) : null;

    var acceptedProperties = [
        ["ItemTypeId",          req.query.itemtype,     true],
        ["LocationId",          req.query.location],
        ["EnchantmentLevel",    req.query.enchantment],
        ["QualityLevel",        req.query.quality],
        ["Time",            date,                   true, true]
    ];

    query = query + queryBuilder.buildWhere(acceptedProperties);

    mysql.readFrom(query, function(data){
        res.json(data);
    }, 30000);
}

function GET_MarketOrdersBaseOnItemTypeAndLocation(req, res) 
{   
    var query = "SELECT * FROM " + mysqlschema.MarketAuctions;

    var date = mySqlDates.currentDateMinusDaysToMySqlDate(req.params.dateoffset);

    var acceptedProperties = [
        ["ItemTypeId",  req.params.type,        true],
        ["LocationId",  req.params.location],
        ["Time",    date,                   true, true]
    ];

    query = query + queryBuilder.buildWhere(acceptedProperties);

    mysql.readFrom(query, function(data){
        res.json(data);
    }, 30000);
}

//End Controller

//Region Functions

//End Functions