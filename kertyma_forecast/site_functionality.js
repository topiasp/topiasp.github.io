var tyottomyys=[26911,26342,25363,24898,24729,27092,28383,25635,23636,23300,22838,24141,23276,22158,21194,20634,20590,22707,23940,20864,19216,18510,18017,19493,19171,18367,17694,17349,17475,19961,21135,18343,17354,16946,17094,19496,20102,20557,21190,21547,22199,25660,27722,25462,24516,24807,24904,26878,26375,25332,24663,24309,24607,27220,28754,25539,23975,23315,23125,24648,24188,23634,23116,22675,22798,25314,26770,24209,22922,22360,22187,23793,23743,23423,23028,22969,23359,26308,28089,25362,24508,24563,24785,26580,27832,28025,27755,27664,28222,31761,33779,31652,30671,30725,30627,32785,33482,33429,33421,33306,33849,37557,39492,37027,36044,35528,35969,38585,38932,38824,38713,38577,38924,43170,45135,42024,40665,39368,39225,41714,41812,41453,41016,40664,40917,44852,46712,43373,41445,40291,39529]


var urli=["http://pxnet2.stat.fi/PXWeb/api/v1/fi/StatFin/tym/tyonv/statfin_pxt_tym_tyonv_001.px",
"http://vero2.stat.fi/PXWeb/api/v1/fi/Vero/Verotulojen_kehitys/010_ansiokava_tau_101.px"]

var pxwebTS = [];
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
	
	//drawD3(TS);
}

function sliderChange(slider) {
	
	document.getElementById(slider.id+'_output').innerHTML=slider.value/100; 

	alpha=document.getElementById('alpha').value/100;
	beta=document.getElementById('beta').value/100;
	gamma=document.getElementById('gamma').value/100;
	
	ennustettavia=12;
	tasoitettu=SES(TS,12,ennustettavia,alpha,beta,gamma)
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
	var params=init_SES(TS,12);
	document.getElementById('initial_values').innerHTML='Level: '+params['init_level'].toFixed(2)+'<br>';
	document.getElementById('initial_values').innerHTML+='Trend: '+params['init_trend'].toFixed(2)+'<br>';
	seas=params['init_seas'];
	document.getElementById('initial_values').innerHTML+='Seasonals: ';
	for (i=0;i<seas.length;i++) { 
	document.getElementById('initial_values').innerHTML+=seas[i].toFixed(2)+', '
	}
	document.getElementById('initial_values').innerHTML+='<br>'
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

function showValue(newValue,sliderId) {
	document.getElementById(sliderId).innerHTML=newValue;
}
draw =function(arrayToDraw,arrayTitle,cleanCanvas,init) {
	
	  var canvasToDraw = document.getElementById("canvas_1");
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
	  
	  
	  var newChart = new Chart(canvasToDraw, {
		type: "line",
		data: chartData	  });
	  
	 colorIdx++;
	 if (colorIdx>colors.length) { colorIdx=1; }
}

draw_orig =function(arrayToDraw,arrayTitle,cleanCanvas) {
	
	  var canvasToDraw = document.getElementById("canvas_1");
	  var labels=[];
	  for (var i = 0, len = arrayToDraw.length; i < len; i++) { labels.push('T:'+i) }
	  
	  if (cleanCanvas & datasetsOnCanvas.length>1) { 
	  
	  datasetsOnCanvas.pop();
	  }
	  
	  if (datasetsOnCanvas.length==1) {	  
	   datasetsOnCanvas[1]={
                      label: arrayTitle,
                      fill: false,
                      lineTension: 0.1,
                      backgroundColor: "rgba(75,192,192,0.4)",
                      borderColor: colors[colorIdx],
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
					
	   }
	    if (datasetsOnCanvas.length==0) {	  
	   datasetsOnCanvas[0]={
                      label: arrayTitle,
                      fill: false,
                      lineTension: 0.1,
                      backgroundColor: "rgba(75,192,192,0.4)",
                      borderColor: colors[colorIdx],
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
					
	   }
	  var chartData = {   labels:labels,  datasets:   datasetsOnCanvas    };
	  
	  var newChart = new Chart(canvasToDraw, {
		type: "line",
		data: chartData	  });
	  
	 colorIdx++;
	 if (colorIdx>colors.length) { colorIdx=1; }
}

drawD3 = function(arrayToDraw) {
	
		cleanCanvas=true;
	
	  var canvasToDraw = document.getElementById("canvas_1");
	  var labels=[];
	  var data=[]
	  for (var i = 0, len = TS.length; i < len; i++) { labels.push('T:'+i);
			data.push({'T':""+i+"",'value':""+TS[i].toFixed(0)+""});

	  }
	  
	  if (cleanCanvas & datasetsOnCanvas.length>1) { 
	  
	  datasetsOnCanvas.pop();
	  }
	  
	 lineData=arrayToDraw;
	 /*
		 var data = [{
		"sale": "202",
		"year": "2000"
	}, {
		"sale": "215",
		"year": "2001"
	}, {
		"sale": "179",
		"year": "2002"
	}, {
		"sale": "199",
		"year": "2003"
	}, {
		"sale": "134",
		"year": "2003"
	}, {
		"sale": "176",
		"year": "2010"
	}];
	*/
	 
	
	var vis = d3.select("#svg_1"),
    WIDTH = 1000,
    HEIGHT = 500,
    MARGINS = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 50
    },
	xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([1,arrayToDraw.length]),
	yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([8,12]),
	xAxis = d3.svg.axis().scale(xScale),
	yAxis = d3.svg.axis().scale(yScale);
	//vis.append("svg:g").call(xAxis);
	vis.append("svg:g").attr("class","axis").attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")").call(xAxis);
	//vis.append("svg:g").call(yAxis);
	yAxis = d3.svg.axis().scale(yScale).orient("left");
	vis.append("svg:g").attr("class","axis").attr("transform", "translate(" + (MARGINS.left) + ",0)").call(yAxis);
	
	var lineGen = d3.svg.line()
    .x(function(d) {
        return xScale(d.T);
    })
    .y(function(d) {
        return yScale(d.value);
    }).interpolate("basis");
	vis.append('svg:path').attr('d', lineGen(data)).attr('stroke', 'green').attr('stroke-width', 2).attr('fill', 'none');
	 
	 
}

// haeSarja

function createTS(init) {
	
	pxwebGet('ta_palkat_ennakonpid_601');
	
	var kuvaan=[];
	for (var i=0;i<pxwebTS.length;i++) { kuvaan.push(Number(pxwebTS[i].values[0]))}
	TS=kuvaan;
	draw(kuvaan,'Originaali',true,init);
}


function pxwebGet(muuttuja) {	
		
		//var aluemuuttuja='Alue2016';
		var indicator='Muuttuja';
		var jakso='Y'

		xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function () { 
		if (xhr.readyState == 4 && xhr.status == 200) {
			
			var resultRaw = JSON.parse(xhr.responseText);
			

			pxwebTS = resultRaw.data;
			
		}
		}
		
		var data = JSON.stringify({"query": [
		{ "code": 'Ilmoitusjakso',"selection": {"filter": "item","values": [  jakso ]  }  },
		{ "code": indicator,"selection": {"filter": "item","values": [  muuttuja ]  }  }],"response": {"format": "json",   "params": null}});
		
		
	
		
		xhr.open("POST", urli[1], false);	
		xhr.send(data);
}


					
	