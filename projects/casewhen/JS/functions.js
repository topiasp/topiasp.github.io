

function createBreaks(LowerBound,UpperBound,NumberOfBreaks,By) {
    
    LowerBound = LowerBound || 0;
    UpperBound = UpperBound || 10000;
    NumberOfBreaks = NumberOfBreaks || 0;
    By = By || 0;

    let res = [LowerBound];

    let breakLength = (UpperBound - LowerBound) / NumberOfBreaks;
    let iterator = 0;

    

    while ( Math.max(...res) < UpperBound | iterator > 9999) {

        res.push( Math.max(...res) + breakLength)


        iterator++; // Fail safe
    }
    
    return res;

}



function sqlColour(s,type) {


    return("<span class='sql-"+type+"'>"+s+"</span>")
}


function createElement(s,luokka,tyyppi) {

    luokka = luokka || "";
    tyyppi = tyyppi || 'span'
    s = s || '';
    let rtrn = document.createElement(tyyppi)

    if (s!='') {
        rtrn.innerHTML = s;
    }


    if (luokka!='') {
        rtrn.setAttribute('class',luokka)
    }


    return rtrn;
}


function createCASEWHEN(arr,varname,openEnded,RowNumbers) {

    varname = varname || 'variable';

    if (/.\(/.test(varname))  { // Ttst for opening brackets -> includes functions

        tmp =  varname.split(/([A-Za-z]+\()/g)

        tmp = tmp.map((s) => {
           if ( /[A-Za-z]+\(/.test(s) ) {                       // Test if includes an opening bracket with leading alphabet
                return sqlColour(s.replace(/\(/,''),'function') + '(' ;  // Dont include trailing bracket
           } else {
                return(s)
           }
        })
        
        varname = tmp.join('')
       
    }
    


    let arrWithCaseWhen = arr.map((cur,idx,a) => { 

        // define rtrn
        let rtrn ='';

        // Create rownumber string
        // If under 10 and array lenght>9 then add leading zero to ensure order by goes as expected
        rowNumber =  (function() { 

                        s = idx+'. ';

                        if (a.length>10 & idx<10) {
                            s = '0'+idx+'.  '
                        }

                        if (RowNumbers) return(s); 

                        return('')

                    })()  ; 
        
        // Start only with second element in arr
        if (idx>0  )     { 
            
            prevValue = a[(idx-1)];
            cur = (cur-1);

            if (idx == (a.length-1) & !openEnded) {
                cur += 1
            }
           
        
            rtrn =   sqlColour('  WHEN ','clause')
                    + varname
                    + sqlColour(' BETWEEN ','clause')
                    + prevValue 
                    + sqlColour(' AND ','clause')
                    + cur 
                    + sqlColour(' THEN ','clause') 
                    + sqlColour("'" + rowNumber  + prevValue + " - " + (cur) + "'",'quote')
                  
        }
        
        // If last of array & openended, add an additional CASE WHEN
        if (idx == (a.length-1) & openEnded) {

            cur += 1 // Add one since its substracted

            rtrn += '\n' 
                + sqlColour('  WHEN ','clause')
                + varname
                + sqlColour(' >= ','clause')
                + cur 
                + sqlColour(' THEN ','clause')
                + sqlColour("'" +  (rowNumber.replace(/[^0-9]/,'')*1+1) + '.' +  " - "  + cur + " - '",'quote')
        }
       
        return rtrn;

    })
    
    return '<pre>'+sqlColour('CASE ','clause') + arrWithCaseWhen.join('\n') + '\n '+sqlColour('END','clause') +' \n</pre>'

}

function customStringDefined() {
    // Check if contains comma seperated values and return t/f
    return /.+,.+/.test(customString());
}

function customString() {

    return document.getElementsByClassName('input-customArray')[0].value;
}


function update() {

    // Create breaks or use custom if provided
    breaks = breaksFromLimits();

    if (customStringDefined()) {

        // Split and convert into num array
        breaks = customString().split(',').map((x) =>  x*1) 


    }

    let OpenEnded = document.getElementById('checkbox-openended').checked;
    let Rownames = document.getElementById('checkbox-rownames').checked;
    let varname = document.getElementById('input-variablename').value;

    let resultTextNode = document.getElementsByClassName('result-text')[0];
    resultTextNode.innerHTML = createCASEWHEN(breaks,varname,OpenEnded,Rownames) 

}


function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
  
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }
  
    document.body.removeChild(textArea);
  }


function breaksFromLimits() {
    let NumberOfBreaks = document.getElementById('input-breaks').value*1;
    let LowerBound = document.getElementById('input-lowerbound').value*1;
    let UpperBound = document.getElementById('input-upperbound').value*1;
    let breaks =  createBreaks(LowerBound,UpperBound,Breaks=NumberOfBreaks) ;
    return breaks;
}