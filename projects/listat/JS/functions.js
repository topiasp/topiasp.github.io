
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
		   

		
			var statusText = $('<input type="text" id="' +  paramName + '_input" value="' + paramName + '" size="'  + paramName.length + '">')
				.addClass('statusInput')
				.on('click', function() {
					//$(this).attr('value','');
					$('.statusInput').attr('value','');
					
				})
				.bind('keyup', function(e) {
					
					console.log( 
						this.value
					);
					
					search(paramName, this.value );
					
					if (this.value.length==0) {
						
						$('.resultText').html('');
					}
					
				})
				.bind('reset',function() {
					this.value = paramName;
				})
				;
				
		  

		   $('<div></div>')
			.append(statusText)
			.addClass('statusBox')
			.on('click',function() {
				
				$('.backButton').css('visibility','visible');
				
				$('.statusBox').fadeOut('fast');
				$(this).fadeIn('fast');
				$('.statusInput').attr('value','')
				$('.resultText').fadeIn('fast');
				

			})

			.appendTo(divToAppendTo)
			
			;
			
			
		

}



$(document).ready(function() {
	
    console.log( "ready!" );
	
	obj = $("<div id='backButton'>B</div>").addClass('backButton').css('visibility','hidden').on('click',function() {
		
		$(this).css('visibility','hidden');
		$('.resultText').fadeOut('slow');
		$('.resultText').html('');

		$('.statusBox').fadeIn('slow');
		$('.statusInput').trigger('reset');
		
	});
	$('.container').append(obj);
	
	
	
	createInputBox('Kunta','.container');
	createInputBox('Jäte','.container');
	createInputBox('Käsittely','.container');
	
	
	//obj = $("<div id='searchOut'></div>").css('visibility','hidden')

	obj = $("<div id='output'></div>").addClass('resultText')
	$('.container').append(obj);
	
	
	
	
	
});
