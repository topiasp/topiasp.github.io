


$(document).ready(function() {	


	
	var yearsArr = kuntadata.map(function(obj) { return obj.vuosi; });
	yearsArr = yearsArr.filter(function(v,i) { return yearsArr.indexOf(v) == i; });

	
	
	// Create legend
	
	var legendStart=50;

	paletti.forEach(function(p,i) { 
	
		
		
		if (i==0) { legendLocation=50 };
		if (i>0) { legendLocation=legendLocation+20 };
		
		
		var nelio = $('<rect x="450" y="' +  legendLocation + '"  height="15" width="15"" style="stroke-width:1;stroke:rgb(0,0,0)"> </rect>').css('fill',p);
		
		var teksti = $('<text x="470" y="' +  (legendLocation+12) + '" style="font-family: Avantgarde, sans-serif;font-size:14; opacity:0.8;" >' + rajat[i] + '-' + rajat[i+1]  +  '%</text>')
		 
		
		
		$('.kartta').append(nelio);
		$('.kartta').append(teksti);

		
		
	});
	
	
	// Refresh
	$("body").html($("body").html());

	
	
	// Push years
	for (var i=0;i<yearsArr.length;i++) {
		
		$('#year').append("<div class='infoYear' style='display: none'>"+ yearsArr[i] + "</div>")
	
	}
	
	// hide all quotes except the first
	$('.infoYear').hide().eq(0).show();

	var pause = 2000;
	var motion = 500;

	var years = $('.infoYear');
	var count = years.length;
	var i = 0;

	
	function changeMapYear(year) {
		
		g = $('.kartta g');
		g.splice(0, 2);
		g.map(function(x) { 
			
			pno = $(this).attr('kuntakoodi');
			
			tmp = kuntadata.filter(function(x) { return(x['kuntakoodi']==pno) });
			
			tmp = tmp.filter(function(x) { return(x['vuosi'] == year)  });
			
			if (tmp.length>0) {
				$(this).css('fill',   tmp[0]['luokka']  ) 
			
				// Add event listener only for the last year
				if (year==2016) {
					
					
					$(this).attr('kuntanimi',tmp[0]['alue']);
					$(this).attr('arvo',tmp[0]['arvo']);
					
					$(this).click(function() {
						alert('Kunta('+ $(this).attr('kuntakoodi') +'): ' + $(this).attr('kuntanimi') + ', arvo: ' + $(this).attr('arvo') ); //$(this).children('div')[0].innerHTML );
					});
				}
			}
		});
		
		
		
	}
	
	changeMapYear(years[0].innerHTML);
	

	// Add divs for single figures
	
	figBox  = $('<div></div>').addClass('figBox');
	figText =  $('<div>20-29 -vuotiaita Suomen väestöstä</div>').addClass('figText')
	fig = $('<div></div>').addClass('figure')
	figBox.append(figText)
	figBox.append(fig)
	$('#figures').append(figBox);
	
	figBox  = $('<div></div>').addClass('figBox');
	figText =  $('<div>20-29 -vuotiaista kuusikkokunnissa</div>').addClass('figText')
	fig = $('<div></div>').addClass('figure')
	figBox.append(figText)
	figBox.append(fig)
	$('#figures').append(figBox);
	
	// Draw linechart
	
	/*
		
	// Set the dimensions of the canvas / graph
	var margin = {top: 30, right: 20, bottom: 30, left: 50},
		width = 600 - margin.left - margin.right,
		height = 270 - margin.top - margin.bottom;

	// Parse the date / time
	var parseDate = d3.time.format("%d-%b-%y").parse;

	// Set the ranges
	//var x = d3.time.scale().range([0, width]);
	var x = d3.scale.linear().range([0, width]);
	var y = d3.scale.linear().range([height, 0]);

	// Define the axes
	var xAxis = d3.svg.axis().scale(x)
		.orient("bottom").ticks( years.length/2 );

	var yAxis = d3.svg.axis().scale(y)
		.orient("left").ticks(5);

	// Define the line
	
	var valueline = d3.svg.line()
		.x(function(d) { return x(d.Vuosi*1); })
		.y(function(d) { return y(d.osuus*1); });
		
	// Adds the svg canvas
	var svg = d3.select("#lineChart")
		.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("transform", 
				  "translate(" + margin.left + "," + margin.top + ")");

	// Get the data
	
	data = nuorten_osuus;
	
	
	// Scale the range of the data
	x.domain(d3.extent(data, function(d) { return d.Vuosi*1; }));
	y.domain([0, d3.max(data, function(d) { return d.osuus*1; })]);

	// Add the valueline path.
	svg.append("path")
		.attr("class", "line")
		.attr("d", valueline(data));

	// Add the X Axis
	svg.append("g")
		.attr("class", "x axis")
		
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)
		.selectAll("text")
		.attr("y", 9)
		.attr("x", -50)
		.attr("dy", "-0.35em")
		.attr("transform", "rotate(-90)")
		.style("text-anchor", "start");
		

	// Add the Y Axis
	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis);


	svg.attr('class','lineChart')

	*/
	// Animate years
	
	
	
	
	$( ".infoYear" ).eq(0).show( "fast", function showNext() {
			
			$( this ).next( ".infoYear" ).delay(1).show( 'slow', showNext );
			$( this ).prev( ".infoYear" ).hide('slow');
			
			
			year = $(this)[0].innerHTML;
			
			changeMapYear(year);

			osuus = nuorten_osuus.filter(function(x) { 							return(x['Vuosi'] == year)			})[0]['osuus']
			osuus_vaestosta = nuorten_osuus.filter(function(x) { 				return(x['Vuosi'] == year)			})[0]['osuus_vaestosta']
			
			f = $('.figBox').children('.figure')[0].innerHTML = osuus_vaestosta+' %';
			f = $('.figBox').children('.figure')[1].innerHTML = osuus+' %';
		
	});
	
	
	
});