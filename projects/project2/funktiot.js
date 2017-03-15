luvut=new Array();
kuntatiedot =new Array();
var luvutObj=[];
var muuttujat=[];
var kunnat=[];
var valittuSarake=2;

window.onload = function() {
		var fileInput = document.getElementById('fileInput');
		var fileDisplayArea = document.getElementById('fileDisplayArea');

		fileInput.addEventListener('change', function(e) {
			
			var file = fileInput.files[0];

				var reader = new FileReader();

				reader.onload = function(e) {
				
					parsiFaili(reader.result);
				}

				reader.readAsText(file,"ISO-881");	

		});
}





alustus=function() {
	
	for (r=1;r<(313);r++) {
		kuntaObj=new Object();
		
		if (r<10) { kuntaObj.kuntakoodi='00'+r; }
		if (r<100) { kuntaObj.kuntakoodi='0'+r; }
		if (r>=100) { kuntaObj.kuntakoodi=r; }
		
		kuntaObj.kuntaNimi=r;
		kuntaObj.luvut=[r];
		luvutObj.push(kuntaObj)
		luvutObj.push(kuntaObj)
	}
	
	
}



parsiFaili=function(tekstiRaw) {
	rivit=tekstiRaw.split("\n");	
	sarakkeita=rivit[0].split(';').length;
	output=[];
	output.push('<li>Havaintoja:'+rivit.length+'</li><li>Sarakkeita:'+sarakkeita+'</li>');
	document.getElementById('info').innerHTML=output;
	
	cols=['#a50026','#d73027','#f46d43','#fdae61','#fee08b','#d9ef8b','#a6d96a','#66bd63','#1a9850','#006837'].reverse()
	/* Oletetaan, että sarakkeet 1 & 2 ovat kuntakoodi & -nimi ja että eka rivi on otsikkorivi */
	output=[];
	for (var s=2;s<sarakkeita;s++) {
	muuttujat.push(rivit[0].split(";")[s]);
	output.push('<option value='+(s-2)+'>'+rivit[0].split(';')[s]+'</option>'); /* Populoidaan muuttujalista */
	} 
	document.getElementById("kuvattavaSarake").innerHTML=output;
	
	
	
	for (r=1;r<(rivit.length-1);r++) {
		kuntaObj=new Object();
		kuntaObj.kuntakoodi=rivit[r].split(";")[0];
		kuntaObj.kuntaNimi=rivit[r].split(";")[1];
		kuntaObj.luvut=[];

		for (var s=2;s<sarakkeita;s++) {
			
			kuntaObj.luvut.push(Number(kuntaObj.luku=rivit[r].split(";")[s]))
		}
		
		luvutObj.push(kuntaObj)
	}
	
	
	
	v=new Array()
	for (s=0;s<sarakkeita;s++) {
		for (r=1;r<(rivit.length-1);r++) {
			luku=rivit[r].split(";")[s];	
			if (s>1) {				luku=luku.replace(',','.');				v.push(Number(luku));			}
			if (s<2) {				v.push(luku)			}
			
		}
		if (s>1) {		luvut.push(v); }
		if (s<2) {		kuntatiedot.push(v); }
		v=[];

	}

	
	output=[];

	
	output.push('<tr><th>Muuttuja</th><th>Keskiarvo</th><th>Keskihajonta</th>')
	for (var i=0;i<muuttujat.length;i++) {
		output.push('<tr>')		
		output.push('<td>'+muuttujat[i]+'</td>')
		output.push('<td>'+keskiarvo(luvut[i]).toFixed(2)+'</td>')
		output.push('<td>'+keskihajonta(luvut[i]).toFixed(2)+'</td>')
		output.push('</tr>')		
		
	}
	document.getElementById("infoTBL").innerHTML=output.join('');
	//varita(kuntatiedot[0],luvut[0],10);
	
	
}



function muuttujanVaihto(selekti) {
	valittuSarake=selekti.value; // Global
	varita(luvut[selekti.value],10);
}


/* Väritys */

function varita(numbs,luokkia) {
	
	rajat=quantiles(numbs,luokkia);
	
	for (var i=0;i<luvutObj.length;i++) {
		try { 
			document.getElementById('tilastointialueet:kunta_'+luvutObj[i].kuntakoodi).style='fill:'+cols[0];
			for (r=0;r<rajat.length;r++) {
			if (luvutObj[i].luvut[valittuSarake]>rajat[r]) { document.getElementById('tilastointialueet:kunta_'+luvutObj[i].kuntakoodi).style='fill:'+cols[r]; }	
			}
		} catch(err) {    alert('Kuntaa '+luvutObj[i].kuntakoodi+'-'+luvutObj[i].kuntaNimi+' ei löydy kartalta. Poista kunta aineistosta.')  
						}
	}
	output=[];
	
	output.push('<tr><th>Luokka</th><th>Raja</th></tr>')

	rajat.forEach(function(item,index){  output.push('<tr><td>'+(index+1)+'</td><td>'+item+'</td></tr>') })
	
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


/* Toiminnallisuus */


hiiriPois=function(gunta) { 

document.getElementById(gunta.id).style.stroke="none";
document.getElementById(gunta.id).style.opacity="1";
}

hiiriPaalle=function(gunta) {
	
document.getElementById(gunta.id).style.stroke="black";
document.getElementById(gunta.id).style.opacity="0.5";

kuntakoodi = gunta.id.replace('tilastointialueet:kunta_','');

output=[];

kunta=luvutObj.find(function(a){ return a.kuntakoodi == kuntakoodi })

/* Kunnan nimi */
document.getElementById('kunnanNimi').innerHTML=kunta.kuntaNimi;

/* Luodaan tunnusluvuista tbl */

output.push('<tr>')
muuttujat.forEach(function(item){  output.push('<th>'+item+'</th>') })
output.push('</tr>')	
output.push('<tr>')
kunta.luvut.forEach(function(item){  output.push('<td>'+item+'</td>') })
output.push('</tr>')
document.getElementById("onmouseTBL").innerHTML=output.join('');

}
