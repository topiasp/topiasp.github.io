
valitutMuuttujat = new Array();

var pxwebTS = new Array();
var pxwebMeta = new Array();
var pxwebMetaTyokay = new Array();

var tableMeta = new Array(); // Sisältää kaikki metat arrayna
var aluekoodi;
var aluenimi;
var muuttuja;
var aluemuuttujanNimi;
var urlit =[
"https://pxnet2.stat.fi/PXWeb/api/v1/fi/StatFin/tym/tyonv/statfin_pxt_tym_tyonv_001.px",
'https://pxnet2.stat.fi/PXWeb/api/v1/fi/StatFin/vrm/tyokay/010_tyokay_tau_101.px',
'https://pxnet2.stat.fi/PXWeb/api/v1/fi/StatFin/tym/tyonv/statfin_pxt_tym_tyonv_003.px'
]

var ekaMahdVuosi;

var muuttujatObj=new Array;
var alueValues=new Array;
var alueValueTexts=new Array;
var muuttujaValues=new Array;
var muuttujaValueTexts=new Array;
var ajankohtaValues=new Array;
var ajankohtaValueTexts=new Array;
var y=new Array(); /* For leastSquares */


// Variaabeli constructor

function variaabeli(koodi,selite,tilasto,urli,aluemuuttuja,aika,indicator,aikayksikoita) {
    this.koodi=koodi;
	this.selite=selite;
	this.tilasto=tilasto;
	this.urli=urli;
	this.aluemuuttuja=aluemuuttuja;
	this.aikayksikko=aika;
	this.indicator=indicator;
	this.aikayksikoita=aikayksikoita;
}


// tbl constructor

function tbl(id,urli,tUnit,tUnits,tMin) {
	this.id=id;
	this.urli=urli;
	this.tUnit=tUnit;
	this.tUnits=tUnits;
	this.tMin;
	this.tMinRaw;

}

// jquery

$(document).ready(function(){
		

			
		
			
			
			urlit.forEach(function(item){ tableMeta.push(pxwebGetMeta(item));	})
			pxwebMeta = tableMeta[0];
			pxwebMetaTyokay = tableMeta[1];
				
			// Add event listeners to inputs
			// Aiheuttavat virheen
			//document.getElementById('userInputText_area').addEventListener('input', function () { piirra(this) })
			//document.getElementById('userInputText_variable').addEventListener('input', function () { piirra(this) })
			
			// Populate datalists------------------------------------------
			
			aluemuuttujanNimi=pxwebMeta.variables[1].code; // JSON-querya varten. Ko. muuttujan nimeen on kovakoodattu aluejaon vuosi
			
			
			ajankohtaValues=pxwebMeta.variables[0].values;
			ajankohtaValueTexts=pxwebMeta.variables[0].valueTexts;
			ajankohtaValueMin=pxwebMeta.variables[0].values[0].substr(0,4);
			
			ajankohtaValuesTyokay=pxwebMetaTyokay.variables[4].values;
			ajankohtaValueTextsTyokay=pxwebMetaTyokay.variables[4].valueTexts;
			ajankohtaValueTyokayMin=pxwebMetaTyokay.variables[4].values[0];
			
			ekaMahdVuosi=[Number(ajankohtaValueTyokayMin),Number(ajankohtaValueMin)]
			ekaMahdVuosi=Math.max(...ekaMahdVuosi);
			
			
			
			alueValues=pxwebMeta.variables[1].values;
			alueValueTexts=pxwebMeta.variables[1].valueTexts;
			
			// KOKO MAA -> Koko maa
			alueValueTexts[0] = 'Koko maa';
			
			//pxwebMetaTyokay.variables[0].values);
			//pxwebMetaTyokay.variables[0].values);
			
			muuttujaValues=pxwebMeta.variables[2].values;
			muuttujaValueTexts=pxwebMeta.variables[2].valueTexts;
			
			for (var i=0;i<muuttujaValues.length;i++) {
				tmpObj = new variaabeli(muuttujaValues[i],muuttujaValueTexts[i],'tyonv',urlit[0],pxwebMeta.variables[1].code,'kuukausi','Muuttujat',ajankohtaValueTexts.length)
				muuttujatObj.push(tmpObj)
				
			}
			tmp=pxwebMetaTyokay.variables[1].values;
			tmp1=pxwebMetaTyokay.variables[1].valueTexts;
			for (var i=0;i<tmp.length;i++) {
				tmpObj = new variaabeli(tmp[i],tmp1[i],'tyokay',urlit[1],pxwebMetaTyokay.variables[0].code,'vuosi','Pääasiallinen toiminta',ajankohtaValueTextsTyokay.length)
				muuttujatObj.push(tmpObj)
				
			}
		   
			
			
			
			pxwebMetaTyokay.variables[1].values.forEach(function(item){ muuttujaValues.push(item) })
			pxwebMetaTyokay.variables[1].valueTexts.forEach(function(item){ muuttujaValueTexts.push(item+'(TYOKAY)') })
			
			 
			
			
			// Muodostetaan optiolist kunnista
			var tmp=new Array;
			for (i = 0; i < alueValueTexts.length; i++) {  tmp[i]='<option  value="'+alueValueTexts[i]+'">'+alueValues[i]+'</option>'; }
			document.getElementById('kuntaList').innerHTML=tmp;

			// Muodostetaan optiolist muuttujista
			var tmp=[];
			for (i = 0; i < muuttujaValues.length; i++) {   tmp[i]='<option value="'+muuttujaValueTexts[i]+'">'+muuttujaValues[i]+'</option>';	}
			document.getElementById('muuttujaList').innerHTML=tmp;
			
			
			// Get from api and from plot
			haeSarja("TYOTTOMAT","SSS","Koko maa","Työttömät");
			
		
			
			// Buttonit falseksi
			
			document.getElementById('smoothButton').checked=false;
			document.getElementById('scaleButton').checked=false;
			 
			

			$("#tyhjennysnappula").click(function(){
				

				valitutMuuttujat=[]
				document.getElementById('boxContainer').innerHTML=""; 
								$.plot("#placeholder", [1,2,3],
					{  legend: {     show: true,   container: $('#legend-container')  },
					xaxis: {ticks: [3,2,1]	}
					}
					);
			});
			
			$(".button").click(function(){
			 
			 this.checked=!this.checked;
			 if (this.checked) { 			 $(this).css("background", "#286090");			 $(this).css("color", "#fff");			 }
			 if (!this.checked) { 			 $(this).css("background", "white");			 $(this).css("color", "black");			 }
			});
			
		
			$( document).keypress(function(e) {
			
				if (e.keyCode==13) { 

				piirra()
				}
			
			});
			
	
			
			

});

// piirra

function piirra(valinta) {
				
				var alueNimi=document.getElementById("userInputText_area").value; 
				var muuttujaNimi=document.getElementById("userInputText_variable").value;

				muuttujakoodi=muuttujaValues[muuttujaValueTexts.indexOf(muuttujaNimi)];
				aluekoodi=alueValues[alueValueTexts.indexOf(alueNimi)];
			
				haeSarja(muuttujakoodi,aluekoodi,alueNimi);
}


// haeSarja
function haeSarja(muuttuja,aluekoodi,alueNimi) {
				
				M=muuttujatObj.find(function(a){ return a.koodi == muuttuja });
				pxwebGet(muuttuja,aluekoodi,M.aluemuuttuja,M.indicator,M.urli,alueNimi,M);		
}

function kasitteleSarja(pxwebTS,alueNimi,M) {
				
				sarja = new Array();
				var d1 = [];
				var tikkeja = [];
				var i;
				for(i = 0; i < pxwebTS.length; i++) {
						/* Vuosien venytys */
						if (M.aikayksikko=='vuosi') { 
							if (pxwebTS[i].key[2]>=(ekaMahdVuosi-1)) { 
									sarja.push(pxwebTS[i].values);
									rep=Array(11).join(pxwebTS[i].values+',').split(',');
									rep.splice(-1,1);
									sarja=sarja.concat(rep);
									//tikkeja.push([(i),pxwebTS[0].key[2]])
							}
						
						
						}
						
					  else {
						sarja.push(pxwebTS[i].values);
					//	tikkeja.push([i,pxwebTS[0].key[0]])

					  }
						y.push(i+1);
				}
				
				
					

				/*---------------  Tasoitus---------------- */

				if (document.getElementById("smoothButton").checked) { sarja =kuukausitasoitus(sarja); }
				
				/*---------------  Skaalaus---------------- */
				
				if (document.getElementById("scaleButton").checked) {	sarja=skaalaus(sarja);		}
				
				/*--------------- Lisätäänkö sarja olemassaoleviin vai ei ------------- */
				if (document.getElementById("toAddOrNotButton").checked) {	valitutMuuttujat=[]; document.getElementById('boxContainer').innerHTML=""; 		}
				
				
				var d1 = [];
				
				for (var i = 0; i < sarja.length; i += 1) { 	d1.push([i,sarja[[i]]]); 		}
				
				setti={ label: alueNimi+'/'+M.selite,data: d1, lines: { show: true }}
			
				valitutMuuttujat.push(setti)
				
				if (M.aikayksikko=='vuosi') { 
					  
					 // for (var i=0;i<(M.aikayksikoita*12);i++) { tikkeja.push([i,'T'+1]);}

				}

				for (var i=0;i<=ajankohtaValueTexts.length;i+=2) { tikkeja.push([i,ajankohtaValueTexts[i]]); } 
				
				
				
				$.plot("#placeholder", valitutMuuttujat,
				{  legend: {     show: true,   container: $('#legend-container')  },
				xaxis: {ticks: tikkeja	}
				}
				);
				
				// Fade out & fade in
				$('#placeholder').fadeOut().fadeIn('#placeholder');
				
				/*--------------- Infoboxes---------------- */
				if (document.getElementById("smoothButton").checked==false & document.getElementById("scaleButton").checked==false) {
				/* Viimeisin tieto */
			    var fig1=sarja[sarja.length-1];
				var col="black";
				addBox(fig1,"Viimeisin tieto",col);
				/* 5-vuotismuutos */
			    var fig1=sarja[sarja.length-1]-sarja[(sarja.length-61)];
				var col="darkred";
				if (fig1<0) { col='green';}
				
				//if (muuttuja.indexOf('osuus')) { alert(muuttuja); fig1=fig1.toFixed(2)} TODO
				addBox(fig1,"5-vuotismuutos",col);
				
				/* Vuosimuutos */
			    var fig1=sarja[sarja.length-1]-sarja[(sarja.length-13)];
				var col="darkred";
				if (fig1<0) { col='green';}
				addBox(fig1,"Vuosimuutos",col);
				
				/* Kuukausimuutos */
				var fig2=sarja[sarja.length-1]-sarja[(sarja.length-2)];
				var col="darkred";
				if (fig2<0) { col='green';}
				addBox(fig2,"Kuukausimuutos",col);
				}
				$('.box').fadeOut().fadeIn('slow');
				
}



function addBox(figure,header,col="white") {
	
	
	
	document.getElementById('boxContainer').innerHTML+="<div class='box' style='color:"+col+";'><div class='box-header'>"+header+"</div><div class='box-figure'>"+figure+"</div></div>";
	
	
	
	
	
	
}

/* Math-funktiot */

function keskiarvo(arr){
    var total = 0;
    for(var i = 0;i < arr.length; i++) { 
        total+=Number(arr[i]);
    }
	
    return total/arr.length;
}
function keskihajonta(arr) {
	var varianssi =0;
	ka = keskiarvo(arr);
	for(var i = 0;i < arr.length; i++) { 
		
		varianssi+=(Number(arr[i])-ka)*(Number(arr[i])-ka);
	
	}
	varianssi = varianssi/arr.length;
	return(Math.sqrt(varianssi))
}
function skaalaus(arr) {
	
	var skaalattu = [];
	
	ka = keskiarvo(arr);
	kh = keskihajonta(arr);
	for(var i = 0;i < arr.length; i++) { 	skaalattu[i] = (Number(arr[i])-ka)/kh	}
	return(skaalattu)
}
function summaa(a, b) {
    return a + b;
}
function leastSquares(y,x) {
// mY <- mean(y)
// mX <- mean(x)
// b1 <- sum((x-mX)*(y-mY))/sum(((x-mX)*(x-mX)))
// b0 <- mY-(b1*mX)
		
		mY=keskiarvo(y);
		mX=keskiarvo(x);		
		
		xApu=[];
		yApu=[];
		numerator=[];
		denominator=[];
		for (var i=0;i<y.length;i++) {
			xApu.push(x[i]-mX)
			yApu.push(y[i]-mY)
			numerator[i]=xApu[i]*yApu[i];
			denominator[i]=xApu[i]*xApu[i];
		}
		var a=numerator.reduce(summaa);
		var b=denominator.reduce(summaa);
		var b1=a/b;
		var b0=mY-(b1*mX);
		var palautus=[b0,b1]
		return(palautus)
	
}
function kuukausitasoitus(ts) {
	
	lm_fit =leastSquares(ts,y);

	keskiarvot=new Array();
	palautusSarja = new Array();
	for (var kuukausi=0;kuukausi<12;kuukausi++) {
		var i=kuukausi;
		var apu=new Array;
		while(i<ts.length) { 
			apuluku=lm_fit[0]+(lm_fit[1]*(i+1));
			apu.push(ts[i]-apuluku);
			i=i+12;	
			}
		keskiarvot.push(keskiarvo(apu));
	}
	kuukausi=0;
	
	for (var kokonaiskesto=0;kokonaiskesto<ts.length;kokonaiskesto++) {
		
		palautusSarja[kokonaiskesto]=ts[kokonaiskesto]-keskiarvot[kuukausi];
		kuukausi=kuukausi+1;
		
		if (kuukausi>11) { kuukausi=0; } 
	}
	return(palautusSarja)
}


/* Get from API */

function pxwebGetMeta(urli) {
		
		var metaReturn;
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				metaReturn= JSON.parse(this.responseText)
				//pxwebMeta = JSON.parse(this.responseText); //this.responseText;//M
				//document.getElementById('testi').innerHTML=pxwebMeta.title;
				}
		};
		xmlhttp.open("GET", urli, false);
		xmlhttp.send();
		
		return(metaReturn)
	
	
}

function pxwebGet(muuttuja,kuntakoodi,aluemuuttuja,indicator,urli,alueNimi,M) {	
		
		
		xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function () { 
		if (xhr.readyState == 4 && xhr.status == 200) {
			
			var resultRaw = JSON.parse(xhr.responseText);
			//document.getElementById('testi').innerHTML='Haetaan.. Haettu.';

			pxwebTS = resultRaw.data;
			
			kasitteleSarja(pxwebTS,alueNimi,M);
			
		}
		}
		
		var data = JSON.stringify({"query": [{ "code": aluemuuttuja,"selection": {"filter": "item","values": [  kuntakoodi ]  }  },
		{ "code": indicator,"selection": {"filter": "item","values": [  muuttuja ]  }  }],"response": {"format": "json",   "params": null}});
		

		xhr.open("POST", urli, true);	
		xhr.send(data);
}





