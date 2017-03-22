

createJSobjects <- function(svgData='example') {
  
  
  #names(svgData)[1] <- "kuntakoodi"
  #if (is.factor(svgData[,2])) {
  #    print('data[,2] -> character')
  #      svgData[,2] <- as.character(svgData[,2])
  #}
  
  
  # .. toinen kunnan nimi (jollei ole !=character)
  # if (is.character(svgData[,2])) {
     names=names(svgData)[!names(svgData)%in%c('kuntanimi','kuntakoodi')]
     varNamesToJs <- data.frame(id=paste0('VAR',1:length(names)),name=names,stringsAsFactors = F)
     names(svgData)[!names(svgData)%in%c('kuntanimi','kuntakoodi')]=varNamesToJs$id
     
     #names(svgData)[2:ncol(svgData)] <- c('kuntanimi',paste0('VAR',1:(ncol(svgData)-2)))
  # } else {
  #   varNamesToJs <- data.frame(id=paste0('VAR',1:(ncol(svgData)-1)),name=names(svgData)[3:ncol(svgData)],stringsAsFactors = F)
  #   names(svgData)[2:ncol(svgData)] <- c(paste0('VAR',1:(ncol(svgData)-1)))
  #   
  # }
  
  
  # Jos kuntakoodit alle kolme merkkiä, täydennetään nollilla
  if (!is.character(svgData$kuntakoodi)) {
    svgData$kuntakoodi <- as.character(svgData$kuntakoodi)
    svgData[nchar(svgData$kuntakoodi)==1,]$kuntakoodi <- paste0('00',svgData[nchar(svgData$kuntakoodi)==1,]$kuntakoodi )
    svgData[nchar(svgData$kuntakoodi)==2,]$kuntakoodi <- paste0('0',svgData[nchar(svgData$kuntakoodi)==2,]$kuntakoodi )  
  }
  
  # Jos kuntanimiä ei ole 
  
  
  # Kirjoitetaan JS-objektit 
  
  ## Varsinainen data
    svgData$JS <- ""
    
    for (i in 1:nrow(svgData)) { 
      svgData$JS[i] <- paste(paste0(names(svgData)[1:(ncol(svgData)-1)],':',svgData[i,1:(ncol(svgData)-1)]),collapse=", ")
      svgData$JS[i] <- gsub('kuntakoodi:',"kuntakoodi:'",svgData$JS[i])
      svgData$JS[i] <- gsub(', kuntanimi:',"', kuntanimi:'",svgData$JS[i])
      svgData$JS[i] <- gsub(', VAR1:',"', VAR1:",svgData$JS[i])
      svgData$JS[i] <- gsub('id:',"id:'",svgData$JS[i])
      svgData$JS[i] <- paste0('{ ', svgData$JS[i] ,"' }")
    }
  ## Muuttujien nimet 
    varNamesToJs$id <- paste0("'",varNamesToJs$id,"'")
    varNamesToJs$name <- paste0("'",varNamesToJs$name,"'")
    
    varNamesToJs$idInt <- 1:nrow(varNamesToJs)
    varNamesToJs$JS <- ""
    
    for (i in 1:nrow(varNamesToJs)) { 
      varNamesToJs$JS[i] <- paste(paste0(names(varNamesToJs)[1:(ncol(varNamesToJs)-1)],':',varNamesToJs[i,1:(ncol(varNamesToJs)-1)]),collapse=", ")
      varNamesToJs$JS[i] <- paste0('{ ', varNamesToJs$JS[i] ," }")
    }
    
  ## Kirjoitetaan JS-tiedostoon
  
  
  out1 <- paste('kunnat=[',paste(svgData$JS,collapse = ","),']')
  out2 <- paste('muuttujat=[',paste(varNamesToJs$JS,collapse = ","),']')
  out  <- paste(out1,out2,sep=";\n")
  
  return(out)
}


