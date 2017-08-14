function addZero(str)
{
    return str < 10 ? ('0' + str) : str;
}

function unixToMySqlDate(timestamp)
{
    var currentdate = new Date(timestamp * 1000); 
    return dateToMySqlDate(currentdate);
}

function dateToMySqlDate(date)
{
    var datetime = addZero(date.getFullYear()) + "-" +
        addZero(date.getMonth()+1)  + "-"+
        addZero(date.getDate()) + " "  + 
        addZero(date.getHours()) + ":"   +
        addZero(date.getMinutes()) + ":" + 
        addZero(date.getSeconds());
    return datetime;
}

function currentMySqlDate()
{
    return dateToMySqlDate(new Date());
}

function zeroDateToMySqlDate(timestamp)
{
    timestamp = timestamp + 31622400 - 62167219200;
    return unixToMySqlDate(timestamp);
}

module.exports = {
    unixToMySqlDate:unixToMySqlDate,
    zeroDateToMySqlDate:zeroDateToMySqlDate,
    dateToMySqlDate:dateToMySqlDate,
    currentMySqlDate:currentMySqlDate
 };