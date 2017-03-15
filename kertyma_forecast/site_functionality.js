var tyottomyys=[26911,26342,25363,24898,24729,27092,28383,25635,23636,23300,22838,24141,23276,22158,21194,20634,20590,22707,23940,20864,19216,18510,18017,19493,19171,18367,17694,17349,17475,19961,21135,18343,17354,16946,17094,19496,20102,20557,21190,21547,22199,25660,27722,25462,24516,24807,24904,26878,26375,25332,24663,24309,24607,27220,28754,25539,23975,23315,23125,24648,24188,23634,23116,22675,22798,25314,26770,24209,22922,22360,22187,23793,23743,23423,23028,22969,23359,26308,28089,25362,24508,24563,24785,26580,27832,28025,27755,27664,28222,31761,33779,31652,30671,30725,30627,32785,33482,33429,33421,33306,33849,37557,39492,37027,36044,35528,35969,38585,38932,38824,38713,38577,38924,43170,45135,42024,40665,39368,39225,41714,41812,41453,41016,40664,40917,44852,46712,43373,41445,40291,39529]
var grisha= [30,21,29,31,40,48,53,47,37,39,31,29,17,9,20,24,27,35,41,38,
          27,31,27,26,21,13,21,18,33,35,40,36,22,24,21,20,17,14,17,19,
          26,29,40,31,20,24,18,26,17,9,17,21,28,32,46,33,23,28,22,27,
          18,8,17,21,31,34,44,38,31,30,26,32]
		  
var austourists=[30.052513,19.148496,25.317692,27.591437,32.076456,23.487961,28.47594,35.123753,36.838485,25.007017,30.72223,28.693759,36.640986,23.824609,29.311683,31.770309,35.177877,19.775244,29.60175,34.538842,41.273599,26.655862,28.279859,35.191153,41.727458,24.04185,32.328103,37.328708,46.213153,29.346326,36.48291,42.977719,48.901525,31.180221,37.717881,40.420211,51.206863,31.887228,40.978263,43.772491,55.558567,33.850915,42.076383,45.642292,59.76678,35.191877,44.319737,47.913736];

var urli=["http://pxnet2.stat.fi/PXWeb/api/v1/fi/StatFin/tym/tyonv/statfin_pxt_tym_tyonv_001.px",
"http://vero2.stat.fi/PXWeb/api/v1/fi/Vero/Verotulojen_kehitys/010_ansiokava_tau_101.px",
"http://vero2.stat.fi/PXWeb/api/v1/fi/Vero/Verotulojen_kehitys/010_verotall_tau_101.px"]

var pxwebTS = [];
var pxwebMeta = [];
var TS=[];
var kuvaan=[];
var tasoitettu=[];
var serieLabels=[];

var datasetsOnCanvas=[];
var chartData=[];


var colors=['rgb(0, 51, 153)','rgb(179, 0, 0)'];//,'rgb(179, 0, 0)'];
var colorIdx=0;




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
	
	/* For testing with 'tyottomyys':
	 Smoothing parameters:
    alpha = 0.9264 
    beta  = 0.0432 
    gamma = 0.4545 

	  Initial states:
		l = 25272.3333 
		b = -365.7569 
		s=-1131.333 -2434.333 -1972.333 -1636.333 362.6667 3110.667
			   1819.667 -543.3333 -374.3333 90.6667 1069.667 1638.667
	
	library(forecast)
	library(fpp)
	tyottomyys=c(26911,26342,25363,24898,24729,27092,28383,25635,23636,23300,22838,24141,23276,22158,21194,20634,20590,22707,23940,20864,19216,18510,18017,19493,19171,18367,17694,17349,17475,19961,21135,18343,17354,16946,17094,19496,20102,20557,21190,21547,22199,25660,27722,25462,24516,24807,24904,26878,26375,25332,24663,24309,24607,27220,28754,25539,23975,23315,23125,24648,24188,23634,23116,22675,22798,25314,26770,24209,22922,22360,22187,23793,23743,23423,23028,22969,23359,26308,28089,25362,24508,24563,24785,26580,27832,28025,27755,27664,28222,31761,33779,31652,30671,30725,30627,32785,33482,33429,33421,33306,33849,37557,39492,37027,36044,35528,35969,38585,38932,38824,38713,38577,38924,43170,45135,42024,40665,39368,39225,41714,41812,41453,41016,40664,40917,44852,46712,43373,41445,40291,39529)
	tyottomyys <- ts(tyottomyys,frequency=12)
	fit1 <- hw(tyottomyys,h=12,frequency=12,seasonal='additive',initial = 'simple')
	summary(fit1)

	
     alpha = 0.9264 
    beta  = 0.0432 
    gamma = 0.4545 
*/
	
	tasoitettu=ES(TS,L,ennustettavia,alpha,beta,gamma,method)
	
	

	kuvaan=[]
	for (var i=1;i<tasoitettu.length;i++) {
	kuvaan.push((tasoitettu[i]["fit"]).toFixed(2));
	}
	labelsWithForecast=[];
	for (i=0;i<(serieLabels.length+ennustettavia);i++) {
			if (i<=serieLabels.length) { labelsWithForecast.push(serieLabels[i]);}
			if (i>serieLabels.length) { 	labelsWithForecast.push('T+'+i) }
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
	// Taulukointi viimeisestä ensimmäiseen
	/*
	for (var i=(tasoitettu.length-1);i=>1;i--) {
		//console.log(i)
		testi=tasoitettu[i];
	//k=Number(tasoitettu[i]["season_index"])+1;
	k=Number(testi["season_index"])+1;
	tab_output.push('<tr><td>'+k+'</td><td>'+testi["S"].toFixed(2)+'</td><td>'+testi["fit"].toFixed(2)+'</td><td>'+testi["level"].toFixed(2)+'</td><td>'+testi["trend"].toFixed(2)+'</td><td>'+testi["seas"].toFixed(3)+'</td></tr>') 
	
	//tab_output.push('<tr><td>'+k+'</td><td>'+tasoitettu[[i]]["S"].toFixed(2)+'</td><td>'+tasoitettu[[i]]["fit"].toFixed(2)+'</td><td>'+tasoitettu[[i]]["level"].toFixed(2)+'</td><td>'+tasoitettu[[i]]["trend"].toFixed(2)+'</td><td>'+tasoitettu[[i]]["seas"].toFixed(3)+'</td></tr>') 
	}
	*/
	
	document.getElementById("series").innerHTML=tab_output.join('');
	
	
	
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


draw =function(arrayToDraw,arrayTitle,cleanCanvas,init,labels) {
	
	  document.getElementById('plots').innerHTML='<canvas id="canvas_1" width="400" height="200" ></canvas>';
		
	
	  var canvasToDraw = document.getElementById("canvas_1");
	  var context=canvasToDraw.getContext('2d');
	  context.clearRect(0, 0, canvasToDraw.width, canvasToDraw.height);
	  
	  //var labels=[];
	  //for (var i = 0, len = arrayToDraw.length; i < len; i++) { labels.push('T:'+i) }
	  
	  
	  
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
                      borderDash: [],
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
					 var chartData = {   labels:labels,  datasets:   [datasetOriginal, datasetForecast ]    };
					
	   }
	    if (init==true) {	  
	      datasetOriginal={
                      label: arrayTitle,
                      fill: false,
                      lineTension: 0.1,
                      backgroundColor: colors[0],
                      borderColor: colors[0],
                      borderCapStyle: "butt",
                      borderDash: [],
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
					  var chartData = {   labels:labels,  datasets:   [datasetOriginal ]    };
	   }
	  
	  console.log(chartData.length)
	  var newChart = new Chart(canvasToDraw, {
		type: "line",
		data: chartData	  });
	  
	 colorIdx++;
	 if (colorIdx>colors.length) { colorIdx=1; }
}


// haeSarja

function createTS(init,variableCodeForPX) {
	
	pxwebGet(variableCodeForPX);
	
	
	
	// Populate datalist
     if (init) {
		 pxwebMeta=pxwebGetMeta(urli[2])
	var tmp=new Array;
	for (i = 0; i < pxwebMeta['variables'][0]['values'].length; i++) {  tmp[i]='<option  label="'+pxwebMeta['variables'][0]['valueTexts'][i]+'" value='+pxwebMeta['variables'][0]['values'][i]+'>'+pxwebMeta['variables'][0]['values'][i]+'</option>'; }
	document.getElementById('taxList').innerHTML=tmp;
	 }
	 
	serieLabels=pxwebMeta['variables'][2]['valueTexts'];
	 
	var kuvaan=[];
	for (var i=0;i<pxwebTS.length;i++) { kuvaan.push(Number(pxwebTS[i].values[0]))}
	TS=kuvaan;
	
	/* For testing. Source: https://grisha.org/blog/2016/02/17/triple-exponential-smoothing-forecasting-part-iii/ */
	TS=grisha;
	kuvaan=grisha;
	
	/* For testing. Source: https://www.otexts.org/fpp/data  /// fpp-package / timeseries 'austourists'	*/
	TS=austourists;
	kuvaan=austourists;
	
	/* For testing. Työttömyys 
	TS=tyottomyys;
	kuvaan=tyottomyys;
	serieLabels=[];
	for (var i=1;i<=tyottomyys.length;i++) {		serieLabels[i]='T'+i;	}
	 */
	draw(kuvaan,'Originaali',true,init,serieLabels);
}


function pxwebGet(muuttuja) {	

		var indicator='Muuttuja';
		var jakso='YYYY'
		

		xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function () { 
		if (xhr.readyState == 4 && xhr.status == 200) {
			
			var resultRaw = JSON.parse(xhr.responseText);
			

			pxwebTS = resultRaw.data;
			
		}
		}
		
		var data = JSON.stringify({"query": [
		{ "code": 'Verovuosi',"selection": {"filter": "item","values": [  jakso ]  }  },
		{ "code": 'Verolaji',"selection": {"filter": "item","values": [  muuttuja ]  }  },
		{ "code": indicator,"selection": {"filter": "item","values": [  'brutto' ]  }  }],"response": {"format": "json",   "params": null}});
		
		
	
		
		xhr.open("POST", urli[2], false);	
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

					
	