

plots = {}

plots.LineChart = (data) => {
    

    console.log('plotting',data)

    // Fit loess
    fit = data.fitLoess(0.2)
    fitted = fit.fittedSeries

    // Target canvas
    //var ctx = document.getElementById("plot").getContext('2d');

    // Replace the chart canvas element
    // Terrible but better than the update
    $('#plot').replaceWith('<canvas id="plot" width="150" height="90%"></canvas>');

    // C
    var ctx = $('#plot').get(0).getContext("2d");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.monthAndYear,
            datasets: [{
                label: data.TaxCodeDescription ,
                data: data.values, 
                fill:false,
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            },
            {
                label: 'LOESS' ,
                data:  fitted  ,
                fill:false,
                borderColor: [
                    
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }
        
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

}
