
SES=function(tasoitukseen,L,ennustettavia,alpha,beta,gamma) {
	
	initValues=init_SES(tasoitukseen,L);
	console.log(initValues)
	
	seasonal_indexes=initValues["init_seas"];
	out=[];
	season=0;
	var apu;
	out.push({S:NaN,level:initValues["init_level"],trend:initValues["init_trend"],seas:seasonal_indexes[seasonal_indexes.length-1],fit:NaN,season_index:seasonal_indexes.length-1})
	for (var idx=0;idx<(tasoitukseen.length);idx++) {
		
		rivi=out.length;
		edellinen=rivi-1;
		
		level=(alpha*(tasoitukseen[idx]/seasonal_indexes[season]))+((1-alpha)*(out[edellinen]["level"]+out[edellinen]["trend"]));
		trend=gamma*(level-out[edellinen]["level"])+(1-gamma)*out[edellinen]["trend"];
		// Season
		seas=seasonal_indexes[season]
		// Fit
		fit=NaN;
		if (rivi>0) { fit=(out[(edellinen)]["level"]+out[(edellinen)]["trend"])*seasonal_indexes[season] }
		
		
		out.push({S:tasoitukseen[idx],trend:trend,level:level,seas:seas,fit:fit,season_index:season});
		season=season+1;
		if (season==L) { season=0;}
 	}
	
	if (ennustettavia>0) {
		// where did we left of 
		var left_of=out[out.length-1]['season_index'];
		var last_values=out.length-1;
		season=left_of+1;
		if (season>=L) { season=0 } // Jos jäätiin viimeiseen,siirrytään ensimmäiseen
		for (var idx=0;idx<(ennustettavia);idx++) {
		
		// Same season for previous period (is infact the same since no smoothing is done for seasonal indexes ATM)
		seas=seasonal_indexes[season]
		// Fit
		fit=(out[last_values]["level"]+out[last_values]["trend"])*seasonal_indexes[season] 
		// Out
		out.push({S:NaN,trend:NaN,level:NaN,seas:seas,fit:fit,season_index:season});
		season=season+1;
		if (season==L) { season=0;}
		}
	}
	
	return(out)
	
}


init_SES=function(tasoitukseen,L) {

	
	// Initial value for deseasonalized level
	var init_level=keskiarvo(tasoitukseen.slice(0,L));
	
	
	// Initial value for the trend factor
	// http://www.itl.nist.gov/div898/handbook/pmc/section4/pmc435.htm
	//(1/L)*sum((series[(L+1):(L*2)]-series[1:L])/L)
	//https://grisha.org/blog/2016/02/17/triple-exponential-smoothing-forecasting-part-iii/

	var summa=0;
	for (var i=0;i<L;i++) {		summa=summa+((tasoitukseen[i+L]-tasoitukseen[i])/L);	}
	var init_trend=summa/L;
	
	// Seasonal indexes
	var M=Math.ceil(tasoitukseen.length/L);

	kausiIdx=0;

	detrending_indexes=[];
	for (var i=0;i<(M*L);i=(i+M)) {
		 apu=(tasoitukseen.slice(i,((i+M)))).reduce(function getSum(total, num) {   return total + num;})/M
		 apu2=Array(M).fill(apu)
		 apu2.forEach(function(item){detrending_indexes.push(item) })	
	}
	
	kausiIdx=0;
	apu=[]
	for (var i=0;i<(M*L);i++) { 
		apu.push({ suhdeluku:tasoitukseen[i]/detrending_indexes[i],kausi:kausiIdx})
		
		kausiIdx++;	
		if (kausiIdx==L) { kausiIdx=0 }
	}
	seas_indexes=[];
	apu2=[];
	apu3=[];
	for (var x=0;x<L;x++) {	
	apu2=apu.filter(function(val, i, a) { return val.kausi==x;    });
	apu2.forEach(function(item) { apu3.push(item.suhdeluku) })
	seas_indexes.push(keskiarvo(apu3))
	apu3=[];
	}
	
	// Palautetaan init-arvot
	var initValues = { init_level:init_level, init_trend:init_trend,init_seas: seas_indexes};
    return(initValues)
	
}



