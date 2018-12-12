doStuff = () => {
    CpvCode =  document.getElementById('CPV_input').value;
            
    result = document.getElementById('result')

    if (result.children.length>0) {

        result.children[0].remove()
    }



    result.appendChild( CreateCardHTML( FindCpvData( CpvCode) ) )
}



CreateCardHTML = (dat) => {
    
    console.log('Data: ',dat)

    if (dat.error) {
        card = document.createElement('div')
        card.classList.add('alert')
        card.classList.add('alert-danger')
        card.classList.add('mt-3')
        card.innerHTML = dat.error

        return(card)
    }


    card = document.createElement('div')

    text = document.createElement('h4')
    text.classList.add('text')
    text.style = 'color: grey; margin-bottom: 6%; margin-top: 5%'
    text.innerHTML =  dat.CPV + " " + dat.CPV_en

    card.appendChild(text)
    

    BadgeContainer = document.createElement('h4')
    card.appendChild(BadgeContainer)


    OffersBadge = document.createElement('span')
    OffersBadge.classList.add('badge')
    OffersBadge.classList.add('badge-primary')
    OffersBadge.classList.add('mt-3')
    OffersBadge.style='display: block'
    OffersBadge.innerHTML = 'Notices typically receive ' + dat.MedianOffers + ' offers'
    BadgeContainer.appendChild(OffersBadge)

    OffersBadge = document.createElement('span')
    OffersBadge.classList.add('badge')
    OffersBadge.classList.add('mt-3')

    OffersBadge.classList.add('badge-danger')
    OffersBadge.style='display: block'
    OffersBadge.innerHTML =   (dat.OneOffer  / dat.Obs *100).toFixed(1)  + ' % received only one offer'
    BadgeContainer.appendChild(OffersBadge)
    
    
    ListOfFigures = document.createElement('table');
    ListOfFigures.classList.add('table')
    ListOfFigures.classList.add('mt-3')

    HeaderRow = document.createElement('tr')
    HeaderCell = document.createElement('th')
    HeaderCell.scope='col'
    HeaderCell.innerHTML = 'Distribution figure'

    HeaderRow.appendChild(HeaderCell)

    HeaderCell2 = document.createElement('th')
    HeaderCell2.scope='col'
    HeaderCell2.innerHTML = 'Value'
    HeaderRow.appendChild(HeaderCell2)

    ListOfFigures.appendChild(HeaderRow)


    dat.Figures.forEach(element => {
        listElement = document.createElement('tr')
        
        cells = [ element.name , element.value + ' ' + element.unit]
        
        cells.forEach(function(c) {

            cell = document.createElement('td')
            cell.innerHTML = c
            listElement.appendChild(cell)

        })
        ListOfFigures.appendChild(listElement)

    });

    card.appendChild(ListOfFigures)

    // Top type

    TopTyleTable = document.createElement('table');
    TopTyleTable.classList.add('table')

    
    HeaderRow = document.createElement('tr')
    
    headerCells = [ 'Type', 'N', '%']
        
    headerCells.forEach(function(c) {

            cell = document.createElement('th')
            cell.innerHTML = c
            HeaderRow.appendChild(cell)

    })

    TopTyleTable.appendChild(HeaderRow)


    dat.TOP_TYPE.forEach(element => {
        listElement = document.createElement('tr')
        
        if (element.type == 'OPE') {
            element.type='Open'
        }
        if (element.type == 'NIC') {
            element.type='Negotiated with a call for competition'
        }
        if (element.type == 'RES') {
            element.type='Restricted'
        }

        cells = [ element.type, element.count, global.Maths.tidyNumber( element.pct * 100 ) ]
        
        cells.forEach(function(c) {

            cell = document.createElement('td')
            cell.innerHTML = c
            listElement.appendChild(cell)

        })
        TopTyleTable.appendChild(listElement)

    });

    card.appendChild(TopTyleTable)





    /*    
    ListOfFigures = document.createElement('ul');
    ListOfFigures.classList.add('list-group')

    dat.Figures.forEach(element => {
        listElement = document.createElement('li')
        listElement.classList.add('list-group-item')
        listElement.classList.add('d-flex')
        listElement.classList.add('justify-content-between')
        listElement.classList.add('align-items-center')

        listElement.innerHTML = element.name    

        badge = document.createElement('span')
        badge.classList.add('badge')
        badge.classList.add('badge-primary')

        badge.innerHTML = element.value + ' ' + element.unit

        listElement.appendChild(badge)
        

        ListOfFigures.appendChild(listElement)

    });
    */


    

   text = document.createElement('p')
   text.classList.add('text')
   text.innerHTML = 'Based on ' + dat.Obs + ' observations.'
   text.style = 'color: grey; margin-bottom: 8%; margin-top: 5%'

   card.appendChild(text)



    return(card)

}





FindCpvData = (CPV) => {

    //CPV = '45000000'
    dat = procurement_data.filter(function(x) { return(x.CPV==CPV) });

    let RtrnDat = {
        CPV: CPV,
        CPV_en: '',
        CPV_fi: '',
        Obs: 0,
        Figures: [],
        TOP_TYPE: [],
        MedianOffers: 0,
        OneOffer: 0
        
    }


    if (dat.length==0) {

        //alert('CPV-code '+CPV+' not found or no observations exists')
        RtrnDat.error = 'CPV-code '+CPV+' not found or no observations exists';
        return(RtrnDat)
    }

    Obs = dat.map(function(x) { return(x.Observations) });
    
    
    P10 = global.Maths.mean( dat.map(function(x) { return(x.P10) }),Obs) // Weight with obs to make more accurate
    P25 = global.Maths.mean( dat.map(function(x) { return(x.P25) }),Obs) // Weight with obs to make more accurate
    MedianValue = global.Maths.mean( dat.map(function(x) { return(x.MedianValue) }),Obs) // Weight with obs to make more accurate
    P75 = global.Maths.mean( dat.map(function(x) { return(x.P75) }),Obs) // Weight with obs to make more accurate
    P90 = global.Maths.mean( dat.map(function(x) { return(x.P90) }),Obs) // Weight with obs to make more accurate

    Figures = []

    Figures.push({ name: '1st decile   (10%)', value: global.Maths.tidyNumber( P10 ), unit:'€'  })
    Figures.push({ name: '1st quartile (25%)', value: global.Maths.tidyNumber( P25 ), unit:'€'  })
    Figures.push({ name: 'Median value (50%)', value: global.Maths.tidyNumber( MedianValue ), unit:'€'  })
    Figures.push({ name: '3rd quartile (75%)', value: global.Maths.tidyNumber( P75 ), unit:'€'  })
    Figures.push({ name: '9th decile   (90%)', value: global.Maths.tidyNumber( P90 ), unit:'€'  })

    // TOP TYPE
    TOP_TYPES = ['OPE','RES','NIC']
    
    TOP_TYPE = TOP_TYPES.map(function(type) {     


        count = dat[0][('TOP_TYPE_'+type)]

        if (count) {
            pct =  count  / global.Maths.sum( Obs )
            count =  count 
        } else {
            pct = 0
            count = 0
        }
        return({  type: type, pct: pct, count: count  })
    })
    
     
    RtrnDat.CPV_en = dat[0].CPV_en
    RtrnDat.CPV_fi = dat[0].CPV_fi
    

    RtrnDat.Obs = global.Maths.sum( Obs )
    RtrnDat.Figures = Figures
    RtrnDat.TOP_TYPE = TOP_TYPE 
    RtrnDat.MedianOffers = dat[0].MedianOffers
    RtrnDat.OneOffer = dat[0].OneOffer


    return(RtrnDat)
}




init = () => {

    // Add navbar buttons
    navbar = document.getElementById('navbar');
    //navbar.innerHTML += '<a class="nav-link" href="#" onclick=""></a>'
    
    // Populate datalist

    datalist_for_CPV_codes  = document.getElementById('datalist_CPV_code');
    
    CPV.forEach(function(cpv) {

        item = document.createElement('option')
        item.value = cpv.CPV;
        datalist_for_CPV_codes.appendChild(  item   )

    })




    query = document.getElementById('query');



    queryDiv = document.createElement('div');
    queryDiv.classList.add('form-group')
    queryDiv.classList.add('mt-1')

    query.appendChild(queryDiv)

    queryInput = document.createElement('input')
    queryInput.id = 'CPV_input'
    queryInput.type='text'
    queryInput.name='datalist_CPV_code'
    queryInput.setAttribute('list','datalist_CPV_code')
    queryInput.classList.add('form-control');
    queryInput.placeholder='Enter CPV-code. Eg. 45000000 or 80400000'
    //queryInput.value = '45000000'

    queryInput.addEventListener('keydown',function(event) {
        if (event.keyCode==13) {

            doStuff()


        }
    })
    queryDiv.appendChild(queryInput)

    goButton = document.createElement('button')
    goButton.classList.add('btn')
    goButton.classList.add('btn-success')
    goButton.classList.add('btn-block')
    goButton.innerHTML = 'Search'
    goButton.addEventListener('click',doStuff)

    query.appendChild(goButton)

    
    

}

