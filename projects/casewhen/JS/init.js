


function init() {

   
    // get container for inputs
    let topContainer = document.getElementsByClassName('container-left')[0];
    
    // Range
    let InputRangeLB = document.createElement("INPUT");
    InputRangeLB.setAttribute('type','text');
    InputRangeLB.setAttribute('placeholder','Lower bound');
    InputRangeLB.setAttribute('value',0)
    InputRangeLB.setAttribute('id','input-lowerbound')
    InputRangeLB.setAttribute('class','input')
   
    
    let InputRangeUB = document.createElement("INPUT");
    InputRangeUB.setAttribute('type','text');
    InputRangeUB.setAttribute('placeholder','Upper bound');
    InputRangeUB.setAttribute('value',10000)
    InputRangeUB.setAttribute('id','input-upperbound')
    InputRangeUB.setAttribute('class','input')
 
    // Breaks
    let InputBreaks = document.createElement("INPUT");
    InputBreaks.setAttribute('type','text');
    InputBreaks.setAttribute('placeholder','Number of breaks');
    InputBreaks.setAttribute('value',10)
    InputBreaks.setAttribute('id','input-breaks')
    InputBreaks.setAttribute('class','input')

    // Name of var
    
    let InputVariable = document.createElement("INPUT");
    InputVariable.setAttribute('type','text');
    InputVariable.setAttribute('placeholder','Variable name');
    InputVariable.setAttribute('value','variable')
    InputVariable.setAttribute('id','input-variablename')
    InputVariable.setAttribute('class','input')
    
    // Add to container

    inputContainer = createElement('','container-input','div')
    inputContainer.appendChild(createElement('Lower bound','input-header'))
    inputContainer.appendChild(InputRangeLB);
    inputContainer.appendChild(createElement('Upper bound','input-header'))
    inputContainer.appendChild(InputRangeUB);
    inputContainer.appendChild(createElement('Number of breaks','input-header'))
    inputContainer.appendChild(InputBreaks);
    inputContainer.appendChild(createElement('Variable name','input-header'))
    inputContainer.appendChild(InputVariable);

    topContainer.appendChild(inputContainer)

    // --------- Add checkboxes
    // --- Loppu auki
    let checkBoxOpenEnd = createElement('','checkbox','input');
    checkBoxOpenEnd.setAttribute('type','checkbox')
    checkBoxOpenEnd.setAttribute('checked','true')
    checkBoxOpenEnd.setAttribute('id','checkbox-openended')

    inputContainer.appendChild(checkBoxOpenEnd)
    inputContainer.appendChild(document.createTextNode('Open end'))

    // Row change ...
    inputContainer.appendChild(document.createElement('br'))

    // ---- Rownumber checkboc
    checkBoxRownumber = createElement('','checkbox','input');
    checkBoxRownumber.setAttribute('type','checkbox')
    checkBoxRownumber.setAttribute('checked','true')
    checkBoxRownumber.setAttribute('id','checkbox-rownames')

    inputContainer.appendChild(checkBoxRownumber)
    inputContainer.appendChild(document.createTextNode('Row numbers'))

    // ---- Add event listeners

    let checkboxes = document.getElementsByClassName('checkbox') // Contains only checkboxes

    
    for (idx = 0;idx<checkboxes.length;idx++) {
        i = checkboxes[idx];
        // Update case when
        i.addEventListener('change',(e) => { 
            update();
        })

    }

    // Add text for custom array to feed to case when -----------------------------------------
    inputContainer.appendChild(document.createElement('br'))
    inputContainer.appendChild(document.createElement('br'))
    inputContainer.appendChild(document.createTextNode('Custom breaks'))
   
    // Text
    customArrayInput = createElement('','input-customArray','textarea');
    customArrayInput.placeholder = '1,10,50,75,100,200 etc.';

    customArrayInput.addEventListener('keyup',(e) => { 
        //update(e.target.value)
        let customString  = e.target.value;
        if ( customStringDefined() ) { // Check if contains comma seperated values and move forward only if

            update();


        }
    })

    inputContainer.appendChild(customArrayInput)

    // Add inputs to left container
    topContainer.appendChild(inputContainer)
    

    // Add event listener to inputs -----------------------------------------------------------

    let inputs = document.getElementsByClassName('input') // Return only text-input

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

       
    // Add clipboard icon
    clipboardIcon = createElement('<i class="far fa-clipboard"></i>','container-clipboardIcon','div')
    clipboardIcon.addEventListener('click',(e) => {
        var copyText = document.getElementsByClassName("result-text")[0].innerText;
        fallbackCopyTextToClipboard(copyText)
    } ) 
    topContainer.appendChild(clipboardIcon)

    /// ------------------------------------------ MIDDLE CONTAINER ----------------------------------


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