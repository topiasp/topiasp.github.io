


# Create map: create JSobjects+read html, JS and CSS 

createMap <- function(dataToMap='example',type='html',muuttuja='default',title='default') {
 
  
  if (!is.data.frame(dataToMap) ) {
    dataToMap <- read.table("https://topiasp.github.io/projects/project3/example_data.csv",
                         encoding='UTF-8',sep=";",
                         stringsAsFactors = F,dec=".",header=T,
                         colClasses = c('character','character',rep('numeric',6)))

  }
  
  if (!'kuntakoodi' %in% names(dataToMap))  { 
    print('oletetaan, ett‰ ensimm‰inen sarake on kuntakoodi!');
    names(dataToMap)[1] <- "kuntakoodi"
  }
  
  url <- "https://topiasp.github.io/projects/project3/"
  if (type=='html') {
    
    writeLines(createJSobjects(dataToMap),'data.js')
    writeLines(readLines(paste0(url,"map.html"),warn=F),con='map.html')
    writeLines(readLines("https://topiasp.github.io/projects/project3/funktiot.js",warn=F),con='funktiot.js')
    writeLines(readLines("https://topiasp.github.io/projects/project3/styles.css",warn=F),con='styles.css')
  }
  if (type=='svg') {
    
    # Luetaan SVG-tiedosto ja poimitaan kuntakoodi yhdistely‰ varten
    svg <- readLines(paste0(url,'svg_barebones.svg'),warn=F)
    svg <- data.frame(svg=svg,stringsAsFactors = F)
    svg$labelRow <- grepl('label',svg[,1])
    # Korjataan hieman
    
    svg$labelRow <- ifelse(!grepl('kunta4500_',svg$svg) | grepl('text',svg$svg),F,svg$labelRow)
    
    
    
    
    svg$kuntakoodi <- 'XXX'
    
    head(svg[svg$labelRow,])
    svg[svg$labelRow,]$kuntakoodi <- unlist(sapply(svg[svg$labelRow,1],FUN=function(x) { substring(strsplit(x,'label="')[[1]][2],1,3) }))
    svg$jarj <- 1:nrow(svg)
    # V‰ripaletti
    
    paletti <- data.frame(fillColour=c('#a50026',      '#d73027',      '#f46d43',      '#fdae61',   '#fee08b',
               '#d9ef8b',      '#a6d96a',      '#66bd63',      '#1a9850',   '#006837'),class=1:10)
    
    # Luokat
    if (muuttuja=='default') {   print('M‰‰rittele muuttuja!'); stop;    }
    
    if (nrow(dataToMap[is.na(dataToMap[,muuttuja]),])>0) { print('Korvataan NULLt nollilla');
      dataToMap[is.na(dataToMap[,muuttuja]),muuttuja] <- 0
      }
    
    q <-  quantile(dataToMap[,muuttuja],probs=seq(0,1,by=0.1))
    
    dataToMap$class <- cut(dataToMap[,muuttuja],breaks=q,labels=F,include.lowest = T,right=F)
    dataToMap <- merge(dataToMap,paletti,by='class')
    # Yhdistet‰‰n SVG-tiedostoon
    
    svg <- merge(svg,dataToMap,by='kuntakoodi',all.x=T)
    svg <- svg[order(svg$jarj),]  
    
    for (i in 1:nrow(svg)) {
      
      if (svg$labelRow[i]) {
       svg[i,]$svg <- gsub('>',
                           paste0(" value='",svg[i,muuttuja],"' style='fill:",svg[i,]$fillColour,"' onmouseover='printInfo(this);' class='polygon'>"),
                           svg[i,]$svg )
      }
      
    }
    
    # Muodostetaan JSON ja tyrk‰t‰‰n osaksi javascripti‰
    
    
    
    if (title=='default') { 
      writeLines(svg$svg,con='svg_map.svg')
    } else { 
      writeLines(svg$svg,con=paste0(title,'.svg'))
      }
    
    
  }
  
}


