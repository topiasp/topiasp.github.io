// For holding global vars
global = {};


global.help = {};

global.XMLns = 'http://www.w3.org/2000/svg'


global.params = {
    verolajit: [
        { verolaji: "ALV",verolajikoodi: '300', verolajiselite: 'Arvonlisävero' },
        { verolaji: "YHT" , verolajikoodi: '200', verolajiselite:'Yhteisöjen tulovero'  },
        { verolaji: "HEVE", verolajikoodi: '100', verolajiselite: 'Henkilöasiakkaiden tulovero'  }
    
    ],
    selected: undefined,
    content: [],

    queryData:   { 
        queryJSON: 
        {
            "query": [
                {
                "code": "Verolaji",
                "selection": {
                    "filter": "item",
                    "values": [
                    "0"
                    , "100"
                    , "110"
                    , "120"
                    , "130"
                    , "140"
                    , "150"
                    , "200"
                    /* , "210"
                    , "220"
                    , "230" */
                    , "300"
                    , "400"
                    /*
                    , "500", "600", "601", "602", "603", 
        "604", "605", "606", "700", "610", "620", "630", "640", "650", 
        "660", "670", "680", "681", "682", "690", "691", "692", "693", 
        "713", "714", "715", "716", "717", "718", "694", "720"
        */
                    ]
                }
                },
                {
                "code": "Verovuosi",
                "selection": {
                    "filter": "item",
                    "values": [
                    "YYYY"
                    ]
                }
                },
                {
                "code": "Muuttuja",
                "selection": {
                    "filter": "item",
                    "values": [
                    "netto"
                    ]
                }
                },
                {
                "code": "Tiedot",
                "selection": {
                    "filter": "item",
                    "values": [
                    "Arvo"
                    ]
                }
                }
            ],
            "response": {
                "format": "json"
            }
        }
        ,URL: 'https://vero2.stat.fi/PXWeb/api/v1/fi/Vero/Verotulojen_kehitys/010_verotall_tau_101.px'  
    }

    ,data: undefined


}


