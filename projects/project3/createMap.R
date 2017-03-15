


# Create map: create JSobjects+read html, JS and CSS 

createMap <- function(data='example') {
  source("https://topiasp.github.io/projects/project3/create_JS_objects.R")
  writeLines(createJSobjects(data),'data.js')
  writeLines(readLines("https://topiasp.github.io/projects/project3/map.html",warn=F),con='map.html')
  writeLines(readLines("https://topiasp.github.io/projects/project3/funktiot.js",warn=F),con='funktiot.js')
  writeLines(readLines("https://topiasp.github.io/projects/project3/styles.css",warn=F),con='styles.css')
}


