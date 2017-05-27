


function toggleChosen(e) {
	
	btns=document.getElementsByClassName('button');
	for (b=0;b<btns.length;b++) {
			btns[b].style.border='2px solid white';
	}

	e.style.border='8px solid #006837';
	chosen=e.id;
	
	
	
	// Color map
	
	muns=document.getElementsByClassName('kunta');
	
	coloringMuns=[];
	
	coloringMuns=municipalities.map(function(x) { return(
			{   value: parseFloat(x.getLastValueOfIndicator(chosen)), id: x.getId(),col: 'red',classIndex: -1 } ) 
	})
	
	
	c=new choro(coloringMuns.map(function(x) { return(x['value']) }),coloringMuns,chosen);
	
	
	limits=c.getClasses(10);
	
	for (i=0;i<coloringMuns.length;i++) {
		step1=limits.filter(function(x) { return(x['boundary']<=coloringMuns[i]['value']) })
		if (step1.length>0) {
			coloringMuns[i]['col']=step1[step1.length-1]['color'];
		}
		if (step1.length==0) {
			coloringMuns[i]['col']=c.colPalette[0];
		}
		
	}


	// Compare to country level
	
	indicators=municipalities.filter(function(x) { return(x['id']=='SSS'); });
	indicators=indicators[0]['indicators'];
	comp=indicators.filter(function(e) {return(e['code']==chosen) })[0].getLastValue()*1;
	
	
	for (b=0;b<muns.length;b++) {
		
		//tmp=coloringMuns.filter(function(x) { return(x['id']==muns[b].id)})[0]['col'];
		muns[b].style.fill='white';
		muns[b].style.fill=coloringMuns.filter(function(x) { return(x['id']==muns[b].id)})[0]['col'];
		
		/*
		
		val=tmp[0]['indicators'].filter(function(x) { return(x['code']==chosen)});
		
		if ((val[0].getLastValue()*1)>comp) {
			muns[b].style.fill='red';
		}	else {
			muns[b].style.fill='green';
		}
		*/
	}
		
	
	

}

function onClickKunta(e) {
	
	
	// Which is clicked
	tmp=municipalities.filter(function(x) { return(x['id']==e.id)});
	chosenMun=tmp[0];

	// Update buttons
	
	tmp=chosenMun['indicators'].map(function(x) { return(x['code']) })
	
	
	for (i=0;i<tmp.length;i++) {
		
		ind=chosenMun['indicators'].filter(function(x) { return(x['code']==tmp[i]) })[0];
		
		document.getElementById(tmp[i]).innerHTML=ind.getInfo();
		document.getElementById(tmp[i]).style.backgroundColor=ind.getColorBasedOnComparisonForButton();
	}
	
	
}


function onMouseOutKunta(e) { 
	e.style.opacity='1';
}

function onMouseKunta(e) {
	e.style.opacity='0.5';
	tmp=municipalities.filter(function(x) { return(x['id']==e.id)})[0];
	document.getElementById('header1').innerHTML=tmp.getName()+': '+tmp.getLastValueOfIndicator(chosen);

}





