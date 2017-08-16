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

function currentDateMinusDaysToMySqlDate(days)
{
    var currentDate = new Date();
    var newdate = currentDate - 1000 * 60 * 60 * 24 * days;   // current date's milliseconds - 1,000 ms * 60 s * 60 mins * 24 hrs * (# of days beyond one to go back)
    newdate = new Date(newdate);
    return dateToMySqlDate(newdate);
}

module.exports = {
    unixToMySqlDate:unixToMySqlDate,
    zeroDateToMySqlDate:zeroDateToMySqlDate,
    dateToMySqlDate:dateToMySqlDate,
    currentMySqlDate:currentMySqlDate,
    currentDateMinusDaysToMySqlDate:currentDateMinusDaysToMySqlDate
 };