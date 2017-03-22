// Global

chosenVariable='VAR1'; // Variable used to create choropleth. 
numberOfClasses=10;
cols=['#a50026','#d73027','#f46d43','#fdae61','#fee08b','#d9ef8b','#a6d96a','#66bd63','#1a9850','#006837'].reverse() // colourpalette for choropleth. TODO: choose direction

function init() {
	
	// Extract values of property 'VAR1' of all objects in 'kunnat'
	chosenVariableValues=kunnat.map(function(obj) { return(obj[chosenVariable]); });
	
	//choropleth of VAR1
	choropleth(chosenVariableValues,numberOfClasses);
	//Class limits table
	limitsTBL(quantiles(chosenVariableValues,numberOfClasses))
	
	/* Retrieve info on chosen variable from muuttujat */
	muuttuja=haeObjektiId(muuttujat,chosenVariable);
	document.getElementById('muuttujaNimi').innerHTML=muuttuja['name'];
	
	// Populate variable list 
	
	

	// Add event listeners
	
	// Add onmouseout to SVG
	//document.getElementById('muuttujaNimi').addEventListener("mouseout", function(){   	toggleVisibility(document.getElementById('limitsTBL'));	});
}


function haeObjektiId(arr, value) {

  for (var i=0, iLen=arr.length; i<iLen; i++) {
    if (arr[i]['id'] == value) return arr[i];
  }
}

// Onmouseover for SVG-element

function actionTime(valittuKunta) { 
	/* Retrieve object from kunnat */

	kunta=haeObjektiId(kunnat,valittuKunta.id)


	// Update name to header
	document.getElementById("kuntaNimi").innerHTML=kunta['kuntanimi']+'<br>';

	// Update chosen variable value to header 
	muuttuja=haeObjektiId(muuttujat,chosenVariable);
	document.getElementById('muuttujaNimi').innerHTML=muuttuja['name']+': <b>'+kunta[chosenVariable]+'</b>';

	// Highlight map & classLimitTbl with respect to chosen object
	toggleSvgHighlight(valittuKunta.id,kunta['classTblID']);

	// For debugging
	//document.getElementById('help').innerHTML=kunta['classTblID'];

}


// Onmouseover for choosing variable

function initChooseVariable() {
	
	document.getElementById('variableTBL').style.visibility='visible';
	
	output=[];
	output.push('<tr><th>Muuttuja</th></tr>')
	muuttujat.forEach(function(item,index){  output.push("<tr onclick="+"choose('"+item['id']+"');"+"><td>"+item['name']+'</tr></td>') })
	document.getElementById('variableTBL').innerHTML=output.join('');
	
	
	/* Retrieve info on chosen variable from muuttujat */
	muuttuja=haeObjektiId(muuttujat,chosenVariable);
	document.getElementById('muuttujaNimi').innerHTML=muuttuja['name'];
	
	
	
}


// After actual choice
function choose(c) {
	
	chosenVariable=c;
	
	
	// Extract values of property chosenVariable of all objects in 'kunnat'
	chosenVariableValues=kunnat.map(function(obj) { return(obj[chosenVariable]); });
	
	//choropleth of VAR1
	choropleth(chosenVariableValues,numberOfClasses);
	//Class limits table
	limitsTBL(quantiles(chosenVariableValues,numberOfClasses))
	
	/* Retrieve info on chosen variable from muuttujat */
	muuttuja=haeObjektiId(muuttujat,chosenVariable);
	document.getElementById('muuttujaNimi').innerHTML=muuttuja['name'];
	
	

	/* Empty variableTBL as not to take up space. SHOULD DO: in CSS */ 
	document.getElementById('variableTBL').innerHTML="";
	document.getElementById('variableTBL').style.visibility='hidden';
	
}

// Toggling

function toggleVisibility(e) {
	if (e.style.visibility!='hidden') { e.style.visibility='hidden'; } else { e.style.visibility='visible'; }

}


function toggleRowHighlight(chosenClassLimitTblRow) {
	document.getElementById(chosenClassLimitTblRow).style.backgroundColor='#f03b20';
	document.getElementById(chosenClassLimitTblRow).style.opacity='0.8';
}


function toggleSvgHighlight(chosenSvgElement,chosenClassLimitTblRow) {
	
	// Add onmouseout to SVG // THIS IS TERRIBLE
	document.getElementById(chosenSvgElement).addEventListener("mouseout", function(){   
	document.getElementById(chosenSvgElement).style.stroke="none";
	document.getElementById(chosenSvgElement).style.opacity="1";	
	document.getElementById("kuntaNimi").innerHTML="";
	document.getElementById(chosenClassLimitTblRow).style.color='black';
	document.getElementById(chosenClassLimitTblRow).style.backgroundColor='#fff';
	document.getElementById(chosenClassLimitTblRow).style.fontSize="15px";
	document.getElementById(chosenClassLimitTblRow).style.opacity='1';
	});
	
	if (document.getElementById(chosenSvgElement).style.stroke!='black') {
		document.getElementById(chosenSvgElement).style.stroke="black";
		document.getElementById(chosenSvgElement).style.opacity="0.5";
		
	} else {
		document.getElementById(chosenSvgElement).style.stroke="none";
		document.getElementById(chosenSvgElement).style.opacity="1";	
	}
	// Table highlights
	
		document.getElementById(chosenClassLimitTblRow).style.color='#fff';
		document.getElementById(chosenClassLimitTblRow).style.backgroundColor='#b30000'
		document.getElementById(chosenClassLimitTblRow).style.fontSize="15px";
		document.getElementById(chosenClassLimitTblRow).style.opacity='0.8';
	
}

/* Choropleth */

function choropleth(numbs,classes) {
	classLimits=[];
	classLimits=quantiles(numbs,classes);
	
	// Add 'fillColour' and 'classId' properties to each object + add style to svg-elements
	for (var i=0;i<kunnat.length;i++) {
		
		kunnat[i]['fillColour']=cols[0]; // Default fill
		c=evalClass(kunnat[i][chosenVariable],classLimits);
		kunnat[i]['fillColour']=cols[c];
		kunnat[i]['classId']=c;
		kunnat[i]['classTblID']='classLimitTblRow_'+c+'';
		// Color
		if (document.getElementById('xx') !== null) {
			
			document.getElementById(kunnat[i]['id']).style='fill:'+cols[c];
		}
	}
	
	
	
}

function limitsTBL(classLimits) {
	document.getElementById('limitsTBL').innerHTML="";
	output=[];
	output.push('<tr><th></th><th>Alaraja</th><th>Yläraja</th></tr>')
	for (var i=0;i<(classLimits.length-1);i++) { 
		id='classLimitTblRow_'+i;
		output.push('<tr id='+id+'><td>'+(i+1)+'</td><td>'+classLimits[i]+'</td><td>'+classLimits[i+1]+'</td></tr>')
	}
	
	//classLimits.forEach(function(item,index){  output.push('<tr><td>'+(index+1)+'</td><td>'+item+'</td></tr>') })
	document.getElementById('limitsTBL').innerHTML=output.join('');
}


function evalClass(value,classLimits) {
	
	
	for (var i=0;i<=classLimits.length;i++) { 
		if (value>=classLimits[i] && value<=classLimits[i+1]) { return(i); break; }
	}
}


/* Math-funktiot */

function keskiarvo(arr){
    var total = 0;
    for(var i = 0;i < arr.length; i++) { 
        total+=Number(arr[i]);
    }
	//eturn total
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
	
	rajat.push(Math.min(...qLuvut)); // Add min value as first
	for (var i=0;i<=qLuvut.length;i++) {
	if (l==luokassa) { rajat.push(qLuvut[i]); l=0;} 	l++;	}
	return(rajat)
	
}
