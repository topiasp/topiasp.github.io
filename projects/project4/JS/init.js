


//var indicator1 = new indicator();


//var indicators = []; 	// Holds for country level
var municipalities=[];	// Municipalities
var chosen='TYOTOSUUS';
var chosenMun;

function init() {
	
	PXwebCodes = ['TYOTOSUUS','TYOTTOMAT','PT9','TH5'];
	
	
	
	tyonvalitystilastoMeta=pxwebGetMeta(urli)['variables'];
	
	tyonvalitystilastoMuuttujat=[];
	
	for (z=0;z<tyonvalitystilastoMeta[2]['values'].length;z++) {
		
		tyonvalitystilastoMuuttujat[z] = {  value: 	tyonvalitystilastoMeta[2]['values'][z],
											valueText: 	tyonvalitystilastoMeta[2]['valueTexts'][z]
										 }	
	}

	//// Retrieve and form municipal data ----------------------------------------------------------------- /////////////////////////
	
	
	
	for (z=0;z<tyonvalitystilastoMeta[1]['values'].length;z++) {
		municipalities[z] = new municipality(id=tyonvalitystilastoMeta[1]['values'][z],
											name=tyonvalitystilastoMeta[1]['valueTexts'][z]
										 )	
	}
	
	
	// drop other regionlevels (maa-,seutukunta)
	
	municipalities=municipalities.filter(function(x) { return(x['name'].indexOf(' Kunta')>0 || x['id']=='SSS' ) } );
	municipalitiesList=municipalities.map(function(x) { return(x['id']);})
	
	// Retrieve data from API
	
	// Last timeunit
	
	last=tyonvalitystilastoMeta[0]['values']["length"]-1;
	time=[];
	time.push(tyonvalitystilastoMeta[0]['values'][ (last-12)]);
	time.push(tyonvalitystilastoMeta[0]['values'][ last])

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
		
	 //	tmp=municipalitiesDat.filter(function(x) { return(x['key'][1]==municipalities[z]['value']); })
		
		municipalities[z]['indicators']=obs;
		
	}
	
	
	// Create indicator buttons
	indicators=municipalities.filter(function(x) { return(x['id']=='SSS'); });
	// Initial chosenMun='SSS'
	chosenMun=indicators[0];
	indicators=indicators[0]['indicators'];
	
	for (i=0;i<indicators.length;i++) {
		
		comp=indicators[i].getComparison(1);
	    if (comp<0) {
			buttonClass='button positiveButton';
			type='positive';
		} else {
			buttonClass='button negativeButton';
			type='negative';
		}
		
		document.getElementById('indicatorButtons').innerHTML+="<button chosen='false'  class='"+buttonClass+"' id='"+indicators[i]['code']+"'>"+indicators[i].getInfo()
		+"</button>"; // "\n("+comp+")"+"
		
		
		
	}
	
	// Add eventlistener to buttons
	btns=document.getElementsByClassName('button');
	for (b=0;b<btns.length;b++) {
			btns[b].addEventListener("click", function() 	{ 	toggleChosen(this);	});
	}
	
	// Initial coloring + choise
	toggleChosen(document.getElementById(PXwebCodes[0]));
	
}




