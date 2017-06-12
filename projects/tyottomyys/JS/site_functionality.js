
var urli=["https://pxnet2.stat.fi/PXWeb/api/v1/fi/StatFin/tym/tyonv/statfin_pxt_tym_tyonv_001.px",
"https://vero2.stat.fi/PXWeb/api/v1/fi/Vero/Verotulojen_kehitys/010_ansiokava_tau_101.px",
"https://vero2.stat.fi/PXWeb/api/v1/fi/Vero/Verotulojen_kehitys/010_verotall_tau_101.px"]

var pxwebTS = [];
var pxwebMeta = [];
var TS=[];
var kuvaan=[];
var tasoitettu=[];
var serieLabels=[];

var datasetsOnCanvas=[];
var chartData=[];


var kk = {
	arvo: 0,
	asetaArvo : function(x) { this.arvo=x },
	kasvata : function() {
       this.arvo=this.arvo+1;
	   if (this.arvo>12) {
		   this.arvo=1;
	   }
    } 
	
};


var colors=['rgb(0, 51, 153)','rgb(179, 0, 0)'];//,'rgb(179, 0, 0)'];
var colorIdx=0;

var varName='';

var regNums = new RegExp('^[0-9]+$');



function initialize() {
	document.getElementById('alpha_output').innerHTML=document.getElementById('alpha').value/100;
	document.getElementById('beta_output').innerHTML=document.getElementById('beta').value/100;
	document.getElementById('gamma_output').innerHTML=document.getElementById('gamma').value/100;
	
	
}

function toggleVisibility(id) {
	if (document.getElementById(id).style.display=='none') { document.getElementById(id).style.display='block';  }
	else { document.getElementById(id).style.display='none'; }
}

function toggleMethod(RB) {
	
	
}

function sliderChange(slider) {
	
	document.getElementById(slider.id+'_output').innerHTML=slider.value/100; 

	alpha=document.getElementById('alpha').value/100;
	beta=document.getElementById('beta').value/100;
	gamma=document.getElementById('gamma').value/100;
	var method;
	RBs=document.getElementsByName('radioButton_method')
	for (var i=0;i<RBs.length;i++) { if (RBs[i].checked) { method=RBs[i].value} }
	
	
	
	ennustettavia=12;
	L=12;
	
	tasoitettu=ES(TS,L,ennustettavia,alpha,beta,gamma,method)
	
	

	kuvaan=[]
	for (var i=1;i<tasoitettu.length;i++) {
		kuvaan.push((tasoitettu[i]["fit"]).toFixed(2));
	}
	labelsWithForecast=[];
	
	viimArvo=serieLabels[serieLabels.length-1];
	
		
	var aika = {
		kk: 0,
		vuosi: 0,
		asetaKK : function(x) { this.kk=x },
		asetaVuosi : function(x) { this.vuosi=x },
		kasvata : function() {
		   this.kk=this.kk+1;
		   if (this.kk>12) {
			   this.kk=1;
			   this.vuosi=this.vuosi+1;
		   }
		} 
		
	};
	
	aika.asetaKK(viimArvo.substring(5,8)*1);
	aika.asetaVuosi(viimArvo.substring(0,4)*1);	
	
	
	for (i=0;i<(serieLabels.length+ennustettavia);i++) {
			if (i<serieLabels.length) { labelsWithForecast.push(serieLabels[i]);}
			if (i>=serieLabels.length) {  aika.kasvata();	
										labelsWithForecast.push(aika['vuosi']+'M'+aika['kk']); }
	}
	draw(kuvaan,'Ennuste',cleanCanvas=true,init=false,labelsWithForecast)
	
	// Params -----------------------
	var param_output=document.getElementById('initial_values').innerHTML;
	var params=init_ES(TS,L,method);
	document.getElementById('initial_values').innerHTML='Level: '+params['init_level'].toFixed(2)+'<br>';
	document.getElementById('initial_values').innerHTML+='Trend: '+params['init_trend'].toFixed(2)+'<br>';
	seas=params['init_seas'];
	document.getElementById('initial_values').innerHTML+='Seasonals: ';
	for (i=0;i<seas.length;i++) { 
	document.getElementById('initial_values').innerHTML+=seas[i].toFixed(2)+', '
	}
	document.getElementById('initial_values').innerHTML+='<br>'
	// Tabulations
	var tab_output=[]//document.getElementById('initial_values').innerHTML;
	for (var i=1;i<tasoitettu.length;i++) { 
	
	}
	
	tab_output.push('<tr>')
	tab_output.push('<th>Kausi</th><th>Originaali</th><th>Sovitettu</th><th>Level</th><th>Trend</th><th>Seas</th>')
	tab_output.push('</tr>')
	
	tasoitettu.forEach(function(item){  
	k=Number(item["season_index"])+1;
	tab_output.push('<tr><td>'+k+'</td><td>'+item["S"].toFixed(2)+'</td><td>'+item["fit"].toFixed(2)+'</td><td>'+item["level"].toFixed(2)+'</td><td>'+item["trend"].toFixed(2)+'</td><td>'+item["seas"].toFixed(3)+'</td></tr>') 
	})

	document.getElementById("series").innerHTML=tab_output.join('');
	
	toggleVisibility('series');
	
	
	// Fit statistics-------------------------------------
	
	RSS=[];
	MSE=[];

	var stat_output=document.getElementById('stats').innerHTML;
	// RSS
	for (var i=1;i<TS.length;i++) { RSS.push((TS[i]-kuvaan[i])*(TS[i]-kuvaan[i]))}
	stat_output='RSS: '+RSS.reduce(summaa).toFixed(2);
	
	// MSE
	stat_output+='<br>MSE: '+keskiarvo(RSS).toFixed(2);
	// Out
	document.getElementById('stats').innerHTML=stat_output;
}


draw = function(arrayToDraw,arrayTitle,cleanCanvas,init,labels) {
	
	document.getElementById('plots').innerHTML='<canvas id="canvas_1" width="500" height="300" ></canvas>';
	
	console.log(labels)
	
	var canvasToDraw = document.getElementById("canvas_1");
	var context=canvasToDraw.getContext('2d');
	context.clearRect(0, 0, canvasToDraw.width, canvasToDraw.height);
	  
	
	  if (cleanCanvas & datasetsOnCanvas.length>1) { 
			datasetsOnCanvas.pop();
	  }
	  
	  if (init==false) {	  
	   datasetForecast={
                      label: arrayTitle,
                      fill: false,
                      lineTension: 0.1,
                      backgroundColor: colors[1],
                      borderColor: colors[1],
                      borderCapStyle: "butt",
                      borderDash: [4],
                      borderDashOffset: 0.0,
                      borderJoinStyle: "miter",
                      pointBorderColor: "rgba(75,192,192,1)",
                      pointBackgroundColor: "#fff",
                      pointBorderWidth: 1,
                      pointHoverRadius: 5,
                      pointHoverBackgroundColor: "rgba(75,192,192,1)",
                      pointHoverBorderColor: "rgba(220,220,220,1)",
                      pointHoverBorderWidth: 2,
                      pointRadius: 1,
                      pointHitRadius: 10,
                      data: arrayToDraw
					  , spanGaps: false,
                    };
		var chartData = {   
			labels:labels, 
			datasets:   [ datasetForecast, datasetOriginal ]
			};
					
	   }
	    if (init==true) {	  
	      datasetOriginal={
                      label: arrayTitle,
                      fill: false,
                      lineTension: 0.1,
                      backgroundColor: colors[0],
                      borderColor: colors[0],
					  borderOpacity: .3,
                      borderCapStyle: "butt",
                      borderDash: [],
                      borderDashOffset: 0.0,
                      borderJoinStyle: "miter",
                      pointBorderColor: "rgba(75,192,192,1)",
                      pointBackgroundColor: "#fff",
                      pointBorderWidth: 1,
                      pointHoverRadius: 5,
					  fillOpacity: .3,
                      pointHoverBackgroundColor: "rgba(75,192,192,1)",
                      pointHoverBorderColor: "rgba(220,220,220,1)",
                      pointHoverBorderWidth: 2,
                      pointRadius: 1,
                      pointHitRadius: 10,
                      data: arrayToDraw
					  , spanGaps: false,
                    };
					  var chartData = {   labels:labels,  datasets:   [ datasetOriginal ]    };
	   }
	  
	  
	 var newChart = new Chart(canvasToDraw, {
	type: "line",
	data: chartData	  });
	  
	 colorIdx++;
	 if (colorIdx>colors.length) { colorIdx=1; }
}


// haeSarja

function createTS(init,variableCodeForPX,regionCodeForPX) {
	
		
		
		
	if (regionCodeForPX.length==3  //&  regNums.test(regionCodeForPX.substr(0,1))
		) {
	
		pxwebGet(variableCodeForPX,regionCodeForPX);

		// Populate datalist
		if (init) {
			pxwebMeta=pxwebGetMeta(urli[0])
			var tmp=new Array;
			for (i = 0; i < pxwebMeta['variables'][2]['values'].length; i++) {  
				tmp[i]='<option  label="'+pxwebMeta['variables'][2]['valueTexts'][i]+'" value='+pxwebMeta['variables'][2]['values'][i]+'>'+pxwebMeta['variables'][2]['values'][i]+'</option>';
			}
			document.getElementById('taxList').innerHTML=tmp;
			
			
			var tmp=new Array;
			for (i = 0; i < pxwebMeta['variables'][1]['values'].length; i++) {  
			tmp[i]='<option  label="'+pxwebMeta['variables'][1]['valueTexts'][i]+'" value='+pxwebMeta['variables'][1]['values'][i]+'>'+pxwebMeta['variables'][1]['values'][i]+'</option>';
			}
			document.getElementById('regionList').innerHTML=tmp;
			
			
		}
		 
		serieLabels=pxwebMeta['variables'][0]['valueTexts'];
		 
		var kuvaan=[];
		for (var i=0;i<pxwebTS.length;i++) { kuvaan.push(Number(pxwebTS[i].values[0]))}
		TS=kuvaan;
		
		// Get name by variableCodeForPX
		
		varName='unknown';
		
		varCodes=pxwebMeta['variables'][2];
		for (i=0;i<varCodes['values'].length;i++) { 
				if (varCodes['values'][i]==variableCodeForPX) {
					varName=varCodes['valueTexts'][i];
					
				}
		}
		document.getElementById('header1').innerHTML=varName;
		
		
		draw(kuvaan,varName+'(alkuper.sarja)',true,init,serieLabels);
	}
}


function pxwebGet(muuttuja,alue) {	

		xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function () { 
		if (xhr.readyState == 4 && xhr.status == 200) {
			
			var resultRaw = JSON.parse(xhr.responseText);
			

			pxwebTS = resultRaw.data;
			
		}
		}
		
		var data = JSON.stringify({"query": [
		{ "code": 'Alue2017',"selection": {"filter": "item","values": [  alue ]  }  },
		{ "code": 'Muuttujat',"selection": {"filter": "item","values": [  muuttuja ]  }  }
		],"response": {"format": "json",   "params": null}});
		
		
	
		
		xhr.open("POST", urli[0], false);	
		xhr.send(data);
}

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

					
	