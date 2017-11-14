
var globalHelp;
var globalHelp2;

/* Open tab function */


function openTab(tabName) {
	
	
	console.log('#'+tabName);
	
	$('.tabcontent').css('display','none');
	
	//$('#'+tabName).css('display','block');
	
	
	/*
    var i, tabcontent, tablinks;
    
	tabcontent = document.getElementsByClassName("tabcontent");
	
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    
	for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
   //evt.currentTarget.className += " active";
   */
}

function getElainyksikkoKerroin(elukka) {
	
	return(
		elaimet.filter(function(x) { return( x.elain==elukka ) })[0].kerroin
	);
	
}


/* On load */

$(document).ready(function() {
	
    console.log( "ready!" );
		
		
	/*
	<div id="elainyksikkoLaskuri" class="tabcontent">
  <h3>London</h3>
  <p>London is the capital city of England.</p>
</div>
  <button class="tablinks" onclick="openCity(event, 'elainyksikkoLaskuri')">Eläinyksikkölaskuri</button>
  <button class="tablinks" onclick="openCity(event, 'lantaLaskuri')">Lantalaskuri</button>
  <button class="tablinks" onclick="openCity(event, 'peltoLaskuri')">Peltolaskuri</button>
	*/
		

	obj =  $('<div id="elainyksikkoLaskuri"></div>').addClass('tabcontent')//.css('display','none');
	$('.container').append(obj);
	
	obj =  $('<div id="lantaLaskuri"></div>').addClass('tabcontent');
	$('.container').append(obj);
	
	// Add tab buttons
	
	
	obj = $('<button>Eläinyksikkölaskuri</button>').addClass('tablinks').on('click',function() {
		$('.tabcontent').css('display','none');
		$('.tablinks').removeClass('active');
		
		$('#elainyksikkoLaskuri').css('display','block');
		
		$(this).addClass('active');
		}
	
	);	
	$('.tab').append(obj);

	obj = $('<button>Lantalaskuri</button>').addClass('tablinks').on('click',function(e) {
		$('.tabcontent').css('display','none');
		$('.tablinks').removeClass('active');
		
		$('#lantaLaskuri').css('display','block');
		$(this).addClass('active');
	
		}
	);	
	$('.tab').append(obj);
	


	
	
	obj = $("<div value='0'><p class='countHeader'>Eläinyksiköitä</p><p class='countText'>...</p><p class='addedAnimal'></p></div>").addClass('countContainer');
	$('#elainyksikkoLaskuri').append(obj);
	
	
		
		
	obj = $("<div id='pigButton'><img src='pigButton.png'></img></div>").addClass('animalButton').on('click',function() {
		
		console.log('click!');
		$(this).css('width',200).css('height',200);
		
		
		elukka = 'Joutilas emakko ydinsikalassa';
		
		var kerroin = getElainyksikkoKerroin(elukka);
		$('.addedAnimal').fadeIn(1);

		$('.addedAnimal')[0].innerHTML = '+ ' + elukka;
		
		$('.addedAnimal').fadeOut(1000);
		
		
		prevValue = $('.countContainer').attr('value')*1;
		
		$('.countContainer').attr('value',prevValue + kerroin);
		
		$('.countText')[0].innerHTML = parseFloat($('.countContainer').attr('value')).toFixed(1);
		
		
	});
	$('#elainyksikkoLaskuri').append(obj);
	
	obj = $("<div id='cowButton'><img src='cowButton.jpg'></img></div>").addClass('animalButton').on('click',function() {
		
		console.log('click!');
		$(this).css('width',200).css('height',200);
		

					
		elukka = 'Lypsylehmä';
		
		var kerroin = getElainyksikkoKerroin(elukka);

		$('.addedAnimal').fadeIn(1);

		$('.addedAnimal')[0].innerHTML = '+ ' + elukka;
		
		$('.addedAnimal').fadeOut(1000);
		
		prevValue = $('.countContainer').attr('value')*1;
		
		$('.countContainer').attr('value',prevValue + kerroin);
		
		$('.countText')[0].innerHTML = parseFloat($('.countContainer').attr('value')).toFixed(1);
		
		
	});
	
	
	$('#elainyksikkoLaskuri').append(obj);	
	
	
	
	
	
});
