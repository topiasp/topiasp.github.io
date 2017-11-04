
var globalHelp;
var globalHelp2;
var searchString = '';

function search(paramName,searchString) {
	
	searchString = searchString.toLowerCase();
	
	//console.log(paramName);
	if (paramName=='Kunta') {
		
		
		$('.resultText').css('font-size','200%');
		
		
		if (searchString.search('[A-Za-z]')==-1) {
			res = kunnat.filter(function(x) {  return(  x.koodi.indexOf(searchString)>-1  )  });
			
		}
		if (searchString.search('[A-Za-z]')>-1) {
			res = kunnat.filter(function(x) {  return(  x.nimi.toLowerCase().indexOf(searchString)>-1  )  });
			
		}
		
		$('#output').html(  res[0].koodi + '<br>'  + res[0].nimi );
	}
	if (paramName=='Käsittely') {
		
		$('.resultText').css('font-size','100%');
		
		if (searchString.search('[A-Za-z]')==-1) {
			res = kasittelyJaHyodyntamiskoodit.filter(function(x) {  return(  x.koodi.indexOf(searchString)>-1  )  });
			
		}
		if (searchString.search('[A-Za-z]')>-1) {
			res = kasittelyJaHyodyntamiskoodit.filter(function(x) {  return(  x.selite.toLowerCase().indexOf(searchString)>-1  )  });
			
		}
		
		if (res.length>0) {
			$('#output').html(  res[0].koodi + '<br>'  + res[0].selite );
		}
		
	}
	if (paramName=='Jäte') {
		
		
		$('.resultText').css('font-size','100%');
		
		if (searchString.search('[A-Za-z]')==-1) {
			res = jatekoodit.filter(function(x) {  return(  x.koodi.indexOf(searchString)>-1  )  });
			
		}
		if (searchString.search('[A-Za-z]')>-1) {
			res = jatekoodit.filter(function(x) {  return(  x.selite.toLowerCase().indexOf(searchString)>-1  )  });
			
		}
		
		if (res.length>0) {
			$('#output').html(  res[0].selite );
		}
		
	}
}


function createInputBox(paramName,divToAppendTo) {
		   	
			headerText = $('<p>' +paramName+'</p>').addClass('statusBoxHeader');

		   $('<div></div>')
		    .append(headerText)
			.addClass('statusBox')
			.on('click',function() {
				
				$(this).addClass('selected')
				$('.statusBox').fadeOut('slow', function(){ 

					
					$('.backButton').css('visibility','visible');
					$('.resultText').fadeIn('fast');
					$('.statusBox.selected').next().fadeIn().select();
					
				})
				


			})

			.appendTo(divToAppendTo)
			
			;

		
			var statusText = $('<input type="text" id="' +  paramName + '_input" size="'  + paramName.length + '">') // value="' + paramName + '" 
				.addClass('statusInput')

				.bind('keyup', function(e) {
					
					console.log( 
						this.value
					);
					
					search(paramName, this.value );
					
					if (this.value.length==0) {
						
						$('.resultText').html('');
					}
					
				})
				.css('display','none')
				;
				
				
			$(divToAppendTo).append(statusText);
			
			
			
		

}



$(document).ready(function() {
	
    console.log( "ready!" );
	
	obj = $("<div id='backButton'><img src='BackButton.png'></img></div>").addClass('backButton').css('visibility','hidden').on('click',function() {
		
		$(this).css('visibility','hidden');
		
		$('.statusInput').fadeOut('slow', function() {
			$('.resultText').fadeOut('slow');
			
			$('.resultText').html('');
			$('.statusBox.selected').toggleClass('selected')
			$('.statusBox').fadeIn('slow');
		
		})
	
		
		
		
		
	});
	$('.container').append(obj);
	
	
	
	createInputBox('Kunta','.container');
	createInputBox('Jäte','.container');
	createInputBox('Käsittely','.container');
	
	
	//obj = $("<div id='searchOut'></div>").css('visibility','hidden')

	obj = $("<div id='output'></div>").addClass('resultText')
	$('.container').append(obj);
	
	
	
	
	
});
