

function municipality(id,name) {
	this.id=id;
	this.name=name;
	this.indicators=[];
	
	// Getters
	
	this.isKokomaa = function() {
		return this.id=='SSS';
	}
	
	this.getName = function() {
		
		return this.name.replace(" Kunta", "");
		
	}
	
	
	
	
	
	this.getId = function() {
		return this.id;
	}
	
	
	this.getLastValueOfIndicator=function(indicatorCode) {
		return(this['indicators'].filter(function(x) { return(x['code']==indicatorCode)})[0].getLastValue());
		
	}
	this.getLastLabelOfIndicator=function(indicatorCode) {
		return(this['indicators'].filter(function(x) { return(x['code']==indicatorCode)})[0].getLastLabel());
		
	}
	this.getInfoOfIndicator=function(indicatorCode) {
		return(this['indicators'].filter(function(x) { return(x['code']==indicatorCode)})[0].getInfo());
		
		
		
	}
	
}



function indicator(values,labels,name,code,id) {
	this.values=values;
	this.labels=labels;
	this.code=code;
	this.id=id;
	this.varName=name;
	
	// Setters
	this.setId= function(id) { this.id=id; }
	this.setValues= function(values) { this.values=values; }
	this.setLabels= function(labels) { this.labels=labels; }
	this.setVarName= function(name) { this.varName=name; }	
	
	// Getters
	
	
	this.getInfo = function() {
        return this.varName+': '+this.values[this.values.length-1]+"\n("+this.getComparison(1)+")";
    };
	
	
	this.getName = function() {
        return this.varName;
    };

	this.getLastValue = function() {

       return(this.values[this.values.length-1]*1)
		
    };
	this.getLastLabel = function() {

       return(this.labels[this.labels.length-1])
		
    };
	this.getColorBasedOnComparisonForButton = function() {
		if (this.getComparison(1)>0) {
			return('red')
		} else {
			return('#4CAF50')
		}
		
	}
	
	this.getComparison = function(t) {
		comp=this.values[this.values.length-1]-this.values[(this.values.length-1)-t];
		if ( Math.abs(comp)> 100) {
			return(Math.round(comp));
		} else {
			return(comp.toFixed(1));
		}
	}

}





function choro(values,muns,varCode) {
	this.values=values.sort(function(a, b){return a-b});
	this.muns=muns;
	this.classLimits=[];
	this.classes=[];
	this.cols=[];

	this.varCode=varCode;
	
	this.colPalette=['#a50026','#d73027','#f46d43','#fdae61','#fee08b','#d9ef8b','#a6d96a','#66bd63','#1a9850','#006837'].reverse();
	
	// Getters
	

	
	this.getValuesInClass = function(classes) {
		
		return Math.floor(this.values.length/(classes));
	}
	
	
	
	this.getClasses = function(classes) {
		this.classLimits=[];
		this.cols=[];
		this.classes=[];
		
		// Add min value first
		this.classLimits.push({ boundary: this.values[0], index: 0, color: this.colPalette[0], unitIndex: 0 });
		
		
		tmp=this.getValuesInClass(classes);
		help=0;
		indexOfClass=1;
		
		
		
		for (var i=0;i<=this.values.length;i++) {
			if (i>(tmp*classes-1)) { 
				// Break if number of classes demands so
				console.log('breaking at'+i);
				break;
			}
			if (help==tmp) {
				
				this.classLimits.push({ boundary: this.values[i], index: indexOfClass, color: this.colPalette[indexOfClass], unitIndex: i });
				help=0;
				indexOfClass++;
				
			}
			
			
			help++;
		}
		
		
		
		// Set the last boundary to max value
		//this.classLimits[this.classLimits.length-1]['boundary'] = this.values[this.values.length-1];
		
		
		return(this.classLimits);
	}
	
	
	
	
}








