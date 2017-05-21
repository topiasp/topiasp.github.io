

function summaa(a, b) {
    return a + b;
}

function keskiarvo(arr,na_rm=true){
	
	if (na_rm) {	
		arr=arr.filter(Boolean)
	}
	
    var total = 0;
    for(var i = 0;i < arr.length; i++) { 
        total+=Number(arr[i]);
    }

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
	
	for (var i=0;i<=qLuvut.length;i++) {
	if (l==luokassa) { rajat.push(qLuvut[i]); l=0;} 	l++;	}
	return(rajat)
	
}