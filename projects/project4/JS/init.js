



var municipalities=[];	// Municipalities
var chosen='TYOTOSUUS'; // Code for which indicator/button is chosen


function init() {
	
	PXwebCodes = ['TYOTOSUUS','TYOTTOMAT','PT9','TH5'];
	
	
	
	tyonvalitystilastoMeta=pxwebGetMeta(urli)['variables'];
	
	tyonvalitystilastoMuuttujat=[];
	
	for (z=0;z<tyonvalitystilastoMeta[2]['values'].length;z++) {
		
		tyonvalitystilastoMuuttujat[z] = {  value: 	tyonvalitystilastoMeta[2]['values'][z],
											valueText: 	tyonvalitystilastoMeta[2]['valueTexts'][z]
										 }	
	}

	// Retrieve and form municipal data
	
	
	
	for (z=0;z<tyonvalitystilastoMeta[1]['values'].length;z++) {
		municipalities[z] = new municipality(id=tyonvalitystilastoMeta[1]['values'][z],
											name=tyonvalitystilastoMeta[1]['valueTexts'][z]
										 )	
	}
	
	
	// drop other region levels (maa- & seutukunta)
	
	municipalities=municipalities.filter(function(x) { return(x['name'].indexOf(' Kunta')>0 || x['id']=='SSS' ) } );
	municipalitiesList=municipalities.map(function(x) { return(x['id']);})

	// Last timeunit
	
	last=tyonvalitystilastoMeta[0]['values']["length"]-1;
	time=[];
	time.push(tyonvalitystilastoMeta[0]['values'][ (last-12)]); 
	time.push(tyonvalitystilastoMeta[0]['values'][ last])
	
	// Retrieve data from API

	municipalitiesDat=pxwebGet(PXwebCodes,municipalitiesList,time);
	
	// Create municipalities objects 
	
	
	
	for (z=0;z<municipalities.length;z++) {
		
		tmp=municipalitiesDat.filter(function(x) { return(x['key'][1]==municipalities[z]['id']); })
		obs=[];
		for (x=0;x<PXwebCodes.length;x++) {
			
			varName=PXwebCodes[x];
			for (help=0;help<tyonvalitystilastoMuuttujat.length;help++) {
			// tyonvalitystilastoMuuttujat.filter(function(x) {	return(x['value']==PXwebCodes[i]);	}); // ?? 
				if (tyonvalitystilastoMuuttujat[help]['value']==PXwebCodes[x]) {
				varName=tyonvalitystilastoMuuttujat[help]['valueText'];
				}			
			}
			
			
			tmp2=tmp.filter(function(y) { return(y['key'][2]==PXwebCodes[x])		})
			
			var obj = new indicator(
				values=tmp2.map(function(y) { return(y['values'][0]) }),
				labels=tmp2.map(function(y) { return(y['key'][0]) }),
				name=varName,
				code=tmp2[0]['key'][2],
				id=tmp2[0]['key'][2]+tmp2[0]['key'][1]
				);
			
			
			
			obs.push(obj)
			
		}
		
		// Add indicator based on hardcoded data
		
		// Get index of last month of TYOTOSUUS
		
		lastTime=obs[0].getLastLabel().split('M')[1]*1;
		
		
		hardcodedInd=[];
		hardcodedInd=EMP1824.filter(function(x) { return(x['kuntakoodi']==municipalities[z].getId() & x['kuukausi']==lastTime) })[0];
		
		
		tmp=obs.filter(function(x) {  return(x['code']=='TH5') })[0].getLastValue();
		comp=obs.filter(function(x) {  return(x['code']=='TH5') })[0].getComparison(1);
		
		var obj = new indicator(
				values=[
					(comp/(hardcodedInd['tyollisia']*1+comp)*100).toFixed(1),
					(tmp/(hardcodedInd['tyollisia']*1+tmp)*100).toFixed(1)   ],
				labels=hardcodedInd['vuosi']+'M'+hardcodedInd['kuukausi'],
				name='Työttömien osuus työvoimasta (18-24.v)',
				code='tyollisia1824',
				id=municipalities[z].getId()+'tyollisia1824'
				);
				
		obs.push(obj)	
		
				
		municipalities[z]['indicators']=obs;
		
	}
	

	
	
	// Create indicator buttons with default value from SSS
	indicators=municipalities.filter(function(x) { return(x['id']=='SSS'); })[0];
	
	document.getElementById('header1').innerHTML=indicators.getName()+': '+indicators.getLastValueOfIndicator(chosen);
	
	indicators=indicators['indicators'];
	
	for (i=0;i<indicators.length;i++) {
				
		document.getElementById('indicatorButtons').innerHTML+="<button class='button' id='"+indicators[i]['code']+"'>"+indicators[i].getInfo()
		+"</button>"; 
		
		
		
	}
	
	// Add eventlistener to buttons
	btns=document.getElementsByClassName('button');
	for (b=0;b<btns.length;b++) {
			btns[b].addEventListener("click", function() 	{ 	toggleChosen(this);	});
	}
	
	// Initial coloring + choice
	toggleChosen(document.getElementById(PXwebCodes[0]));
	
}




