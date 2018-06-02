

library(jsonlite)
library(dplyr)

dat <-structure(list(elaimet = c("Lypsylehmä", "Emolehmä", "Hieho (12-24 kk)", 
                                 "Lihanauta (sonni 12-24 kk)", "Siitossonni (sonni > 2v)", "Vasikka (6-12 kk)", 
                                 "Vasikka (< 6 kk)", "Emakko porsaineen", "Lihasika*", "Karju", 
                                 "Joutilas emakko ydinsikalassa", "Vieroitettu porsas (5-11 vk, jos tilalla ei ole emakoita)", 
                                 "Hevonen 2 v ->", "Poni** 2 v ->, hevonen 1 v", "Pienponi 2 v, poni 1 v, hevonen < 1 v", 
                                 "Pienponi 1-2 v, poni < 1 v", "Pienponi < 1 v", "Lammas (uuhi karitsoineen)", 
                                 "Vuohi (kuttu kileineen, pukki)", "Munituskana", "Broileriemo", 
                                 "Kukko", "Emokalkkuna", "Lihakalkkuna*", "Broileri*", "Kananuorikko*", 
                                 "Emoankka, liha-ankka, emohanhi, lihahanhi, emofasaani, lihafasaani*", 
                                 "Emosorsa, lihasorsa*", "Viiriäinen, helmikana", "Kaninaaras poikasineen***", 
                                 "Strutsi", "Biisoni", "Villisika", "Minkki ja hilleri, siitosnaaras pentuineen", 
                                 "Minkki ja hilleri, pentu", "Minkki ja hilleri, siitosuros", 
                                 "Kettu ja supi, siitosnaaras pentuineen", "Kettu ja supi, pentu", 
                                 "Kettu ja supi, siitosuros"), kerroin = c("10,8", "4,3", "4", 
                                                                           "5,7", "8,1", "3,4", "1,7", "2,6", "1", "1,8", "1,8", "0,24", 
                                                                           "3,9", "2,8", "2", "1,2", "0,8", "0,6", "0,6", "0,07", "0,07", 
                                                                           "0,1", "0,14", "0,12", "0,03", "0,04", "0,07", "0,06", "0,04", 
                                                                           "0,19", "0,9", "2,5", "0,9", "0,18", "0,18", "0,18", "0,41", 
                                                                           "0,41", "0,41")), .Names = c("elain", "kerroin"), class = "data.frame", row.names = c(NA, 
                                                                                                                                                                   -39L))


dat$kerroin <- as.numeric(gsub(',','.',dat$kerroin))

dat$id <- 1:nrow(dat)

dat$laji <- 'NA'


dat$laji[1:11] <- 'cow'
dat$laji[8:12] <- 'pig'
dat$laji[13:17] <- 'horse'
dat$laji[18:19] <- 'sheep'
dat$laji[20:29] <- 'chicken'

### combine lantakertoimet


dat_lantakertoimet <- structure(list(elain = c("Ankka, Hanhi 2", "Broileri 2", "Emakko ja porsaat 4", 
                                               "Emakko ja porsaat satelliittisikalassa 5", "Emolehmä", "Hevonen > 150 cm", 
                                               "Hieho", "Joutilas emakko", "Kalkkuna 2", "Karitsat ja kilit 3-9 kk 7", 
                                               "Karitsat ja kilit 6-9 kk 7", "Karju (täysikasvuinen)", "Kettu, Supi", 
                                               "Lampaat ja karitsat", "Lehmävasikka < 6 kk", "Lehmävasikka 6-12 kk", 
                                               "Lihanauta, Sonni", "Lihasika 2, 3", "Lypsylehmä (8500 kg) 1", 
                                               "Minkki, Hilleri", "Munituskana, Broileriemo", "Pienponi < 120 cm", 
                                               "Poni 120-150 cm", "Sonnivasikka < 6 kk", "Sonnivasikka 6-12 kk", 
                                               "Sorsa 2", "Vieroitettu porsas 6", "Vuohet ja kilit"), kuivalanta = c(NA, 
                                                                                                                     NA, 2.2, 3.5, 16.9, NA, 6.6, 1.6, NA, NA, NA, 1.8, NA, NA, 3.1, 
                                                                                                                     6.1, 10.1, 1, 15.8, NA, NA, NA, NA, 4, 8, NA, 0.6, NA), kuivikelanta_kuivikepohjalanta = c(0.04, 
                                                                                                                                                                                                                15, 10.7, 15.5, 20.4, 17, 13.4, 4.9, 0.06, 1.3, 0.6, 6.1, 0.5, 
                                                                                                                                                                                                                1.3, 6.1, 9.7, 12.9, 3, 28.6, 0.25, 0.04, 8, 12, 7.1, 12.1, 25, 
                                                                                                                                                                                                                1.6, 1.3), lietelanta = c(NA, NA, 9.3, 12.7, 19, NA, 8.5, 3.9, 
                                                                                                                                                                                                                                          NA, NA, NA, 4.9, NA, NA, 3.6, 7.2, 12.1, 2.4, 25.5, NA, NA, NA, 
                                                                                                                                                                                                                                          NA, 4.7, 9.5, NA, 1.2, NA), virtsa = c(NA, NA, 6.8, 10.4, 1.9, 
                                                                                                                                                                                                                                                                                 NA, 2.9, 2.7, NA, NA, NA, 3.5, NA, NA, 1.1, 1.7, 1.7, 1.6, 8.7, 
                                                                                                                                                                                                                                                                                 NA, NA, NA, NA, 1.3, 2.1, NA, 0.8, NA)), .Names = c("elain", 
                                                                                                                                                                                                                                                                                                                                     "kuivalanta", "kuivikelanta_kuivikepohjalanta", "lietelanta", 
                                                                                                                                                                                                                                                                                                                                     "virtsa"), row.names = c(NA, -28L), class = "data.frame")


#
#
#write.table(data.frame(unique(dat_lantakertoimet$elain)),file='clipboard',row.names=F)
#write.table(data.frame(unique(dat$elain)),file='clipboard',row.names=F)

key_table <- structure(list(elainyksikko = c("Lypsylehmä", "Emolehmä", "Hieho (12-24 kk)", 
                                             "Lihanauta (sonni 12-24 kk)", "Siitossonni (sonni > 2v)", "Vasikka (6-12 kk)", 
                                             "Vasikka (< 6 kk)", "Emakko porsaineen", "Lihasika*", "Karju", 
                                             "Joutilas emakko ydinsikalassa", "Vieroitettu porsas (5-11 vk, jos tilalla ei ole emakoita)", 
                                             "Hevonen 2 v ->", "Poni** 2 v ->, hevonen 1 v", "Pienponi 2 v, poni 1 v, hevonen < 1 v", 
                                             "Pienponi 1-2 v, poni < 1 v", "Pienponi < 1 v", "Lammas (uuhi karitsoineen)", 
                                             "Vuohi (kuttu kileineen, pukki)", "Munituskana", "Broileriemo", 
                                             "Kukko", "Emokalkkuna", "Lihakalkkuna*", "Broileri*", "Kananuorikko*", 
                                             "Emoankka, liha-ankka, emohanhi, lihahanhi, emofasaani, lihafasaani*", 
                                             "Emosorsa, lihasorsa*", "Viiriäinen, helmikana", "Kaninaaras poikasineen***", 
                                             "Strutsi", "Biisoni", "Villisika", "Minkki ja hilleri, siitosnaaras pentuineen", 
                                             "Minkki ja hilleri, pentu", "Minkki ja hilleri, siitosuros", 
                                             "Kettu ja supi, siitosnaaras pentuineen", "Kettu ja supi, pentu", 
                                             "Kettu ja supi, siitosuros"), lantakerroin = c("Lypsylehmä (8500 kg) 1", 
                                                                                            "Emolehmä", "Hieho", "Lihanauta, Sonni", "Lihanauta, Sonni", 
                                                                                            "Sonnivasikka 6-12 kk", "Sonnivasikka < 6 kk", "Emakko ja porsaat 4", 
                                                                                            "Lihasika 2, 3", "Karju (täysikasvuinen)", "Emakko ja porsaat satelliittisikalassa 5", 
                                                                                            "Vieroitettu porsas 6", "Hevonen > 150 cm", "Poni 120-150 cm", 
                                                                                            "Pienponi < 120 cm", "Pienponi < 120 cm", "Pienponi < 120 cm", 
                                                                                            "Lampaat ja karitsat", "Vuohet ja kilit", "Munituskana, Broileriemo", 
                                                                                            "Munituskana, Broileriemo", "", "Kalkkuna 2", "Kalkkuna 2", "Broileri 2", 
                                                                                            "", "Ankka, Hanhi 2", "Sorsa 2", "", "", "", "", "", "Minkki, Hilleri", 
                                                                                            "Minkki, Hilleri", "Minkki, Hilleri", "Kettu, Supi", "Kettu, Supi", 
                                                                                            "Kettu, Supi")), .Names = c("elainyksikko", "lantakerroin"), class = "data.frame", row.names = c(NA, 
                                                                                                                                                                                             -39L))
#


dat$jarj <- 1:nrow(dat)

dat <- merge(dat,key_table,by.x='elain',by.y='elainyksikko',all.x=T)
names(dat)[ncol(dat)] <- "lantakerroin_elain"

dat <- merge(dat,dat_lantakertoimet,by.x='lantakerroin_elain',by.y='elain',all.x=T)

dat <- dat[order(dat$jarj),]

dat <- select(dat,-jarj)


dat[dat$laji=='NA',]$laji <- 'Muu'


dat[is.na(dat)] <- 0

writeLines(toJSON(dat),'clipboard')


### CRAP

d <- read.table('clipboard',sep="\t",header=T,stringsAsFactors = F)

d2 <- melt(d,id.vars='ELÄIN')
d2 <- d2[d2$value!='',]
names(d2) <- c('elain',"lantakerroin","arvo")

d2$lantakerroin <- tolower(d2$lantakerroin)

d2$arvo <- as.numeric(gsub(',','.',d2$arvo))
d3 <- dcast(d2,elain~lantakerroin,value.var='arvo')


dat_lantakertoimet <- structure(list(elain = c("Ankka, Hanhi 2", "Broileri 2", "Emakko ja porsaat 4", 
                                               "Emakko ja porsaat satelliittisikalassa 5", "Emolehmä", "Hevonen > 150 cm", 
                                               "Hieho", "Joutilas emakko", "Kalkkuna 2", "Karitsat ja kilit 3-9 kk 7", 
                                               "Karitsat ja kilit 6-9 kk 7", "Karju (täysikasvuinen)", "Kettu, Supi", 
                                               "Lampaat ja karitsat", "Lehmävasikka < 6 kk", "Lehmävasikka 6-12 kk", 
                                               "Lihanauta, Sonni", "Lihasika 2, 3", "Lypsylehmä (8500 kg) 1", 
                                               "Minkki, Hilleri", "Munituskana, Broileriemo", "Pienponi < 120 cm", 
                                               "Poni 120-150 cm", "Sonnivasikka < 6 kk", "Sonnivasikka 6-12 kk", 
                                               "Sorsa 2", "Vieroitettu porsas 6", "Vuohet ja kilit"), kuivalanta = c(NA, 
                                                                                                                     NA, 2.2, 3.5, 16.9, NA, 6.6, 1.6, NA, NA, NA, 1.8, NA, NA, 3.1, 
                                                                                                                     6.1, 10.1, 1, 15.8, NA, NA, NA, NA, 4, 8, NA, 0.6, NA), kuivikelanta_kuivikepohjalanta = c(0.04, 
                                                                                                                                                                                                                15, 10.7, 15.5, 20.4, 17, 13.4, 4.9, 0.06, 1.3, 0.6, 6.1, 0.5, 
                                                                                                                                                                                                                1.3, 6.1, 9.7, 12.9, 3, 28.6, 0.25, 0.04, 8, 12, 7.1, 12.1, 25, 
                                                                                                                                                                                                                1.6, 1.3), lietelanta = c(NA, NA, 9.3, 12.7, 19, NA, 8.5, 3.9, 
                                                                                                                                                                                                                                          NA, NA, NA, 4.9, NA, NA, 3.6, 7.2, 12.1, 2.4, 25.5, NA, NA, NA, 
                                                                                                                                                                                                                                          NA, 4.7, 9.5, NA, 1.2, NA), virtsa = c(NA, NA, 6.8, 10.4, 1.9, 
                                                                                                                                                                                                                                                                                 NA, 2.9, 2.7, NA, NA, NA, 3.5, NA, NA, 1.1, 1.7, 1.7, 1.6, 8.7, 
                                                                                                                                                                                                                                                                                 NA, NA, NA, NA, 1.3, 2.1, NA, 0.8, NA)), .Names = c("elain", 
key_table <- read.table('clipboard',sep="\t",header=T,stringsAsFactors = F)


names(key_table) <- c('elainyksikko','lantakerroin')
