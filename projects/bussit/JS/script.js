


// global parameters
global = {


    selectedStopsAndBusses: {
        stops: [
            {
                stopId: 'HSL:1293123',
                busses: [ '52' ]
            },
            {
                stopId: 'HSL:1293165',
                busses: [ '51' ]
            },
            {
                stopId: 'HSL:1293139',
                busses: [ '550','552' ]
            },
        ],
        getStopsAsString: () => {
            return { stopId: '[' +  global.selectedStopsAndBusses.stops.map((s) => { return '"'+s.stopId+'"' }).join('') +']' }
        },
        getSelectedBusses: () => {
            let busArr = global.selectedStopsAndBusses.stops.map((s) => { 
                return s.busses;
            });

            let busses = [];
            // Flatten arr
            busArr.map((a) => {
                a.map((b) => { busses.push(b) })
            })
            return busses;
        },
        busFilter: (departure) => {

            let stop = global.selectedStopsAndBusses.stops.filter((s) => { return s.stopId === departure.stopId })[0];
            return stop.busses.indexOf(departure.bussi)>-1;

        }

    }
}



init = () => {

    // Container
    let container = document.getElementById('container')
    
    // Header bar and options
    let headerBar = document.createElement('div')
    headerBar.classList = 'headerbar'
    // add toggle options to header

    let toggleOptions = document.createElement('div');
    toggleOptions.classList = 'toggleoptions'
    //toggleOptions.innerHTML = '<i class="fas fa-cog"></i>'

    let optionsToggleCog = document.createElement('i')
    optionsToggleCog.classList = 'fas fa-cog'

    optionsToggleCog.onclick = function() {

        let options = document.getElementsByClassName('options-container')[0];

        if (options.classList.value.indexOf('hidden')>-1) {
            options.classList.value = options.classList.value.replace(' hidden','')
        } else {
            options.classList.value += ' hidden'
        }

    }
    toggleOptions.appendChild(optionsToggleCog)
    headerBar.appendChild(  toggleOptions )

    // Options container
    let options = document.createElement('div');
    options.classList = 'options-container hidden'
    options.innerHTML = 'Bussit seurannassa:' 
    options.innerHTML += global.selectedStopsAndBusses.getSelectedBusses().map((b) => { return '<div class="options-buslist-item">'+b+'</div>' }).join('')

    // Add header bar

    container.appendChild( headerBar )
    container.appendChild(  options )


    refreshData();

    
}

refreshData = () => {
    // Get departure data
    getData({ 
        con:  global.selectedStopsAndBusses.getStopsAsString(),
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
            departures = departures.filter( global.selectedStopsAndBusses.busFilter )
            // Create departure bars
            departures.forEach(createDepartureBar)
        }
    })
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

    let stopId = stopInformation.gtfsId;

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
            headsign: d.headsign,
            stopId: stopId,
            departureUnixTime: departureUnixTime
        }
    })
    console.log(departures)
    return departures;    
    
}



getData = (params) => {

    var con = params.con || { stopId:"[HSL:1293165]"  }

   
    // Form query
    let query = '{ stops(ids: '+con.stopId+')'
    
    

    query += '{   name gtfsId  stoptimesWithoutPatterns(numberOfDepartures:10) {'

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

    fetch('https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql', {
            body: JSON.stringify({ query }),
            headers: {
            'user-agent': 'Mozilla/4.0 MDN Example',
            'content-type': 'application/json'
            },
            method: 'POST', 
            mode: 'cors', 
            redirect: 'follow', 
            referrer: 'no-referrer', 
        }).then(r => r.json())
          .then(data => params.cb(data.data)
    );


} 


