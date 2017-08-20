function makeChart(contextName, days)
{
    $.get("../api/goldprices/" + days, function(data, status){
        var labels = [];
        var values =  [];
    
        data.forEach(function(element) {
            labels.push(formatDate(element.Id));
            values.push(element.Value / 10000);
        }, this);
    
        var ctx = document.getElementById(contextName);
    
        createChart(ctx, labels, values);
    });
}

function formatDate(date)
{
    var formattedDate = date.replace("Z","").split('T');
    return formattedDate[0] + " " + formattedDate[1].replace(":00.000", "");
}

function createChart(ctx, labels, values)
{
    var myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Gold Price',
            data: values,
            lineTension: 0.1,
            fill:false,
            borderColor: 'rgba(216, 167, 41, 0.9)',
            borderWidth: 2
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:false
                }
            }]
        }
    }
});
}