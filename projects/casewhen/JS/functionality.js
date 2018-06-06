

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


function createCASEWHEN(arr,varname) {

    varname = varname || 'variable';

    arr = arr.map((cur,prev) => { 
        
        if (prev>0) { 
            prevValue = arr[(prev-1)];

            return(
                    sqlClause('  WHEN ')
                    +varname
                    +sqlClause(' BETWEEN ')
                    + prevValue +
                    sqlClause(' AND ') 
                    + cur +
                    sqlClause(' THEN ')
                     + sqlQuote("'" + prevValue + " - " + cur + "'"))
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

        resultTextNode.innerHTML = createCASEWHEN(breaks)
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

    // Add to container

    inputContainer = createElement('','container-input','div')

    inputContainer.appendChild(createElement('Alaraja','input-header'))
    inputContainer.appendChild(InputRangeLB);
    inputContainer.appendChild(createElement('Yläraja','input-header'))
    inputContainer.appendChild(InputRangeUB);
    inputContainer.appendChild(createElement('Luokkien määrä','input-header'))
    inputContainer.appendChild(InputBreaks);

    topContainer.appendChild(inputContainer)

    clipboardIcon = createElement('<i class="far fa-clipboard"></i>','container-clipboardIcon','div')

    clipboardIcon.addEventListener('click',(e) => {

        var copyText = document.getElementsByClassName("result-text")[0].innerText;

        console.log(copyText)
        fallbackCopyTextToClipboard(copyText)
    } ) 

    topContainer.appendChild(clipboardIcon)

    // Add event listener to inputs

    let inputs = document.getElementsByClassName('input')

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
    
        console.log('Clicked on result textNode',e.currentTarget)

        window.getSelection().selectAllChildren(e.currentTarget)
    })

    middleContainer.appendChild(resultTextContainer)
    
    // Fire away at default settings
    update();

}