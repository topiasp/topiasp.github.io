


# Kirjastot
source("https://topiasp.github.io/projects/osinkokartta_r_ohjelmointi/createMap.R")
library(pxweb)
library(jsonlite)
library(reshape)
library(RColorBrewer)
library(dplyr)

# Esimerkkidata: Osinkoja listatuista yhtiˆist‰ saaneet kunnittain + asiakkaiden m‰‰r‰

dat <-  get_pxweb_data(url = "http://vero2.stat.fi/PXWeb/api/v1/fi/Vero/Henkiloasiakkaiden_tuloverot/lopulliset/Alue/191_alue.px",
                 dims = list(Verovuosi = c('2015'),
                             Er‰ = c('HT_T_10',
                                     'HT_PT_5_1_3'),
                             Alue = c('*'),
                             "Tuloluokka *" = c('T000'),
                             Tunnusluvut = c('N','Median')),
                 clean = TRUE)
#[HT_PT_5_1_3]   5.1.3 - P‰‰omatulona verotetut osingot (listatut yhtiˆt) (TVL 33 ß)

# Haetaan kuntakoodit erikseen
datMeta <- readLines("http://vero2.stat.fi/PXWeb/api/v1/fi/Vero/Henkiloasiakkaiden_tuloverot/lopulliset/Alue/191_alue.px",
                     warn=F,encoding='UTF-8')
koodisto <- fromJSON(datMeta)
koodisto <- data.frame(kuntakoodi=koodisto$variables$values[[3]],kuntanimi=koodisto$variables$valueTexts[[3]],stringsAsFactors = F)

# Pelk‰t kuntakoodit 
koodisto <- subset(koodisto,nchar(kuntakoodi)==3)

# Yhdistet‰‰n data & koodisto (samalla tippuu muut aluetasot)
dat <- merge(dat,koodisto,by.x='Alue',by.y='kuntanimi')

# Inhimillisemm‰t nimet
levels(dat$Er‰) <- c('asiakkaita','osinkoja')

# Tiputetaan turhat muuttujat
dat <- dat[,c('Alue','Er‰','values','kuntakoodi','Tunnusluvut')]

# Tunnusluvut riveilt‰ sarakkeiksi
dat <- data.frame(cast(dat,Alue+kuntakoodi~Er‰+Tunnusluvut,value='values'))

# Poistetaan v.2015 lakkautetut kunnat, joille ei lˆydy lukuja aineistosta sek‰ koko maan tiedot
dat <- dat[!is.na(dat$asiakkaita_Saajien.lukum‰‰r‰),]
dat <- dat[dat$kuntakoodi!='000',]

# Luodaan kuntanimi-muuttuja karttafunktiota varten ja konvertoidaan faktorista characteriksi
dat$kuntanimi <- as.character(dat$Alue)

# Korjataan v. 2016 kuntaliitokset 
dat[dat$kuntakoodi==532,c('kuntakoodi','kuntanimi')] <- c('398','Lahti') 
dat[dat$kuntakoodi==164,c('kuntakoodi','kuntanimi')] <- c('301','Kurikka')
dat[dat$kuntakoodi==283,c('kuntakoodi','kuntanimi')] <- c('098','Hollola')
dat[dat$kuntakoodi==319,c('kuntakoodi','kuntanimi')] <- c('783','S‰kyl‰')
dat[dat$kuntakoodi==442,c('kuntakoodi','kuntanimi')] <- c('051','Eurajoki')
dat[dat$kuntakoodi==174,c('kuntakoodi','kuntanimi')] <- c('297','Kuopio')

## Lasketaan tunnusluvut ja aggregoidaan uusiksi kuntaliitosten huomioimiseksi

kd <- data.frame(dat %>% group_by(kuntakoodi,kuntanimi) %>%
                   summarise(
                   osinkoja_saaneiden_osuus=round(sum(osinkoja_Saajien.lukum‰‰r‰)/sum(asiakkaita_Saajien.lukum‰‰r‰)*100,2),
                   asiakkaita=sum(asiakkaita_Saajien.lukum‰‰r‰),
                   osingonsaajia=sum(osinkoja_Saajien.lukum‰‰r‰),
                   mediaaniosinko=weighted.mean(x=osinkoja_Mediaani,w=osinkoja_Saajien.lukum‰‰r‰))
)
            
# Luodaan kartat: 1. pelkk‰ svg ja 2. html-sivu
# Huom.: Tiedostot muodostetaan tyˆhakemistoon

# 1.
createMap(dataToMap=kd,type='svg',variableToMap ='osinkoja_saaneiden_osuus',title='Osingot 2015'
          ,numberOfClasses = 10)
# 2.
createMap(dataToMap=kd,type='html',variableToMap= 'osinkoja_saaneiden_osuus',title='Osingot 2015',numberOfClasses = 10)

