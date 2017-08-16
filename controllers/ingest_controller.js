const express = require('express');
const mysql = require('./mysql/mysqlcached.js');
const mysqlschema = require('./mysql/mysqlschema.js');
const mySqlDates = require('./mysql/mysqldates.js');
const queryBuilder = require('./mysql/querybuilder.js');

var router = express.Router();

router.post('/goldprices',      POST_GoldPrices);
router.post('/marketorders',    POST_MarketOrders);

module.exports = router;

function POST_GoldPrices(req, res) {
    const body = req.body;

    var sql = "INSERT IGNORE INTO " + mysqlschema.GoldOrders + " (Id,Value) VALUES ?";
    
    var transformedData = [];

    for (var i = 0; i < body.GoldPrices.length; i++) { 
        transformedData.push([mySqlDates.zeroDateToMySqlDate(body.TimeStamps[i]/10000000),body.GoldPrices[i]]);
    }

    mysql.writeTo(sql, [transformedData]);

    res.end();
}

function POST_MarketOrders(req, res) 
{
    const body = req.body;
    if(!body[0]) res.status(411).end();

    var tableName = mysqlschema.MarketAuctions;

    if(body.Orders[0].AuctionType == "request")
    {
        tableName = mysqlschema.MarketOrders;
    }

    var sql = "INSERT INTO " + tableName + " (Time,ItemId,ItemTypeId,UnitPrice,Amount,QualityLevel,EnchantmentLevel,LocationId) VALUES ?";
    
    var datetime = mySqlDates.currentMySqlDate();

    var transformedData = [];

    var location = locationTransform(body.LocationID);

    body.Orders.forEach(function(e) 
    {
        transformedData.push([datetime, e.Id, e.ItemTypeId, e.UnitPriceSilver / 1000, e.Amount, e.QualityLevel, e.EnchantmentLevel, location ]);
    }, this);

    console.log(sql);

    //mysql.writeTo(sql, [transformedData]);

    res.end();
}

function locationTransform(locationId)
{
    switch(locationId) {
        case 1002:
            return 1;
        case 9999:
            return 2;
        case 9999:
            return 3;
        case 9999:
            return 4;
        case 9999:
            return 5;
        case 9999:
            return 6;
        case 9999:
            return 7;
    }
}