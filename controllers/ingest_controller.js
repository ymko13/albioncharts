const express = require('express');
const mysql = require('./mysql/mysql.js');
const mySqlDates = require('./mysql/mysqldates.js');
const queryBuilder = require('./mysql/querybuilder.js');

var router = express.Router();

router.post('/goldprices',      POST_GoldPrices);
router.post('/marketorders',    POST_MarketOrders);

module.exports = router;

function POST_GoldPrices(req, res) {
    const body = req.body;

    var sql = "INSERT IGNORE INTO `gold_prices` (Id,Value) VALUES ?";
    
    var transformedData = [];

    for (var i = 0; i < body.GoldPrices.length; i++) { 
        transformedData.push([mySqlDates.zeroDateToMySqlDate(body.TimeStamps[i]/10000000),body.GoldPrices[i]]);
    }

    mysql.queryMultipleRows(sql, [transformedData])

    res.end();
}

function POST_MarketOrders(req, res) 
{
    const body = req.body;

    var sql = "INSERT INTO `auction_line` (ItemTypeId,LocationId,ItemId,QualityLevel,EnchantmentLevel,UnitPriceSilver,Amount,DateTime) VALUES ?";
    
    var datetime = mySqlDates.currentMySqlDate;

    var transformedData = [];

    body.Orders.forEach(function(element) 
    {
        transformedData.push([element.ItemTypeId,body.LocationID,element.Id,element.QualityLevel, element.EnchantmentLevel,
                             element.UnitPriceSilver, element.Amount, datetime]);
    }, this);

    mysql.queryMultipleRows(sql, [transformedData])

    res.end();
}