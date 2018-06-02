var globalHelp;

// Id generator

function valueKeeper(initvalue) {
	
	initvalue = initvalue || 0;
	
    this.currentValue = initvalue;

	this.nextValue = function() {
		
		this.currentValue += 1;
		
		return(this.currentValue);
		
	}
}

// Init IdGenerator

IdGenerator = new valueKeeper(12345);

/* Function for inserting animals into table */

function createAnimalCard(id,cardId) {
	
	var altTitle = altTitle || species;
	
	animal = getAnimalInfoById(id);
	
	rtrnObj = $('<div></div').attr('id',cardId).addClass('animalCard').html('<img src="'+animal.laji+'.png"></img>').on('click',function() {
		
		
		
		displayAnimal(cardId);
	});
	
	rtrnObj.append($('<div><div>').addClass('animalCardHeader').html('<p>'+animal.elain+'</p>'));
	
	
	return(rtrnObj);
}



// Function for adding empty rows to count table

function createAnimal(id,count) {


		var count = count || 0;

		animal = getAnimalInfoById(id);
		
		animal['cardId']	= IdGenerator.nextValue();
		animal['count']		= count;
		
		animal['lietelannalla_count'] = 0;
		animal['kuivikelannalla_count'] = 0;
		animal['kuivalanta_virtsa_count'] = 0;
		
		return(animal)
		
		
}

// Function for row removal

// Function for retrieving animal information by ID

function getAnimalInfoById(animalId) {
	
	return(
		elaimet.filter(function(x) { return( x.id==animalId ) })[0]
	);
	
}
// Display animal info 

function displayAnimal(cardId) {
	
	
	// Make animals belonging to selected species invisible
	$('.animalSelector').removeClass('visible');
	
	// Remove selection from previously selected animal 
	$('.animalSelector').removeClass('selectedAnimal');

	// Fade in species container
	$('.speciesContainer').fadeOut();
	
	// animalCardInfoContainer visible
	$('.animalCardInfoContainer').addClass('visible');
	
	// Create info 
	
	animal = animals.filter(function(x)  { return(x.cardId==cardId) })[0];

	imgString = $('<img src="'+animal.laji+'.png"></img>')//.addClass('animalInfoCard');
	
	headerString = '<h2>'+animal.elain+'</h2>' ;
	
	// Push to container 
	$('.animalCardInfoContainer').append(imgString);
	
	$('.animalCardInfoContainer').append(headerString);

	
	// Animal count
	
	$('.animalCardInfoContainer').append('<p>Eläinten lukumäärä</p>');
	inputObj = $('<input type="number" placeholder="Eläinten lukumäärä" size="5" value="'+ animal.count +'"></input>').on('change',function() {
		
		
		var newVal = $(this).get(0).value;
		animal.count = newVal;
	})
		.on('click',function() {
			$(this).get(0).value="";
		
	});

	$('.animalCardInfoContainer').append(inputObj);
	
	// Eläinyksikkökerroin
	$('.animalCardInfoContainer').append('<p>' + 'Eläinyksikkökerroin:<br>' + animal.kerroin + '</p>');
	
	// Lietelannalla
		$('.animalCardInfoContainer').append('<p>Lietelannalla</p>')
	inputObj = $('<input type="number" placeholder="Lietelannalla" size=5 value="'+ animal.lietelannalla_count +'"></input>').on('change',function() {
		var newVal = $(this).get(0).value;
		animal.lietelannalla_count = newVal;
	}).on('click',function() {
			$(this).get(0).value="";
		
	});
	
	$('.animalCardInfoContainer').append(inputObj );
	
	
	// kuivalanta_virtsa_count
	$('.animalCardInfoContainer').append('<p>Kuivalanta + virtsa</p>')
	inputObj = $('<input type="number" placeholder="Kuivalanta + virtsa" size=5 value="'+ animal.kuivalanta_virtsa_count +'"></input>').on('change',function() {
		var newVal = $(this).get(0).value;
		animal.kuivalanta_virtsa_count = newVal;
	}).on('click',function() {
			$(this).get(0).value="";
		
	});

	$('.animalCardInfoContainer').append(inputObj );
	
		// kuivikelannalla_count
	$('.animalCardInfoContainer').append('<p>Kuivikelanta</p>')
	inputObj = $('<input type="number" placeholder="Kuivikelanta" size=5 value="'+ animal.kuivikelannalla_count +'"></input>').on('change',function() {
		var newVal = $(this).get(0).value;
		animal.kuivikelannalla_count = newVal;
	}).on('click',function() {
			$(this).get(0).value="";
		
	});

	$('.animalCardInfoContainer').append(inputObj );

	
	// Open card
	
	openNav();
}



// Function for opening overlay for animal selection

function selectAnimal(cell) {
		
	// Make animals belonging to selected species invisible
	$('.animalSelector').removeClass('visible');
	
	// Remove selection from previously selected animal 
	$('.animalSelector').removeClass('selectedAnimal')

	// Fade in species container
	$('.speciesContainer').fadeIn();
	
	openNav();
}

// Overlay functionality

/* Open when someone clicks on the span element */
function openNav() {
    document.getElementById("myNav").style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
    document.getElementById("myNav").style.width = "0%";
	
	$('.animalCardInfoContainer').children().remove();
	$('.resultContainer').children().remove();
	
}


/* On load */

$(document).ready(function() {
	
    console.log( "ready!" );
		

	
	
	
	// Add species to animalSelectors-container
	species = elaimet.map(function(x) { return(x.laji) });
	species = $.unique(species);
	
	
	for (i=0;i<species.length;i++) {	
		obj = $("<div></div>").addClass('speciesContainer').css('display','none').addClass(species[i]).attr('species',species[i]).html('<span>'+lajit[i]+'</span>').on('click',function() { // html('<span>'+lajit[i]+'</span>')
			
			// Make animals belonging to selected species visible
			$(this).children('.animalSelector').toggleClass('visible');

			// Fade out all species and fade in selected species
			$('.speciesContainer').fadeOut();
			$(this).fadeIn();
			
			// Pin border style to get rid of hover
			//$(this).css('border','1px solid white');
		});
		
		imgObj = $("<img src='"+species[i]+".png'></img>").addClass('animalIcon'); // <span>"+lajit[i]+"</span>
		$(obj).append(imgObj);
		
		// Add to overlay
		$('.overlay-content').append(obj);
	}
	
	// Add animals to container
	
	
	for (i = 0; i < elaimet.length; i++) { 
		
		obj = $("<div>" + elaimet[i].elain + "</div>").addClass('animalSelector').attr('animalId', elaimet[i].id ).on('click',function(e) {
			
			// now this part stops the click from propagating
			if (!e) var e = window.event;
			e.cancelBubble = true;
			if (e.stopPropagation) e.stopPropagation();
			
			
			$('.selectedAnimal').removeClass('selectedAnimal')
			
			$(this).addClass('selectedAnimal');
			
			
			// Fade out all species 
			$('.speciesContainer').removeClass('visible');
			// Fade out all animal types
			$('.animalSelector').removeClass('visible');
			// Fade in only selected animal
			$('.selectedAnimal').toggleClass('visible');
			
			// Create animal
			
			species_id = $(this).attr('animalId');
			
			
			animal = createAnimal(species_id);
			
			animals.push( animal );

			
			
			// Create card of selected animal
			
			$('.container').prepend(createAnimalCard(species_id,animal['cardId']));
			
			closeNav();
			
		});
				
		// Get species and add to species specific container
		
		toAppendTo = '.animalSelectorContainer';
		toAppendTo = '.speciesContainer.' + elaimet[i].laji; 

		$(toAppendTo).append(obj);
		
		
		
	} // End of for-loop
	
	
	
		
	// Add a container for animal info's
	
	obj = $("<div></div>").addClass('animalCardInfoContainer');
	$('.overlay-content').append(obj);
	
	// Add a container for results
	
	obj = $("<div></div>").addClass('resultContainer').bind('createResults',function() {
			
		lieteSailioSum = 0;
		kuivalantala_kuivikepohjaSum = 0;
		elaimiaSum = 0;
		elainYksikoitaSum = 0;
		
		animals.map(function(x) { 
				info = getAnimalInfoById(x.id);
				
				elaimiaSum += x.count*1;
				elainYksikoitaSum += (x.count*1) * x.kerroin;
				
				lieteSailioSum += (info.lietelanta * x.lietelannalla_count) + (info.virtsa * x.kuivalanta_virtsa_count); // Multiuply by coefficient
				
				
				kuivalantala_kuivikepohjaSum += (info.kuivikelanta_kuivikepohjalanta * x.kuivikelannalla_count) + (info.kuivalanta * x.kuivalanta_virtsa_count); // Multiply by coefficient
		});
		
		// Round to two decimals
		
		lieteSailioSum 					=	parseFloat(lieteSailioSum).toFixed(1);
		kuivalantala_kuivikepohjaSum 	= 	parseFloat(kuivalantala_kuivikepohjaSum).toFixed(1);
		elainYksikoitaSum 				= 	parseFloat(elainYksikoitaSum).toFixed(1);
		
		
		$(this).html('<p>Eläimiä: '+elaimiaSum+'</p><p>Eläinyksiköitä: '+elainYksikoitaSum+'</p><p>Lietesäiliö: '+lieteSailioSum+'</p><p>Kuivalantala+kuivikepohja: '+kuivalantala_kuivikepohjaSum+'</p>');
		
		
		
	});
	$('.overlay-content').append(obj);
	
	

	//species_id = 1;
			
	//animal = createAnimal(species_id,567);
			
	//animals.push( animal );

	// Create card of selected animal		
	//$('.container').prepend(createAnimalCard(species_id,animal['cardId']));
		
	selectAnimal();
			
	// Add add animal button
	obj = $("<img src='table_row_add_after.png'></img>").addClass('addAnimalIcon').addClass('animalCard').on('click',function(x) {
			
			selectAnimal();
				
	});
	$('.container').append(obj);
	
	// Add result div 
	
	obj = $('<div></div>').addClass('resultButton');//.append('<h3>Tulokset</h3>');
	$('.container').append(obj);
	
	$('.resultButton').append('<p>Tulokset<p>');

	$('.resultButton').on('click',function() {
		
		// Make animals belonging to selected species invisible
		$('.animalSelector').removeClass('visible');
		
		// Remove selection from previously selected animal 
		$('.animalSelector').removeClass('selectedAnimal');

		// Fade in species container
		$('.speciesContainer').fadeOut();
		
		$('.animalCardInfoContainer').removeClass('visible');
		
		// Create info 
		$('.resultContainer').trigger('createResults')
		
		
		openNav();
		
	});
	
	
	/*
	
	$('.results').bind('createResults',function() {
			
		// Count "lietesäiliö" and "KUIVALANTALA + KUIVIKEPOHJA"
		lieteSailioSum = 0;
		kuivalantala_kuivikepohjaSum = 0;
		
		animals.map(function(x) { 
				info = getAnimalInfoById(x.animalId);
				
				lieteSailioSum += (info.lietelanta * x.lietelanta) + (info.virtsa * x.kuivalantaVirtsa); // Multiply by coefficient
				
				kuivalantala_kuivikepohjaSum += (info.kuivikelanta_kuivikepohjalanta * x.kuivikelanta) + (info.kuivalanta * x.kuivalantaVirtsa); // Multiply by coefficient
		});
		
		// Round to two decimals
		
		lieteSailioSum 					=	parseFloat(lieteSailioSum).toFixed(1);
		kuivalantala_kuivikepohjaSum 	= 	parseFloat(kuivalantala_kuivikepohjaSum).toFixed(1);
		
		$(this).html('<p>Lietesäiliö: '+lieteSailioSum+'</p><p>Kuivalantala+kuivikepohja: '+kuivalantala_kuivikepohjaSum+'</p>');
		
		
		
	});
	*/
});
