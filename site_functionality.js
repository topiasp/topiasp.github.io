var tyottomyys=[26911,26342,25363,24898,24729,27092,28383,25635,23636,23300,22838,24141,23276,22158,21194,20634,20590,22707,23940,20864,19216,18510,18017,19493,19171,18367,17694,17349,17475,19961,21135,18343,17354,16946,17094,19496,20102,20557,21190,21547,22199,25660,27722,25462,24516,24807,24904,26878,26375,25332,24663,24309,24607,27220,28754,25539,23975,23315,23125,24648,24188,23634,23116,22675,22798,25314,26770,24209,22922,22360,22187,23793,23743,23423,23028,22969,23359,26308,28089,25362,24508,24563,24785,26580,27832,28025,27755,27664,28222,31761,33779,31652,30671,30725,30627,32785,33482,33429,33421,33306,33849,37557,39492,37027,36044,35528,35969,38585,38932,38824,38713,38577,38924,43170,45135,42024,40665,39368,39225,41714,41812,41453,41016,40664,40917,44852,46712,43373,41445,40291,39529]


var urli=["http://pxnet2.stat.fi/PXWeb/api/v1/fi/StatFin/tym/tyonv/statfin_pxt_tym_tyonv_001.px",
"http://vero2.stat.fi/PXWeb/api/v1/fi/Vero/Verotulojen_kehitys/010_ansiokava_tau_101.px"]

var pxwebTS = [];
var TS=[];
var kuvaan=[];

var datasetsOnCanvas=[];


var colors=['rgb(0, 153, 51)','rgb(0, 51, 153)','rgb(179, 0, 0)'];
var colorIdx=0;

function initialize() {
	document.getElementById('alpha_output').innerHTML=document.getElementById('alpha').value/100;
	document.getElementById('beta_output').innerHTML=document.getElementById('beta').value/100;
	document.getElementById('gamma_output').innerHTML=document.getElementById('gamma').value/100;
	
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
			datasetsOnCanvas[0].data.push(keskiarvo(datasetsOnCanvas[0].data));
		}
		
	}
	kuvaan=[]
	for (var i=1;i<tasoitettu.length;i++) {
	kuvaan.push((tasoitettu[i]["fit"]));
	}
	
	draw(kuvaan,'Ennuste',cleanCanvas=false)

}

function showValue(newValue,sliderId) {
	document.getElementById(sliderId).innerHTML=newValue;
}

draw =function(arrayToDraw,arrayTitle,cleanCanvas) {
	
	  var canvasToDraw = document.getElementById("canvas_1");
	  var labels=[];
	  for (var i = 0, len = arrayToDraw.length; i < len; i++) { labels.push('T:'+i) }
	  
	  //if (cleanCanvas) {  datasetsOnCanvas=[]; }
	  datasetsOnCanvas.push( { 
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
                    });
	  var data = {   labels:labels,  datasets:   datasetsOnCanvas    };
	  
	  var newChart = new Chart(canvasToDraw, {
		type: "line",
		data: data	  });
	  
	 colorIdx++;
	 if (colorIdx>colors.length) { colorIdx=0; }
}



// haeSarja

function createTS() {
	
	pxwebGet('ta_palkat_ennakonpid_601');
	
	var kuvaan=[];
	for (var i=0;i<pxwebTS.length;i++) { kuvaan.push(Number(pxwebTS[i].values[0]))}
	TS=kuvaan;
	draw(kuvaan,'Originaali',true);
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


					
	