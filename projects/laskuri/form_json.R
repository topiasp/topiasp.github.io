

library(jsonlite
        )


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


writeLines(toJSON(dat),'clipboard')



