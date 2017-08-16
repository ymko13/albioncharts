const express = require('express');
const mysql = require('./mysql/mysql.js');
const mySqlDates = require('./mysql/mysqldates.js');
const queryBuilder = require('./mysql/querybuilder.js');

var router = express.Router();

router.get('/market/',                              GET_MarketOrders);
router.get('/market/:location/:type/:dateoffset',   GET_MarketOrdersBaseOnItemTypeAndLocation);

module.exports = router;

//Region Controller

function GET_MarketOrders(req, res) 
{
    var query = "SELECT * FROM auction_line";

    var date = mySqlDates.currentDateMinusDaysToMySqlDate(req.query.dateoffset);

    var acceptedProperties = [
        ["ItemTypeId",          req.query.itemtype,     true],
        ["LocationId",          req.query.location,     false],
        ["EnchantmentLevel",    req.query.enchantment,  false],
        ["QualityLevel",        req.query.quality,      false],
        ["DateTime",            date,                   true]
    ];

    query = query + queryBuilder.buildWhere(acceptedProperties);

    mysql.query(query, function (err, result, fields) 
    {
        if (err) throw err;
        res.json(result);
    }); 
}

function GET_MarketOrdersBaseOnItemTypeAndLocation(req, res) 
{   
    var query = "SELECT * FROM auction_line";

    var date = mySqlDates.currentDateMinusDaysToMySqlDate(req.params.dateoffset);

    var acceptedProperties = [
        ["ItemTypeId",  req.params.type,        true],
        ["LocationId",  req.params.location,    false],
        ["DateTime",    date,                   true]
    ];

    query = query + queryBuilder.buildWhere(acceptedProperties);

    mysql.query(query, function (err, result, fields) 
    {
        if (err) throw err;
        res.json(result);
    });
}

//End Controller

//Region Functions

//End Functions