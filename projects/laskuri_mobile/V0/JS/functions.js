
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
		elaimet.filter(function(x) { return( x.id==elukka ) })[0].kerroin
	);
	
}

function showAnimal(elainID) {
	
	imageFileName = 'pigButton.png';
	
	laji = elaimet.filter(function(x) { return( x.id==elainID ) })[0].laji
	
	
	if ( laji == 'cow' ) { 			 imageFileName  = 'cow.jpg'; 	}
	if ( laji == 'horse' )  {		 imageFileName  = 'horse.png';	}
	
	$('.animalImage').attr('src', imageFileName);
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
	

   
	
	//<p class='countHeader'>Eläinyksiköitä</p>
	
	// Count number of units
	obj = $("<div value='0'><p class='countText'>...</p><p class='addedAnimal'></p></div>").addClass('countContainer');
	$('#elainyksikkoLaskuri').append(obj);
	
	// Tabulate number of units per species
	obj = $("<div><table id='countTable'><tr><th>Eläin</th><th>Lukumäärä</th><th>Eläinyksiköitä</th><th>Kerroin</th><tr></table></div>").addClass('countTable');
	
	$('.countContainer').append(obj);
	
	
	
	obj = $("<div><input placeholder='Määrä, esim. 200..' size=15 class='animalSelectorCountInput' ></input></div>").addClass('animalSelectorCountInputContainer').css('display','none').on('keyup',function(e) {
	
		if (e.keyCode==13) {
			
			
			// Selected animal
			elukka = $('.selectedAnimal')[0].innerHTML;
			elukkaID = $('.selectedAnimal').attr('elainid')
			
			// Get factor
			var kerroin = getElainyksikkoKerroin(elukkaID);
			
			
			// Print name of added animal
			/*
			$('.addedAnimal').fadeIn(1);
			$('.addedAnimal')[0].innerHTML = '+ ' + elukka;
			$('.addedAnimal').fadeOut(1000);
			*/
			// Calc new value
			prevValue = $('.countContainer').attr('value')*1;
			
			lisaysLkm = $('.animalSelectorCountInput')[0].value;
			lisaysYksikoita = kerroin * lisaysLkm;
			
			// Update value
			$('.countContainer').attr('value',prevValue + lisaysYksikoita);
			$('.countText')[0].innerHTML = 'Eläinyksiköitä ' + parseFloat($('.countContainer').attr('value')).toFixed(1);
		
			// Remove animal selection, empty and hide input
			$('.selectedAnimal').removeClass('selectedAnimal');
			$('.animalSelectorCountInputContainer').fadeOut(500);
			$('.animalSelectorCountInput')[0].value = ""
			$('.animalImage').fadeOut(1000);
			
			// Hide all species under containers
			//$('.speciesContainer').children().removeClass('visible');
			
			// Table visible 
			
			if ($('#countTable').css('visibility') == 'hidden') {
				$('#countTable').css('visibility','visible');
			}
			
			// Push to table 
			
			tblRow = '<tr><td>' +  elukka  + '</td><td> ' + lisaysLkm + '  </td><td> ' + parseFloat(lisaysYksikoita).toFixed(1) +  ' </td><td>' + kerroin + '</td></tr>';
			//$('.countTable').children('table').get(0).append(tblRow);
			
			$('#countTable > tbody:first').append(tblRow); 
			//$("#myTable > tbody").append("<tr><td>row content</td></tr>");
			//$('.countTable').children('table').get(0).append(tblRow);
		}
	
	})
	
	;
	$('#elainyksikkoLaskuri').append(obj);
	
	
	/* Add div animalSelectors */
	
	obj = $("<div></div>").addClass('animalSelectorContainer');
	$('#elainyksikkoLaskuri').append(obj);
	
	
	/* Add divs for each elukka-laji */
	
	
	// Cow
	obj = $("<div></div>").addClass('speciesContainer').addClass('cow').attr('species','cow').html('Lehmät').on('click',function(e) {
		
		
		$('.speciesContainer.cow').children().toggleClass('visible')
	});
	
	imgObj = $("<img src='cow.png'></img>").addClass('animalImageIcon');
	$(obj).append(imgObj);
	
	$('.animalSelectorContainer').append(obj);
	
	
	// Pig
	obj = $("<div></div>").addClass('speciesContainer').addClass('pig').attr('species','pig').html('Possut').on('click',function(e) {
		$('.speciesContainer.pig').children().toggleClass('visible')
	});
	imgObj = $("<img src='pig.png'></img>").addClass('animalImageIcon');
	$(obj).append(imgObj);
	
	$('.animalSelectorContainer').append(obj);
	
	
	// Horse
	obj = $("<div></div>").addClass('speciesContainer').addClass('horse').attr('species','horse').html('Hepat').on('click',function(e) {
		$('.speciesContainer.horse').children().toggleClass('visible')
	});
	
	imgObj = $("<img src='horse.png'></img>").addClass('animalImageIcon');
	$(obj).append(imgObj);
	
	$('.animalSelectorContainer').append(obj);
	
	// Muu
	obj = $("<div></div>").addClass('speciesContainer').addClass('muu').attr('species','muu').html('Muut').on('click',function(e) {
		$('.speciesContainer.muu').children().toggleClass('visible')
	});
	
	$('.animalSelectorContainer').append(obj);
	
	
	/* Add divs for each elukka */
	
	
	
	for (i = 0; i < elaimet.length; i++) { 
		
		obj = $("<div>" + elaimet[i].elain + "</div>").addClass('animalSelector').attr('elainID', elaimet[i].id ).on('click',function(e) {
			
			// now this part stops the click from propagating
			if (!e) var e = window.event;
			e.cancelBubble = true;
			if (e.stopPropagation) e.stopPropagation();
			
			
			$('.selectedAnimal').removeClass('selectedAnimal')
			
			$(this).addClass('selectedAnimal');
			
			
			
			$('.animalSelectorCountInputContainer').fadeIn(500,function() {
				$('.animalSelectorCountInput').focus();
			})
			
			
		})
		/*
		.on('mouseover',function() {
				$('.animalImage').fadeIn(500);
				showAnimal( $(this).attr('elainID') );				
		}).on('mouseout',function() {				
				$('.animalImage').fadeOut(100);	
		});
		
		*/
		
		// Get species and add to species specific container
		
		toAppendTo = '.animalSelectorContainer';
		
		if (elaimet[i].laji !='NA' ) {
			toAppendTo = '.speciesContainer.' + elaimet[i].laji; // .speciesContainer.cow
		} else {
			toAppendTo = '.speciesContainer.muu';
		}
		
		
		$(toAppendTo).append(obj);
		
		
		
	}
	
	
	
	/*
	obj = $("<img src='pigButton.png'></img>").addClass('animalImage').css('display','none');
	$('#elainyksikkoLaskuri').append(obj);
	*/	
	
	/*
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
	*/
	
	
	
	
});
