var tyottomyys=[26911,26342,25363,24898,24729,27092,28383,25635,23636,23300,22838,24141,23276,22158,21194,20634,20590,22707,23940,20864,19216,18510,18017,19493,19171,18367,17694,17349,17475,19961,21135,18343,17354,16946,17094,19496,20102,20557,21190,21547,22199,25660,27722,25462,24516,24807,24904,26878,26375,25332,24663,24309,24607,27220,28754,25539,23975,23315,23125,24648,24188,23634,23116,22675,22798,25314,26770,24209,22922,22360,22187,23793,23743,23423,23028,22969,23359,26308,28089,25362,24508,24563,24785,26580,27832,28025,27755,27664,28222,31761,33779,31652,30671,30725,30627,32785,33482,33429,33421,33306,33849,37557,39492,37027,36044,35528,35969,38585,38932,38824,38713,38577,38924,43170,45135,42024,40665,39368,39225,41714,41812,41453,41016,40664,40917,44852,46712,43373,41445,40291,39529]


var urli=["http://pxnet2.stat.fi/PXWeb/api/v1/fi/StatFin/tym/tyonv/statfin_pxt_tym_tyonv_001.px",
"http://vero2.stat.fi/PXWeb/api/v1/fi/Vero/Verotulojen_kehitys/010_ansiokava_tau_101.px",
"http://vero2.stat.fi/PXWeb/api/v1/fi/Vero/Verotulojen_kehitys/010_verotall_tau_101.px"]

var pxwebTS = [];
var pxwebMeta = [];
var TS=[];
var kuvaan=[];
var tasoitettu=[];

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
	tasoitettu=ES(TS,L,ennustettavia,alpha,beta,gamma,method)
	if (ennustettavia>0) {
		for (i=0;i<ennustettavia;i++) {
			//datasetsOnCanvas[0].data.push(keskiarvo(datasetsOnCanvas[0].data));
		}
		
	}
	kuvaan=[]
	for (var i=1;i<tasoitettu.length;i++) {
	kuvaan.push((tasoitettu[i]["fit"]).toFixed(2));
	}
	draw(kuvaan,'Ennuste',cleanCanvas=true,init=false)
	
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
	
	tasoitettu.forEach(function(item){   k=Number(item["season_index"])+1;
	tab_output.push('<tr><td>'+k+'</td><td>'+item["S"].toFixed(2)+'</td><td>'+item["fit"].toFixed(2)+'</td><td>'+item["level"].toFixed(2)+'</td><td>'+item["trend"].toFixed(2)+'</td><td>'+item["seas"].toFixed(3)+'</td></tr>') })
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


draw =function(arrayToDraw,arrayTitle,cleanCanvas,init) {
	
	  document.getElementById('plots').innerHTML='<canvas id="canvas_1" width="400" height="200" ></canvas>';
		
	
	  var canvasToDraw = document.getElementById("canvas_1");
	  var context=canvasToDraw.getContext('2d');
	  context.clearRect(0, 0, canvasToDraw.width, canvasToDraw.height);
	  
	  var labels=[];
	  for (var i = 0, len = arrayToDraw.length; i < len; i++) { labels.push('T:'+i) }
	  
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
	var kuvaan=[];
	for (var i=0;i<pxwebTS.length;i++) { kuvaan.push(Number(pxwebTS[i].values[0]))}
	TS=kuvaan;
	/*TS=[30,21,29,31,40,48,53,47,37,39,31,29,17,9,20,24,27,35,41,38,
          27,31,27,26,21,13,21,18,33,35,40,36,22,24,21,20,17,14,17,19,
          26,29,40,31,20,24,18,26,17,9,17,21,28,32,46,33,23,28,22,27,
          18,8,17,21,31,34,44,38,31,30,26,32]
	*/kuvaan=TS;
	draw(kuvaan,'Originaali',true,init);
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

					
	