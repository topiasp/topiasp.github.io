
// Creates an SVG-polygon with points from coordinates
const featureToSVG = (coordinates,statProperties) => {

    const svgElement = document.createElementNS("http://www.w3.org/2000/svg",'polygon')
    svgElement.setAttribute('points', coordinates)

    const statistic = getStatForKunta(statProperties.kunta)
    
    const colorBasedOnStatistic = polygonColor(statistic)

    if (colorBasedOnStatistic) {
        svgElement.setAttribute('style', 'fill:'+colorBasedOnStatistic)
    }

    svgElement.addEventListener('mouseover',() => setCardToContainer({ name: statProperties.nimi, value: statistic }))

    return svgElement

}

// Gets municipalities as GEOjson
const getMap= (cb) => {



    fetch(FEATUREURL).then(response => {
       return response.json()
    }).then(data => {
        store.originalData = {...data}
        cb(data)
    })
}

// Handles response from stat.fi
// 1. Scales coordinates to fit screen
// 2. Creates SVG-elements for each multipolygon
// 3. Adds them to container

const handleGEOjson = data => {

    let  [minX,minY,maxX,maxY] = data.bbox

    // Scales to bounding box
    const scale = (number,axis) => {
       let reversedNumber =  axis === 'x' ? number : minY+(maxY-number) // SVG-origin is top-left, so turn map upside down
       return axis === 'x' ?   ( ( (reversedNumber-minX)/(maxX-minX) ) * 500 ) + PADDING  : (  ( (reversedNumber-minY)/(maxY-minY) ) * 700 ) + PADDING
    }
    // Applies scale to coordinate pair
    const scaleCoordPair = coordinatePair => {
        let [x,y] = coordinatePair
        return([ scale(x,'x') , scale(y,'y')   ])
    }
    // Applies scale to polygon
    const scalePolygon = p => p.map(scaleCoordPair)

    
    const features = data.features.map(feature => {

        const newObj = { ...feature }
        newObj.geometry.coordinates = feature.geometry.coordinates.map(c => c.map(scalePolygon))
        
        return(newObj)
    })
    store.features = features

    const svgContainer = document.getElementById('svg-container')

    features.forEach(feature => {
        feature.geometry.coordinates.forEach(coords => {
            const svgElem = featureToSVG(coords,feature.properties)
            svgContainer.appendChild(svgElem)
        })
    });

}

