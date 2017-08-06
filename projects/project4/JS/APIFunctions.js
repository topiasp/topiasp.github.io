
urli='https://pxnet2.stat.fi/PXWeb/api/v1/fi/StatFin/tym/tyonv/statfin_pxt_tym_tyonv_001.px';

function pxwebGetMeta(urli) {
		
		var metaReturn;
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				metaReturn= JSON.parse(this.responseText)
				
				}
		};
		xmlhttp.open("GET", urli, false);
		xmlhttp.send();
		
		
		
		return(metaReturn)
	
	
}



function pxwebGet(muuttuja,alue,aika) {	
		var pxwebTS = [];
		xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function () { 
		if (xhr.readyState == 4 && xhr.status == 200) {
			
			var resultRaw = JSON.parse(xhr.responseText);
			

			pxwebTS = resultRaw.data;
			
		}
		}
		if (alue.length==3) { 
			
			var data = JSON.stringify({"query": [
			{ "code": 'Alue2017',"selection": {"filter": "item","values": [  alue ]  }  },
			{ "code": 'Muuttujat',"selection": {"filter": "item","values":   muuttuja   }  }
			],"response": {"format": "json",   "params": null}});
			//console.log(data);

		}
		if (alue.length>3) { 
		console.log('More regions..')
		// pxwebGet('PT9',['091','049','092','564'],'2017M01')
			var data = JSON.stringify({"query": [
			{ "code": 'Alue2017',"selection": {"filter": "item","values":  alue    }  },
			{ "code": 'Kuukausi',"selection": {"filter": "item","values":  aika  }  },
			{ "code": 'Muuttujat',"selection": {"filter": "item","values":   muuttuja   }  }
			],"response": {"format": "json",   "params": null}});
			//console.log(data);

		}
		
		xhr.open("POST", urli, false);	
		xhr.send(data);
		
		return(pxwebTS);
		
}