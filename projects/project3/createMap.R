


# Create map: create JSobjects+read html, JS and CSS 

createMap <- function(dataToMap='example',type='html') {
  
  
  if (dataToMap=='example') {
    svgData <- read.csv2("https://topiasp.github.io/projects/project3/example_data.csv",encoding='UTF-8',stringsAsFactors = F)
    # Oletetaan, että ensimmäinen sarake on kuntakoodi
  }
  
  url <- "https://topiasp.github.io/projects/project3/"
  if (type=='html') {
  source("https://topiasp.github.io/projects/project3/create_JS_objects.R")
  writeLines(createJSobjects(dataToMap),'data.js')
  writeLines(readLines(paste0(url,"map.html"),warn=F),con='map.html')
  writeLines(readLines("https://topiasp.github.io/projects/project3/funktiot.js",warn=F),con='funktiot.js')
  writeLines(readLines("https://topiasp.github.io/projects/project3/styles.css",warn=F),con='styles.css')
  }
  if (type=='svg') {
    svg <- readLines(paste0(url,'svg_barebones.svg'))
    
  }
  
}


