
var globalHelp;
var globalHelp2;



$(document).ready(function() {
	
    console.log( "ready!" );
		
		
	
	obj = $("<div value='0'><p>...</p></div>").addClass('count');
	
	$('.container').append(obj)
	
	
		
		
	obj = $("<div id='pigButton'><img src='pigButton.png'></img></div>").addClass('animalButton').on('click',function() {
		
		console.log('click!');
		$(this).css('width',300).css('height',300);
		
		prevValue = $('.count').attr('value')*1;
		
		$('.count').attr('value',prevValue+1);
		
		$('.count p')[0].innerHTML = $('.count').attr('value')
		
		
	});
	$('.container').append(obj);
	
	
	
	
	
	
});
