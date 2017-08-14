var mysql = require('./mysql/mysql.js');
var mySqlDates = require('./mysql/mysqldates.js');

function marketOrders(req, res) {
    const body = req.body;

    var sql = "INSERT INTO `auction_line` (ItemTypeId,LocationId,ItemId,QualityLevel,EnchantmentLevel,UnitPriceSilver,Amount,DateTime) VALUES ?";
    
    var datetime = mySqlDates.currentMySqlDate;

    var transformedData = [];

    body.Orders.forEach(function(element) {
        transformedData.push([element.ItemTypeId,body.LocationID,element.Id,element.QualityLevel, element.EnchantmentLevel, element.UnitPriceSilver, element.Amount, datetime]);
    }, this);

    mysql.queryMultipleRows(sql, [transformedData])

    res.end();
}

function goldPrices(req, res) {
    const body = req.body;

    var sql = "INSERT IGNORE INTO `gold_prices` (Id,Value) VALUES ?";
    
    var transformedData = [];

    for (var i = 0; i < body.GoldPrices.length; i++) { 
        transformedData.push([mySqlDates.zeroDateToMySqlDate(body.TimeStamps[i]/10000000),body.GoldPrices[i]]);
    }

    mysql.queryMultipleRows(sql, [transformedData])

    res.end();
}

function Init(app)
{
    app.post('/marketorders', marketOrders);
    app.post('/goldprices', goldPrices);
}

module.exports = {
    Init:Init
 };