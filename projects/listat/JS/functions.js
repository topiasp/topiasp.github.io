
var globalHelp;

var searchString = '';

function search(paramName,searchString) {
	

	//console.log(paramName);
	if (paramName=='Kunta') {
		
		
		$('.resultText').css('font-size','200%');
		
		
		if (searchString.search('[A-Za-z]')==-1) {
			res = kunnat.filter(function(x) {  return(  x.koodi.indexOf(searchString)>-1  )  });
			
		}
		if (searchString.search('[A-Za-z]')>-1) {
			
			searchString = searchString.toLowerCase();
	
			res = kunnat.filter(function(x) {  return(  x.nimi.toLowerCase().indexOf(searchString)>-1  )  });
			
		}
		if (searchString == '*') {
			
			res = lajit;
		}
		
		$('#output').html(  res[0].koodi + '<br>'  + res[0].nimi );
	}
	if (paramName=='Käsittely') {
		
		$('.resultText').css('font-size','100%');
				
		res = kasittelyJaHyodyntamiskoodit.filter(function(x) {  return(  x.koodi.indexOf(searchString)>-1  )  });
		
		
		if (res.length==0) {
			
			searchString = searchString.toLowerCase();
	
			res = kasittelyJaHyodyntamiskoodit.filter(function(x) {  return(  x.selite.toLowerCase().indexOf(searchString)>-1  )  });
			
		}
		
		$('#output').html('');
		if (searchString == '*') {
			
			res = lajit;
		}
		
		if (res.length>0) {

			res =  res.map(function(x) { return(  "<p class='resultRow'>"+ x['koodi'] + ' \ ' + x['selite'] + '</p>' ) }).join('');	
			$('#output').append(   res			);
		}
		
	}
	if (paramName=='Jäte') {
		
		
		console.log('jäte');
		$('.resultText').css('font-size','100%');
		
		if (searchString.search('[A-Za-z]')==-1) {
			res = jatekoodit.filter(function(x) {  return(  x.koodi.toLowerCase().indexOf(searchString)>-1  )  });
			
		}
		if (searchString.search('[A-Za-z]')>-1) {
			searchString = searchString.toLowerCase();
	
			res = jatekoodit.filter(function(x) {  return(  x.selite.toLowerCase().indexOf(searchString)>-1  )  });
			
		}
		if (searchString == '*') {
			
			res = lajit;
		}
		
		$('#output').html('');
		
		if (res.length>0) {
			res =  res.map(function(x) { return(  "<p class='resultRow'>" + x['selite'] + '</p>' ) }).join('');	
			$('#output').append(   res			);
		}		
	}
	
	/* -------------------------------------------------------------- LAJI ------------------------------------------------- */
	if (paramName=='Laji') {
		
		
		console.log('Laji');
		$('.resultText').css('font-size','100%');
		
		
	
		searchString = searchString.toLowerCase();

		res = lajit.filter(function(x) {  
			return(  x.selite.toLowerCase().indexOf(searchString)>-1  | x.koodi.toLowerCase().indexOf(searchString)>-1 )

			});
		
		if (searchString == '*') {
			
			res = lajit;
		}
		
		
		$('#output').html('');
		
		if (res.length>0) {
			res =  res.map(function(x) { return(  "<p class='resultRow'>" + x['koodi'] + ' ' + x['selite'] + '</p>' ) }).join('');	
			$('#output').append(   res			);
		}		
	}
}


function createInputBox(paramName,divToAppendTo) {
		   	
			headerText = $('<p>' +paramName+'</p>').addClass('statusBoxHeader');

		   obj =  $('<div></div>')
				.append(headerText)
				.addClass('statusBox')
				.on('click',function() {
				
				$('.statusBox').fadeOut('fast', function(){ 
				

					globalHelp = $(this);
					
					$('.backButton').css('opacity',1);
					$('.resultText').fadeIn('fast');
					
					$('input').attr('paramName',paramName).fadeIn().select();
					
					
				})
				


			})

			$(divToAppendTo).append(obj);

}



$(document).ready(function() {
	
    console.log( "ready!" );
	
		
		
	obj = $("<div id='backButton'><img src='BackButton.png'></img></div>").addClass('backButton').css('opacity',0).on('click',function() {
		
		$(this).css('opacity',0)//.css('display','none');
	
		$('input').fadeOut('quick', function() {
			$('.resultText').fadeOut('fast');
			
			$('.resultText').html('');
			$('.statusBox.selected').toggleClass('selected')
			$('.statusBox').fadeIn('fast');
			$('.statusInput').attr('value','');
		
		})
	
		
		
		
		
	});
	$('.container').append(obj);
	
	
	
	createInputBox('Kunta','.container');
	createInputBox('Jäte','.container');
	createInputBox('Käsittely','.container');
	createInputBox('Laji','.container');
	
	
	var input = $('<input type="text"  size="'  + 10 + '">')
				.addClass('statusInput')
				.attr('paramName','Kunta')
				.bind('keyup', function(e) {
				
					search(  $(this).attr('paramName') , this.value );
					
					if (this.value.length==0) {
						
						$('.resultText').html('');
					}
					
				})
				.css('display','none')
				;
				
	$('.container').append(input);

	obj = $("<div id='output'></div>").addClass('resultText')
	$('.container').append(obj);
	
	
	
	
	
	
	
	
});
