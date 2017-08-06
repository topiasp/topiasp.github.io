


# Create map: create JSobjects+read html, JS and CSS 

createMap <- function(dataToMap='example',
                      type='html',variableToMap='default',title='default',
                      palette='default',numberOfClasses=10) {
  
 
  url <- "https://topiasp.github.io/projects/osinkokartta_r_ohjelmointi/"

 
  if (length(palette)!=numberOfClasses & palette[1]!='default')  {
    stop('V‰rien m‰‰r‰ != luokkien m‰‰r‰');
    
  }
  
  if (palette=='default') {
    print('Luodaan v‰rit');
    if (numberOfClasses<12) {   
        palette <- brewer.pal(n = numberOfClasses, name = "RdYlGn") 
    } else {
      
      colfunc <-   colorRampPalette(c('#a50026','#006837'))  
      palette <- colfunc(numberOfClasses)
    }
    
  }
  
  
  
  if (!is.data.frame(dataToMap) ) {
    dataToMap <- read.table("https://topiasp.github.io/projects/project3/example_data.csv",
                         encoding='UTF-8',sep=";",
                         stringsAsFactors = F,dec=".",header=T,
                         colClasses = c('character','character',rep('numeric',6)))

  }
  if (nrow(dataToMap[is.na(dataToMap[,variableToMap]),])>0) { print('Korvataan NULLt nollilla');
    dataToMap[is.na(dataToMap[,variableToMap]),variableToMap] <- 0
  }
  
  if (!'kuntakoodi' %in% names(dataToMap))  { 
    print('oletetaan, ett‰ ensimm‰inen sarake on kuntakoodi!');
    names(dataToMap)[1] <- "kuntakoodi"
  }
  if (!'kuntanimi' %in% names(dataToMap))  { 
    print('Ei kuntanimi-saraketta, luodaan tyhj‰ sarake');
    dataToMap[,ncol(dataToMap)+1] <- ""
    names(dataToMap)[ncol(dataToMap)] <- "kuntanimi"
  }
 
  if (type=='html') {
    source(paste0(url,"create_JS_objects.R"))
    writeLines(createJSobjects(dataToMap),'data.js')
    
    
   if (title=='default') { 
      writeLines(readLines(paste0(url,"map.html"),warn=F),con='map.html')
    } else { 
      writeLines(readLines(paste0(url,"map.html"),warn=F),con=paste0(title,'.html'))
    }
    
    # Luetaan JS Githubista
    JSfile <- readLines(paste0(url,"funktiot.js"),warn=F)
    
    # Syˆtet‰‰n v‰ripaletti
    JSfile[grepl('cols=',JSfile)] <- paste0("cols=['",paste(palette,collapse="','"),"']")
    
    # Syˆtet‰‰n luokkien lukum‰‰r‰
    JSfile[grepl('numberOfClasses=',JSfile)] <- paste0('numberOfClasses=',numberOfClasses,';')
    
    writeLines(JSfile,con='funktiot.js')
    writeLines(readLines(paste0(url,"styles.css"),warn=F),con='styles.css')
  }
  if (type=='svg') {
    
    
    # Luetaan SVG-tiedosto ja poimitaan kuntakoodi yhdistely‰ varten
    svg <- readLines(paste0(url,'svg_barebones.svg'),warn=F)
    svg <- data.frame(svg=svg,stringsAsFactors = F)
    svg$labelRow <- grepl('label',svg[,1])

    # Korjataan hieman

    svg$labelRow <- ifelse(!grepl('kunta4500_',svg$svg) | grepl('text',svg$svg),F,svg$labelRow)
    svg$labelRow <- ifelse(grepl('kunta4500_labels',svg$svg),F,svg$labelRow)
    
    svg$kuntakoodi <- 'XXX'
    
    svg[svg$labelRow,]$kuntakoodi <- sapply(svg[svg$labelRow,1],FUN=function(x) { substring(strsplit(x,'label="')[[1]][2],1,3) })
    svg$jarj <- 1:nrow(svg)
    
    # Luokat
    if (variableToMap=='default') {   print('Define variableToMap!'); stop;    }
    
    # Palette with classes
    paletti <- data.frame(fillColour=palette,class=1:numberOfClasses)
    
    q <-  quantile(dataToMap[,variableToMap],probs=seq(0,1,by=0.1))
    
    dataToMap$class <- cut(dataToMap[,variableToMap],breaks=q,labels=F,include.lowest = T,right=F)
    dataToMap <- merge(dataToMap,paletti,by='class')
    # Yhdistet‰‰n SVG-tiedostoon
    
    svg <- merge(svg,dataToMap,by='kuntakoodi',all.x=T)
    svg <- svg[order(svg$jarj),]  
    
    for (i in 1:nrow(svg)) {
      
      if (svg$labelRow[i]) {
       svg[i,]$svg <- gsub('>',
                           paste0(" value='",svg[i,variableToMap],"' style='fill:",svg[i,]$fillColour,"' onmouseover='printInfo(this);' class='polygon'>"),
                           svg[i,]$svg )
      }
      
    }
    
    # Muodostetaan JSON ja tyrk‰t‰‰n osaksi javascripti‰
    # idt ja nimet pit‰‰ poimia SVGst‰ (ta)
    ids <- as.vector(sapply(svg[svg$labelRow,]$svg,FUN=function(x) { substring(x,1,(38)) }))
    ids <- gsub('<g id=\"','',ids)
    ids <- gsub('\"','',ids)
    ids <- gsub(' ','',ids)
    
    
    
    values <- svg[svg$labelRow,variableToMap]
    names <- svg[svg$labelRow,'kuntanimi']
    
    JSON <- data.frame(id=ids,value=values,names=names,stringsAsFactors = F)
    
    JSON$JSON <- paste0('{ id:"',JSON$id,'", value:"',round(JSON$value,3),'", name:"',JSON$names,'" }')
   
    svg[grepl('kuntadata=',svg$svg),]$svg <- paste('kuntadata=[ ',paste(JSON$JSON,collapse=","),' ]')
    
    # Tyrk‰t‰‰n title osaksi SVGt‰
    svg[grepl('output_title',svg$svg),]$svg <- paste0("<text id='output_title' x='100' y='150'>",title,"</text>")
    
    # .. ja variableToMap osaksi JS:‰‰.
    svg[grepl("muuttuja=",svg$svg),]$svg <- paste0("muuttuja='",variableToMap,"';")
        
    if (title=='default') { 
      writeLines(svg$svg,con='svg_map.svg')
    } else { 
      writeLines(svg$svg,con=paste0(title,'.svg'))
      }
    
    
  }
  
}


