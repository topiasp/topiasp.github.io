
    //// Create indicators on country level ----------------------------------------------------------------- /////////////////////////
	
	
	// Retrieve data
	//tyonvalitystilastoDat=pxwebGet(PXwebCodes,'SSS');	
	
	// Form indicators and buttons for them
	/*
	for (i=0;i<PXwebCodes.length;i++) {
		
		varName=PXwebCodes[i];
		for (z=0;z<tyonvalitystilastoMuuttujat.length;z++) {
			// tyonvalitystilastoMuuttujat.filter(function(x) {	return(x['value']==PXwebCodes[i]);	}); // ??
			if (tyonvalitystilastoMuuttujat[z]['value']==PXwebCodes[i]) {
				varName=tyonvalitystilastoMuuttujat[z]['valueText'];
			}			
		}
		
		tmp=tyonvalitystilastoDat.filter(function(x) { return(x['key'][2]==PXwebCodes[i]) } );
	
		var indicator1 = new indicator();
		// Create ind
			
		indicator1.setValues(  tmp.map(function(x) { return(x['values'].join('')) }) );
		indicator1.setLabels(  tmp.map(function(x) { return(x['key'][0]) }) );	
		indicator1.setVarName(varName);
		indicator1.setId(PXwebCodes[i]);
		
		
		// Push
		indicators.push(indicator1);
	}
	*/