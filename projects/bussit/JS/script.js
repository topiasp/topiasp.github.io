


// global parameters
global = {
    interestingStops:  { stopId: '["HSL:1293123","HSL:1293165","HSL:1293139"]' },
    interestingBusses: ['51','56','550','552','52']
}

init = () => {
    getData({ 
        con:  global.interestingStops,
        cb: function(stops) {
            // Extract info from data returned by API
            var stops = stops.stops.map( handleStopInformation );
            // Flatten stop-arrays to a single array of departures
            let departures = []
            stops.forEach((s) => {
                s.forEach((d) => {  departures.push(d)  })
            })
            // Sort by departure time
            departures.sort(function(a,b) { return a.departureUnixTime - b.departureUnixTime })
            // Filter only interesting busses
            departures = departures.filter(busFilter)
            // Create departure bars
            departures.forEach(createDepartureBar)
        }
    })

    
}

busFilter = (d) => {
    return  global.interestingBusses.indexOf(d.bussi)>-1 ;
}


unixTimeToHoursAndMinutes = (t) => {

    // t = seconds from midnight

    let taysiaMinuutteja = (t - (t % 60)) / 60
    let tunteja =  (taysiaMinuutteja - (taysiaMinuutteja % 60)) / 60
    taysiaMinuutteja = ((taysiaMinuutteja % 60) )
    

    if (tunteja<10) {
        tunteja = '0'+tunteja
    }
    if (taysiaMinuutteja<10) {
        taysiaMinuutteja = '0'+taysiaMinuutteja
    }

    return tunteja +":"+taysiaMinuutteja
}

createDepartureBar = (l) => {

    let container = document.getElementById('container')

    let lahto = document.createElement('div')
    lahto.classList += 'departure'
    lahto.innerHTML = '<div class="departure-bus-number">' + l.bussi + "</div><div class='departure-departure-time'>" + l.lahtoaikaAikataulunMukaan+'</div>'

    container.appendChild(lahto)

}



handleStopInformation = (stopInformation) => {
    console.log('Handling stop information ',stopInformation)

    // Extract departure times and bus name for each departure
    let departures = stopInformation.stoptimesWithoutPatterns.map((d) => {

        // Determine which is earlier: scheduled or realtime departure
        var departureUnixTime = d.scheduledDeparture

        if (d.scheduledDeparture>d.realtimeDeparture) {
            departureUnixTime = d.scheduledDeparture
        }
        // Return object containing departure info
        return {
            lahtoaikaAikataulunMukaan: unixTimeToHoursAndMinutes(d.scheduledDeparture),
            lahtoaikaArvioitu: unixTimeToHoursAndMinutes(d.realtimeDeparture),
            bussi: d.trip.route.shortName,
            departureUnixTime: departureUnixTime
        }
    })
    return departures;    
}



getData = (params) => {

    var con = params.con || { stopId:"[HSL:1293165]"  }

   
    // Form query
    let query = '{ stops(ids: '+con.stopId+')'
    
    

    query += '{   name  stoptimesWithoutPatterns(numberOfDepartures:10) {'

    let paramsForApi = [
    'scheduledArrival',
    'realtimeArrival',
    'arrivalDelay',
    'scheduledDeparture',
    'realtimeDeparture',
    'departureDelay',
    'realtime',
    'realtimeState',
    'serviceDay',
    'headsign']

    query += paramsForApi.join(' ');
    // TODO: terrible
    query += ' trip {     gtfsId        tripShortName        serviceId        route {          id          shortName          gtfsId        }              }'
    query += '   }       }      }';
    

    // Post it

    fetch('https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',   {
        body: JSON.stringify({
            query
          })
        ,
        headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
      
        },
        method: 'POST', 
        mode: 'cors', 
        redirect: 'follow', 
        referrer: 'no-referrer', 
    }
    ).then(r => r.json())
        .then(data => params.cb(data.data)
    );


} 


