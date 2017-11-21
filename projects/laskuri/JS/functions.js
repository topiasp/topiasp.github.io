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

function animalsToTable(arr,targetTableId,updateResults) {
	
	
	// this line will check if the argument is undefined, null, or false
    // if so set it to false, otherwise set it to it's original value
    targetTableId = targetTableId || 'countTable';
	updateResults = updateResults || 'update';
	
	// Clear table
	$('#countTable tr .clickableCell').remove();
	$('#countTable tr .editableCell').remove();
	$('#countTable tr .nonEditableCell').remove();
	$('#countTable tr .deleteCell').remove();
	
	
	arr.map(function(x) { 
	
		
		console.log('Kierros' + x.animalName)

		tblRow = '<tr id='+x.id+'>'
		tblRow += '<td contenteditable="true" class="clickableCell" onclick="selectAnimal(this);">' + x.animalName +' </td>'
		tblRow += '<td contenteditable="true" class="editableCell countCell">' 	+ x.count +'</td>' 
		tblRow += '<td contenteditable="true" class="nonEditableCell">' 	 	+ x.units +'</td>'
		tblRow += '<td contenteditable="true" class="editableCell countCell">' 	+ x.lietelanta +'</td>'
		tblRow += '<td contenteditable="true" class="editableCell countCell">' 	+ x.kuivalantaVirtsa +'</td>'
		tblRow += '<td contenteditable="true" class="editableCell countCell">' 	+ x.kuivikelanta +'</td>'
		
		tblRow += '<td class="deleteCell" onclick="deleteRow(this)">' + '<img src="garbagebin.png" ></img>' + '</td>';
		tblRow += '</tr>'
		
		//#countTable
		
		
		$('#'+targetTableId + ' > tbody:first').append(tblRow);

	});
	
	// Add onclick to cells
	$('td').on('click',function() { cellClick(this); });
	
	// Add onclick to countcells
	$('.countCell').on('click',function() { this.innerText=""; });
	
	// Alter relevant animal onFocusOut
	
	$(".editableCell").focusout(function(){ 
			
			
			console.log('Focus out' + this.innerText);
			
			cell = this;
	
			// Manipulate JSON based on values in selected row
			selectedRowId = cell.parentElement.id;
			selectedRow = cell.parentElement;
			selectedAnimal = animals.filter(function(x) { return( x.id==selectedRowId ) })[0]
			
			
			
			selectedAnimal.animalName 		= $(selectedRow).children().get(0).innerText;
			selectedAnimal.count 			= $(selectedRow).children().get(1).innerText;
			selectedAnimal.units 			= parseFloat(selectedAnimal.unitFactorial * selectedAnimal.count).toFixed(1);

			selectedAnimal.lietelanta		= $(selectedRow).children().get(3).innerText;
			selectedAnimal.kuivalantaVirtsa	= $(selectedRow).children().get(4).innerText;
			selectedAnimal.kuivikelanta		= $(selectedRow).children().get(5).innerText;
			
			
			// Update
			animalsToTable(animals);
			
	});
	
	// Clear empty rows that appear
	$('#'+targetTableId+' tr').each(function () {
     if (!$.trim($(this).text())) $(this).remove();
	});
	
	
	// Create results
	if (updateResults=='update') {
		$('.results').trigger('createResults');
	}
}



// Function for adding empty rows to count table

function addEmptyRow(targetTableId) {

		nullValue = 0;
		
		animals.push({ 
				"id": IdGenerator.nextValue() //$('#countTable tr').length
				,"animalName": '-'
				,"animalId": nullValue
				,'count': nullValue
				,'units': '-'
				,"species": nullValue
				,"unitFactorial": nullValue	
				,"lietelanta": nullValue	
				,"kuivalantaVirtsa": nullValue
				,"kuivikelanta": nullValue
			
			});
		
		console.log('fromm add empty row');
		animalsToTable(animals,targetTableId,'dont_update');
		
		
}

// Function for row removal

function deleteRow(cell)  { 

	// Delete from animals-array and recompile table
	
	selectedRowId = cell.parentElement.id;
	animals = animals.filter(function(x) { return( x.id!=selectedRowId ) });
	
	
	animalsToTable(animals);
	//child  = cell.parentElement;  		// Get parent of cell for removal
	//parent = child.parentElement; 		// Get parent of tablerow for removal
	//parent.removeChild(child);			// Remove child (= tablerow)
	
	
	
}
// Function for retrieving animal information by ID

function getAnimalInfoById(animalId) {
	
	return(
		elaimet.filter(function(x) { return( x.id==animalId ) })[0]
	);
	
}
// Function for handling cell clicks

function cellClick(cell) {
	
	$('tr').removeClass('selectedRow');
	$(cell.parentElement).addClass('selectedRow');
	
	
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
}


/* On load */

$(document).ready(function() {
	
    console.log( "ready!" );
		

	// Add for inserting data and holding counts
	obj = $("<table id='countTable'><tr>	<th>Eläin</th>	<th>Kokonaismäärä</th>	 <th>Eläinyksiköitä</th> <th>Lietelanta</th>	<th>Kuivalanta  + virtsa</th>	<th>Kuivikelanta</th>	</tr></table>").addClass('countTable');
	$('.container').append(obj);
	
	// Add add animal button
	
	obj = $("<img src='table_row_add_after.png'></img>").addClass('icon').on('click',function(x) {
		addEmptyRow('countTable');
	});
	$('.container').append(obj);
	
	
	// Add result div 
	
	//obj = $('<div></div>').addClass('results').bind('createResults',function() {
	$('.results').bind('createResults',function() {
			
		// Count "lietesäiliö" and "KUIVALANTALA + KUIVIKEPOHJA"
		lieteSailioSum = 0;
		kuivalantala_kuivikepohjaSum = 0;
		
		animals.map(function(x) { 
				info = getAnimalInfoById(x.animalId);
				lieteSailioSum += (info.lietelanta * x.lietelanta) + (info.virtsa * x.kuivalantaVirtsa); // Multiply by factorials
				
				
				kuivalantala_kuivikepohjaSum += (info.kuivikelanta_kuivikepohjalanta * x.kuivikelanta) + (info.kuivalanta * x.kuivalantaVirtsa); // Multiply by factorials
		});
		
		// Round to two decimals
		
		lieteSailioSum = parseFloat(lieteSailioSum).toFixed(1);
		kuivalantala_kuivikepohjaSum = parseFloat(kuivalantala_kuivikepohjaSum).toFixed(1);
		
		$(this).html('<p>Lietesäiliö: '+lieteSailioSum+'</p><p>Kuivalantala+kuivikepohja: '+kuivalantala_kuivikepohjaSum+'</p>');
		
		
		
	});
	
	
	
	// Add species to animalSelectors-container
	//const species = [...new Set(elaimet.map(item => item.laji))];
	species = elaimet.map(function(x) { return(x.laji) });
	species = $.unique(species);
	
	
	for (i=0;i<species.length;i++) {	
		obj = $("<div></div>").addClass('speciesContainer').addClass(species[i]).attr('species',species[i]).html(lajit[i]).on('click',function() {
			
			// Make animals belonging to selected species visible
			$(this).children('.animalSelector').toggleClass('visible');

			// Fade out all species and fade in selected species
			$('.speciesContainer').fadeOut();
			$(this).fadeIn();
			
			// Pin border style to get rid of hover
			$(this).css('border','1px solid white');
		});
		
		imgObj = $("<img src='"+species[i]+".png'></img>").addClass('animalIcon');
		$(obj).prepend(imgObj);
		
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
			
			$('.animalSelectorCountInput').toggleClass('visible').focus();
			
			
		});
				
		// Get species and add to species specific container
		
		toAppendTo = '.animalSelectorContainer';
		toAppendTo = '.speciesContainer.' + elaimet[i].laji; 

		$(toAppendTo).append(obj);
		
		
		
	} // End of for-loop
	
	
	
	
	// Add input for asking for animal count to overlay
	
	obj = $("<input placeholder='Määrä, esim. 200..' size=14 ></input>").addClass('animalSelectorCountInput').on('keyup',function(e) {
	
		
		if (e.keyCode==13) { // Something happens if its enter
			
			console.log(e.target.value);
			
			// Retrieve info on selected animal 
			animalInfo = getAnimalInfoById(  $('.selectedAnimal').attr('animalId')  );
			
			selectedRowId = $('.selectedRow').attr('id'); //$('.selectedRow').get(0).rowIndex;
			
			selectedAnimal = animals.filter(function(x) { return( x.id==selectedRowId ) })[0]
			
			selectedAnimal.animalName 		= animalInfo.elain;
			selectedAnimal.count 			= $('.animalSelectorCountInput').get(0).value;
			selectedAnimal.unitFactorial 	= animalInfo.kerroin;
			selectedAnimal.units 			= parseFloat(selectedAnimal.unitFactorial * selectedAnimal.count).toFixed(1);
			selectedAnimal.animalId 		= animalInfo.id;
			selectedAnimal.species 			= animalInfo.laji;
			
			
			animalsToTable(animals,'countTable');
			
			closeNav();
			
			$('.animalSelectorCountInput').toggleClass('visible');
			$('.animalSelectorCountInput').get(0).value = '';
			
			$('.selectedRow').removeClass('selectedRow');
			
		}
	});
	$('.overlay-content').append(obj);


	
	
});
