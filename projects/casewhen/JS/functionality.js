

function createBreaks(LowerBound,UpperBound,Breaks,By) {
    //console.log(LowerBound,UpperBound,Breaks,By)
    LowerBound = LowerBound || 0;
    UpperBound = UpperBound || 10000;
    Breaks = Breaks || 0;
    By = By || 0;

    let res = [LowerBound];
    // 

    let breakLength = (UpperBound - LowerBound) / Breaks;
    let iterator = 0;

    //console.log('breaklenght',breakLength)

    while ( Math.max(...res) < UpperBound | iterator > 9999) {

        res.push( Math.max(...res) + breakLength)


        iterator++; // Fail safe
    }
    //console.log('iterator',iterator)
    return res;

}

function sqlClause(s) {

    return("<span class='sql-clause'>"+s+"</span>")
}

function sqlQuote(s) {

    return("<span class='sql-quote'>"+s+"</span>")
}
function sqlFunction(s) {

    return("<span class='sql-function'>"+s+"</span>")
}

function createCASEWHEN(arr,varname,openEnded,RowNumbers) {

    varname = varname || 'variable';

    
    
    if (/\(.+\)/.test(varname))  {
       tmp =  varname.match(/[A-Za-z]+\(/g).map((s) => { return(    sqlFunction(s.replace('(',''))   ) }).join('(')
       funcs = varname.match(/[A-Za-z]+\(/g);
       
       // TODO: clean

       sulkuAuki = new RegExp(/\(/g,)
       komennot = new RegExp(funcs.join('|').replace(sulkuAuki,'\\('))
       tmp2 = varname.match(/\(.+\)/g).map((s) => { return(s) }).join('')

       varname = tmp + tmp2.replace(komennot,'');
    }

    arr = arr.map((cur,idx,a) => { 

        // Create rownumber string
        // If under 10 and array lenght>9 then add leading zero to ensure order by goes as expected
        rowNumber =  (function() { 

            s = idx+'. ';
            if (a.length>10 & idx<10) {
                s = '0'+idx+'.  '
            }

            if (RowNumbers) return(s); 
            return('') }
            )()  ; 
        
        if (
                idx>0 &  idx < (a.length-1) // Not first and not the last
                | ( idx == (a.length-1) & !openEnded) // If last and openended is false
            ) 
            { 
            
            prevValue = a[(idx-1)];
            cur = (cur-1);

            if (idx == (a.length-1)) {
                cur += 1
            }
           
        
            return(
                    sqlClause('  WHEN ')
                    +varname
                    +sqlClause(' BETWEEN ')
                    + prevValue +
                    sqlClause(' AND ') 
                    + cur +
                    sqlClause(' THEN ') +
                    sqlQuote("'" + rowNumber  + prevValue + " - " + (cur) + "'")
                )
        }
        // If last of array
        if (idx == (a.length-1) ) { 
            prevValue = a[(idx-1)];


            if (openEnded) {
                return(
                    sqlClause('  WHEN ')
                    + varname
                    + sqlClause(' > ')
                    + prevValue 
                    + sqlClause(' THEN ') 
                    + sqlQuote("'" + rowNumber  + prevValue + " - '")
                )
            }

            



        }
        

    })
    
    

    return '<pre>'+sqlClause('CASE ') + arr.join('\n') + '\n '+sqlClause('END') +' \n</pre>'

}

function update() {
    let NumberOfBreaks = document.getElementById('input-breaks').value*1;
    let LowerBound = document.getElementById('input-lowerbound').value*1;
    let UpperBound = document.getElementById('input-upperbound').value*1;

    if (typeof NumberOfBreaks === 'number'& typeof LowerBound === 'number' & typeof UpperBound === 'number') {
        let resultTextNode = document.getElementsByClassName('result-text')[0];
        let breaks =  createBreaks(LowerBound,UpperBound,Breaks=NumberOfBreaks) ;

        let OpenEnded = document.getElementById('checkbox-openended').checked;
        let Rownames = document.getElementById('checkbox-rownames').checked;
        let varname = document.getElementById('input-variablename').value;


        resultTextNode.innerHTML = createCASEWHEN(breaks,varname,OpenEnded,Rownames)
    }
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


function init() {

   
    // Add inputs
    let topContainer = document.getElementsByClassName('container-left')[0];
    
    // Range
    let InputRangeLB = document.createElement("INPUT");
    InputRangeLB.setAttribute('type','text');
    InputRangeLB.setAttribute('placeholder','Alaraja');
    InputRangeLB.setAttribute('value',0)
    InputRangeLB.setAttribute('id','input-lowerbound')
    InputRangeLB.setAttribute('class','input')
   
    
    let InputRangeUB = document.createElement("INPUT");
    InputRangeUB.setAttribute('type','text');
    InputRangeUB.setAttribute('placeholder','Yläraja');
    InputRangeUB.setAttribute('value',10000)
    InputRangeUB.setAttribute('id','input-upperbound')
    InputRangeUB.setAttribute('class','input')
 
    // Breaks
    let InputBreaks = document.createElement("INPUT");
    InputBreaks.setAttribute('type','text');
    InputBreaks.setAttribute('placeholder','Luokkien määrä');
    InputBreaks.setAttribute('value',10)
    InputBreaks.setAttribute('id','input-breaks')
    InputBreaks.setAttribute('class','input')

    // Name of var
    
    let InputVariable = document.createElement("INPUT");
    InputVariable.setAttribute('type','text');
    InputVariable.setAttribute('placeholder','Muuttujan nimi');
    InputVariable.setAttribute('value','variable')
    InputVariable.setAttribute('id','input-variablename')
    InputVariable.setAttribute('class','input')
    
    // Add to container

    inputContainer = createElement('','container-input','div')
    inputContainer.appendChild(createElement('Alaraja','input-header'))
    inputContainer.appendChild(InputRangeLB);
    inputContainer.appendChild(createElement('Yläraja','input-header'))
    inputContainer.appendChild(InputRangeUB);
    inputContainer.appendChild(createElement('Luokkien määrä','input-header'))
    inputContainer.appendChild(InputBreaks);
    inputContainer.appendChild(createElement('Muuttujan nimi','input-header'))
    inputContainer.appendChild(InputVariable);

    topContainer.appendChild(inputContainer)

    // --------- Add checkboxes
    // --- Loppu auki
    let checkBoxOpenEnd = createElement('','checkbox','input');
    checkBoxOpenEnd.setAttribute('type','checkbox')
    checkBoxOpenEnd.setAttribute('checked','true')
    checkBoxOpenEnd.setAttribute('id','checkbox-openended')

    inputContainer.appendChild(checkBoxOpenEnd)
    inputContainer.appendChild(document.createTextNode('Loppu auki'))

    // Row change ...
    inputContainer.appendChild(document.createElement('br'))

    // ---- Järjestysnumerot
    checkBoxRownumber = createElement('','checkbox','input');
    checkBoxRownumber.setAttribute('type','checkbox')
    checkBoxRownumber.setAttribute('checked','true')
    checkBoxRownumber.setAttribute('id','checkbox-rownames')

    inputContainer.appendChild(checkBoxRownumber)
    inputContainer.appendChild(document.createTextNode('Järjestysnumero'))

    // ---- Add event listeners

    let checkboxes = document.getElementsByClassName('checkbox') // Contains only checkboxes

    
    for (idx = 0;idx<checkboxes.length;idx++) {
        i = checkboxes[idx];
        // Update case when
        i.addEventListener('change',(e) => { 
            update();
        })

    }


    // Add inputs to left container
    topContainer.appendChild(inputContainer)
    

    // Add clipboard icon
    clipboardIcon = createElement('<i class="far fa-clipboard"></i>','container-clipboardIcon','div')
    clipboardIcon.addEventListener('click',(e) => {
        var copyText = document.getElementsByClassName("result-text")[0].innerText;
        fallbackCopyTextToClipboard(copyText)
    } ) 
    topContainer.appendChild(clipboardIcon)

    // Add event listener to inputs

    let inputs = document.getElementsByClassName('input') // Contains only text-input

    //inputs.forEach((i) => {  // Does not work, is a HTML collection, not an array
    for (idx = 0;idx<inputs.length;idx++) {

            i = inputs[idx];
            // Update case when
            i.addEventListener('keyup',(e) => { 
                update();
            })
            // Select current value
            i.addEventListener('click',(e) => {
                e.target.select();
            })
    }

    // Add text area for result
    let middleContainer = document.getElementsByClassName('container-middle')[0];
    let resultTextContainer = document.createElement('div')
    resultTextContainer.innerHTML = '....';
    resultTextContainer.setAttribute('class','result-text')

    // Select current value on click
    resultTextContainer.addEventListener('click',(e) => {
        window.getSelection().selectAllChildren(e.currentTarget)
    })

    middleContainer.appendChild(resultTextContainer)
    
    // Fire away at default settings
    update();

}