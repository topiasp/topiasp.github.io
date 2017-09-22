
function getSeries(indicatorID, cbFunction= function() {  console.log('no cb') }) {


	// 405 : "fi": "Toimeentulotukea saaneet 18 - 24-vuotiaat, % vastaavanikäisestä väestöstä"
	urli ='http://www.sotkanet.fi/rest/1.1/json?indicator=' + indicatorID +'&genders=total&years=2016';

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		   
		   response=JSON.parse(xhttp.responseText);
		   
		 
		}
	};
	xhttp.open("GET", urli, true);
	xhttp.send();

};

$(document).ready(function() {	
	
	getSeries(405);
	
});