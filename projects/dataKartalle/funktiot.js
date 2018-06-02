luvut=new Array();
kuntatiedot =new Array();

// Object to hold the data 
var data = { }

function classifier(arr,numberOfClasses)  {
	
	this.colors = ['#a50026','#d73027','#f46d43','#fdae61','#fee08b','#ffffbf','#d9ef8b','#a6d96a','#66bd63','#1a9850','#006837'].reverse();
	
	this.arr = arr.sort(function(a, b){return a-b});
	
		
	luokassa=Math.floor(this.arr.length/numberOfClasses);
	
	console.log('Luokassa tulee olemaan '+luokassa+' havaintoa');
	
	this.colorArray = [];
	
	

	this.quantileLimits =[];
	
	
	l = 0;
	c = 0;
	
	for (var i=0;i<=arr.length;i++) {
		
		this.colorArray[i] = this.colors[c];

		if (l==luokassa || i==0) {
				this.quantileLimits.push(this.arr[i]);
				l=0;
				c++;
			} 
			l++;	
	}
	// For max value for last quantile limit 
	this.quantileLimits[ this.quantileLimits.length-1 ] = Math.max(...arr);
	
	
	Math.max(...[1,2,3])
	
	this.isBiggerThanAverage = function(number) {
		return(number> keskiarvo(this.arr))
		
	}	
	
	
	
	this.getQuantileLimits = function() {
		
		return(this.quantileLimits);
		
	}
	
	this.getColorOfValue = function(number) {
		
		for (raja = 1;raja < this.quantileLimits.length; raja++) {
			
			
			if (number>=this.quantileLimits[raja-1] & number<=this.quantileLimits[raja]) {
				
				return { alaraja: this.quantileLimits[raja-1], ylaraja: this.quantileLimits[raja], vari: this.colors[raja-1] };
			}
			
		}
		// Dumb fix for max number
		/*
		if (number> this.quantileLimits[ this.quantileLimits.length-1 ]) {
			
			return { alaraja: this.quantileLimits[raja-1], ylaraja: this.quantileLimits[raja], vari: this.colors[raja-1] };
		}
		*/
			
			
		
		return undefined;
		
	}
	
}
	
	
var help;
var varittaja;	
	
window.onload = function() {
		var fileInput = document.getElementById('fileInput');
		var fileDisplayArea = document.getElementById('fileDisplayArea');

		fileInput.addEventListener('change', function(e) {
			
			var file = fileInput.files[0];

				var reader = new FileReader();

				reader.onload = function(e) {
				
					parsiFaili(reader.result);
					varita();
				}

				reader.readAsText(file,"ISO-881");	

		});
		
		// add eventlistener to svg elements
		
		gs = document.getElementsByTagName('g');
			
		for (idx = 2;idx<gs.length;idx++) {
			
			
			// Kuntakoodi elementin nimestä
			kuntakoodi = gs[idx].getAttribute('inkscape:label');
			// Nimetään idn mukaan
			
			gs[idx].id = 'tilastointialueet:kunta_'+kuntakoodi;
			
			
			
			
			
			gs[idx].addEventListener('mouseover', function() {
				this.style.stroke="black";
				this.style.opacity="0.5";
				
				// Kuntakoodi elementin nimestä
				kuntakoodi = this.getAttribute('inkscape:label');
				// Kuntakoodin data
				kunta=data.municipalities.filter(function(a){ return a[data.sarakkeet[0].nameOfSarake] == kuntakoodi })[0];
				
				
	
				// Luodaan tunnusluvuista tbl

				var valittumuuttuja = document.getElementById("kuvattavaSarake").options.selectedIndex;
				var valittumuuttuja = document.getElementById("kuvattavaSarake").options[valittumuuttuja].innerHTML;
				
				
					
				// Kunnan nimi + muuttujan arvo  // 
				document.getElementById('kunnanNimi').innerHTML=kunta[ data.sarakkeet[1].nameOfSarake ] + ": " + kunta[valittumuuttuja].toFixed(1);

			});
			
			gs[idx].addEventListener('mouseout',function() {
				
				
				this.style.stroke="none";
				this.style.opacity="1";
				
			});
			
			
		}
		

}






function isArrayNumeric(a) {
	
	// Check if array contains a non-numeric character other than . or , 
	if ( a.map(function(x) { return(/[^0-9.,]/.test(x) ) }).filter(function(x) { return(x) }).length > 0) {
		
		return false;
		
	}
	// Check if contains observations consist of numbers but are not (eg. '091' meaning Helsinki);
	if ( a.map(function(x) { return(/^0[0-9]/.test(x) ) }).filter(function(x) { return(x) }).length > 0) {
		
		return false;
		
	}
	return true;
	
}

function isNumeric(c) {
	
	if (/[^0-9.,]/.test(c) ) {
		return false;
	}
	if (/^0[0-9]/.test(c) ) {
		return false;
	}
	
	return true;
	
}


parsiFaili=function(tekstiRaw) {
	

	data.rivit = tekstiRaw.split(/\r?\n/).filter(function(r) { return(r.length>0) });
	data.sarakkeet = data.rivit[0].split(';').map(function(s) { return(   {  nameOfSarake: s }  ) });
	data.sarakkeita = data.sarakkeet.length;
	data.rivit.shift() // get rid of first row
	
	data.riveja = data.rivit.length;
	
	
	// Check if first char of first obs is quotation mark. Alert that these will be removed
	
	if (data.rivit[0].substring(0,1)=='"') {
		
		alert('Ensimmäisen rivin ensimmäinen merkki oli lainausmerkki! Kaikki lainausmerkit poistetaan');
		
		data.rivit = data.rivit.map(function(r) {		
				return(r.replace(/"/g,''))
			});
		
		data.sarakkeet = data.sarakkeet.map(function(r) {		
				return(r.replace(/"/g,''))
			});
		
	}

	document.getElementById('info').innerHTML= '<li>Havaintoja:'+data.riveja+'</li><li>Sarakkeita:'+data.sarakkeita+'</li>';
	
	data.municipalities = [];
	
	
	data.municipalities =  data.rivit.map(function(r) {

		var mun = {};
		data.sarakkeet.forEach(function(s,idx) {
			
			
			var cellValue = r.split(';')[idx];
			// Try type conversion
			if (isNumeric(cellValue)) {
				
				cellValue = cellValue.replace(',','.') *1;
				
			}
			mun[s.nameOfSarake] = cellValue;
			
			
			
			})
		
		return(mun);
			
	
	});

	data.municipalities.getVariableAsArray = function(varName) {
		
		
		return(this.map(function(m) { return(m[varName]) }));
		
	}
	
	output=[];
	
	data.sarakkeet.forEach(function(s,idx) {
		
		// Variables as properties of data
		data.sarakkeet[idx]['isNumeric'] = isArrayNumeric(data.municipalities.getVariableAsArray(data.sarakkeet[idx].nameOfSarake));
		
	})
	

	
	output.push('<tr><th>Muuttuja</th><th>Keskiarvo</th><th>Keskihajonta</th>')
	for (var i=0;i<data.sarakkeita;i++) {
		
		if (data.sarakkeet[i].isNumeric) {
		
		output.push('<tr>')		
		output.push('<td>'+data.sarakkeet[i].nameOfSarake+'</td>')
		output.push('<td>'+keskiarvo(data.municipalities.getVariableAsArray(data.sarakkeet[i].nameOfSarake)).toFixed(2)+'</td>')
		output.push('<td>'+keskihajonta(data.municipalities.getVariableAsArray(data.sarakkeet[i].nameOfSarake)).toFixed(2)+'</td>')
		output.push('</tr>')		
		
		// Populate option list 
		document.getElementById("kuvattavaSarake").innerHTML += '<option value='+data.sarakkeet[i].nameOfSarake+'>'+data.sarakkeet[i].nameOfSarake+'</option>';
		}
	}
	document.getElementById("infoTBL").innerHTML=output.join('');
	
	
	
	
	
	
	//varita(luvut[0],10);
	
	
}



function muuttujanVaihto(selekti) {
	
	varita();
}


/* Väritys */

function varita() {
	
	//rajat=quantiles(numbs,luokkia);
	
	
	valittumuuttuja = document.getElementById("kuvattavaSarake").options.selectedIndex;
	valittumuuttuja = document.getElementById("kuvattavaSarake").options[valittumuuttuja].innerHTML;
	

	
	
	varittaja	 = new classifier(data.municipalities.getVariableAsArray(valittumuuttuja),10);
	
	
	for (var i=0;i<data.municipalities.length;i++) {
		try { 
		
		
			document.getElementById('tilastointialueet:kunta_'+ data.municipalities[i][data.sarakkeet[0].nameOfSarake]).style='fill:'  + varittaja.getColorOfValue(data.municipalities[i][valittumuuttuja]).vari;   // Todo: guess which is kuntakoodi

			
		} catch(err) {    //alert('Kuntaa '+data.municipalities[i].kuntakoodi+'-'+data.municipalities[i].Alue+' ei löydy kartalta. Poista kunta aineistosta.')  
						}
	}
	
	// Result table
	output=[];
	
	output.push('<tr><th>Luokka</th><th>Raja</th></tr>')

	varittaja.getQuantileLimits().forEach(function(item,index){  output.push('<tr><td>'+(index+1)+'</td><td style="color:black;background-color:'+varittaja.colors[index]+'">'+item.toFixed(0)+'</td></tr>') })
	
	document.getElementById('limitsTBL').innerHTML=output.join('');
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
	for(var i = 0;i < arr.length; i++) { 	varianssi+=(Number(arr[i])-ka)*(Number(arr[i])-ka);	}
	varianssi = varianssi/arr.length;
	return(Math.sqrt(varianssi))
}

function skaalaa(arr) {
	
	var skaalattu = [];
	
	ka = keskiarvo(arr);
	kh = keskihajonta(arr);
	for(var i = 0;i < arr.length; i++) { 
	skaalattu[i] = (Number(arr[i])-ka)/kh
	
	}
	return(skaalattu)
}

function quantiles(qLuvut,n) {
	
	
	luokassa=Math.floor(qLuvut.length/n);
	
	qLuvut=qLuvut.sort(function(a, b){return a-b});
	var rajat=[];
	var l=0;
	
	for (var i=0;i<=qLuvut.length;i++) {
	if (l==luokassa) { rajat.push(qLuvut[i]); l=0;} 	l++;	}
	return(rajat)
	
}


