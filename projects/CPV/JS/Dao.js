


global.DAO  = {

    data: undefined,
    metadata: undefined,

    getDataFromAPI(cb)  {

        var that = this;

        // Function to serve as a callback to metadata fetch
        getActualData = () => {
        
            fetch( global.params.queryData.URL , {
                    body:  JSON.stringify( global.params.queryData.queryJSON ),
                    headers: {                
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                    },
                    method: 'POST', 
                    
                }).then(r => r.json())
                .then(data =>   that.data = data.data   )
                .then(cb);

        }

        // Metadata
        fetch( global.params.queryData.URL , {
            headers: {                
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            method: 'GET', 
            
            }).then(r => r.json())
            .then(data =>   that.metadata = data   )
            .then(getActualData);
        

    },

    TaxCodeDescription(TaxCode) {

        let Taxes = this.metadata.variables.filter(function(m) { return(m.code=='Verolaji')})[0];

        let DescIdx = Taxes.valueTexts[  Taxes.values.indexOf(TaxCode) ];

        return( DescIdx.replace(/[0-9]/g,'').replace(/\./g,'').replace(' - ','') );


    }
    


    ,
    getData(TaxCode) {

        let d = this.data.filter((x) => { return(x.key[0] === TaxCode ) });

        return( new this.Indicator( d  ) );
    }
    ,
    Indicator: function(o) {    



        this.TaxCode = o[0].key[0]
        this.TaxCodeDescription = global.DAO.TaxCodeDescription( o[0].key[0] );
        
	
        this.values = o.map((x) => {  return(x.values[0]*1)  });
        
        
        this.month = o.map((x) => {  return(x.key[2].substr(5,2)  )  });
        this.monthAsDate = o.map(function(x) { return(new Date(  x.key[2].substr(0,4)+'-'+x.key[2].substr(5,2)+'-02'  )) });
        this.monthAndYear = o.map((x) => {  return( x.key[2] )  });

        
        
        this.lastNthObs = function(n)  { return(this.values[(this.values.length-n)])		};
        
        
        this.fitLoess = function(q) {
                    
                var q = q || 0.33;
                var  toLoessF  = this.values.map(function(value,idx) { return(  { y: value, x: idx }) });
                return global.Maths.loes(toLoessF, q);
            
        }

        this.getTimeOfLatestObs = function() {

            return this.monthAsDate[(this.monthAsDate.length-1)];
        }

        this.cumSum = function(arr)  {
            return arr.reduce(function(total, num) {	return total + num; });
        }

        this.cumSumForYear = function(year) {
            year = year || this.getTimeOfLatestObs().getFullYear();
            return this.cumSum(  this.valuesForYear(year)  );
        }

        

        // Function gives the comparable cumulative sum
        this.cumSumYearToDate = function(year) {
            year = year || this.getTimeOfLatestObs().getFullYear();

            let resArray = [];
            for (let idx = 0;idx<this.values.length;idx++) {
                if (this.monthAsDate[idx].getFullYear() == year & this.monthAsDate[idx].getMonth() <= this.getTimeOfLatestObs().getMonth()) {
                    resArray.push(this.values[idx]);
                }
            }
            return this.cumSum(resArray);

        }

        this.cumSumYearToDateChange = function(opts) { // example: { year: 2017, return: prct }
            opts = opts || {};

            let currentYear = this.getTimeOfLatestObs().getFullYear();
            let previousYear = currentYear-1;
            year = opts.year || previousYear; // Default is previous year

            let rtrn = this.cumSumYearToDate() - this.cumSumYearToDate(year);
            
            if (opts.return==='prct') {
                
                rtrn = 100-(this.cumSumYearToDate() / this.cumSumYearToDate(year) * 100);
                

            }

            return rtrn;

        }

        this.getValues = function() {

            return this.values;
        }

        this.valuesForYear = function(year) {
            let resArray = [];
            for (let idx = 0;idx<this.values.length;idx++) {
                if (this.monthAsDate[idx].getFullYear() == year) {
                    resArray.push(this.values[idx]);
                }
            }
            
            return resArray;

        }

        this.valuesAsObjects = function(year) {

            

            var year = year || 9999;

            let resArray = [];
            for (let idx = 0;idx<this.values.length;idx++) {
                if (this.monthAsDate[idx].getFullYear() == year || year == 9999 ) {
                    
                    resArray.push({
                        value: 	this.values[idx]
                        ,month:    this.month[idx]
                        ,monthAsDate: this.monthAsDate[idx]
                        ,year: this.monthAsDate[idx].getFullYear()
                    });
                }
            }
            return resArray;
        }
        this.getYears = function() {

            return this.monthAsDate.map(function(x) { return x.getFullYear()  }).filter(
                function onlyUnique(value, index, self) { 
                    return self.indexOf(value) === index;
                });
        },
        this.getMean = function() {

            return global.Maths.mean(this.getValues());
        }



    }

}

