var globalHelp;

// Id generator

function valueKeeper(initvalue=0) {
    this.currentValue = initvalue;

	this.nextValue = function() {
		
		this.currentValue += 1;
		
		return(this.currentValue);
		
	}
}

// Init IdGenerator

IdGenerator = new valueKeeper(12345);

/* Function for inserting animals into table */

function animalsToTable(arr,targetTableId='countTable') {
	
	// Clear table
	$('#countTable tr .editableCell').remove()
	$('#countTable tr .deleteCell').remove()
	
	
	arr.map(function(x) { 
	
		
		console.log('Kierros' + x.animalName)

		tblRow = '<tr id='+x.id+'>'
		tblRow += '<td contenteditable="true" class="editableCell" onclick="selectAnimal(this);">' + x.animalName +' </td>'
		tblRow += '<td contenteditable="true" class="editableCell countCell">' + x.count +' </td>' 
		tblRow += '<td contenteditable="true" class="nonEditableCell">' + x.unitFactorial +' </td>'
		tblRow += '<td contenteditable="true" class="editableCell countCell">' + x.lietelanta +' </td>'
		tblRow += '<td contenteditable="true" class="editableCell countCell">' + x.kuivalantaVirtsa +' </td>'
		tblRow += '<td contenteditable="true" class="editableCell countCell">' + x.kuivikelanta +' </td>'
		
		tblRow += '<td class="deleteCell" onclick="deleteRow(this)">' + '<img src="garbagebin.png" ></img>' + '</td>';
		tblRow += '</tr>'
		
		//#countTable
		
		
		$('#'+targetTableId + ' > tbody:first').append(tblRow);

	});
	
	
	// Add onclick to cells
	$('.countCell').on('click',function() { this.innerText=""; });
	
	// Clear empty rows that appear
	$('#'+targetTableId+' tr').each(function () {
     if (!$.trim($(this).text())) $(this).remove();
	});
	
}

// Function for selecting cell clicks

function cellClick(obj) {
	
	globalHelp = obj;
	obj.innerText=""

	
}

// Function for adding empty rows to count table

function addEmptyRow(targetTableId) {
	
	
		
	
		nullValue = '...';
		
		animals.push({ 
				"id": IdGenerator.nextValue() //$('#countTable tr').length
				,"animalName": nullValue
				,"animalId": nullValue
				,'count': nullValue
				,"species": nullValue
				,"unitFactorial": nullValue	
				,"lietelanta": nullValue	
				,"kuivalantaVirtsa": nullValue
				,"kuivikelanta": nullValue
			
			});
	
		animalsToTable(animals,'countTable');
		
		
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

// Function for opening overlay for animal selection

function selectAnimal(cell) {
	
	
	console.log(cell.parentElement.id)
	
	// Mark row as selected 
	
	
	$(cell.parentElement).addClass('selectedRow');
	
		
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
	
	
	
	
	// Add species to animalSelectors-container
	const species = [...new Set(elaimet.map(item => item.laji))];
	
	
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
			
			$('.animalSelectorCountInput').toggleClass('visible');
			
		});
				
		// Get species and add to species specific container
		
		toAppendTo = '.animalSelectorContainer';
		toAppendTo = '.speciesContainer.' + elaimet[i].laji; 

		$(toAppendTo).append(obj);
		
		
		
	} // End of for-loop
	
	// Add input for asking for animal count
	
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
			selectedAnimal.animalId 		= animalInfo.id;
			selectedAnimal.species 			= animalInfo.laji;
			
			/*
				
				"rowIndex": $('#countTable tr').length
				,"animalName": nullValue
				,"animalId": nullValue
				,'count': nullValue
				,"species": nullValue
				,"unitFactorial": nullValue	
				,"lietelanta": nullValue	
				,"kuivalantaVirtsa": nullValue
				,"kuivikelanta": nullValue
			
			});
			*/
			animalsToTable(animals,'countTable');
			
			closeNav();
			
			$('.animalSelectorCountInput').toggleClass('visible');
			$('.animalSelectorCountInput').get(0).value = '';
			
			$('.selectedRow').removeClass('selectedRow');
			
		}
	});
	$('.overlay-content').append(obj);


	
	
});
