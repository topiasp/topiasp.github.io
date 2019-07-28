
// This works as a data storage
// for the uploaded & parsed Mplus output

const initStorage = () => {
    let storage = {
        chapters: undefined,
        modelresults: {
            cells: undefined
        }
    }
    return storage    
}

let storage = initStorage()





const splitIntoChapters = (outputstring) => {

    const RegExpChapter = /(^[A-Z][A-Z ]+[A-Z]$)/gm

    let headers = extractOccurancesOfRegex({ string: outputstring, start: 0, chapters: [], regex: RegExpChapter })

    // Filter non hits 
    let regexByWithOn = / (BY|WITH|ON)$/m // These specify interactions of groups 
    headers.occurances = headers.occurances.filter((h) => !regexByWithOn.test(h.result))

    headers = addEnds(headers)

    chapters = extractChapters(headers)
 

    return(chapters)
}



const updateTitle = (titleAsString) => {
    
    if (titleAsString !== undefined) {
        const titleHolder = document.getElementById('output-title')
        titleHolder.innerHTML = titleAsString
    }
}


const init = () => {
    var fileInput = document.getElementById('file-upload');
  
    fileInput.addEventListener('change', function(e) {
        
        var file = fileInput.files[0];

        var reader = new FileReader();

        reader.onload = function(e) {
            displayElementsInContent(undefined)
            updateTitle('')
            updateButtonDisability()
            try {
                loadFileIntoStorage(reader.result);
                updateTitle(storage.title)
            } 
            catch(err) {
                console.log('Problem with loading the file into storage: ', err.message)
                
            }
            // Update title
            updateButtonDisability()
            
        }

        reader.readAsText(file,"ISO-881");	

    });
    
    /*
        loadFileIntoStorage(mplusoutput.raw)
        // Update title
        updateTitle(storage.title)
    */
}

const updateButtonDisability = () => {

    
    const wholeContentButton = document.getElementById('btn-whole-output')
    wholeContentButton.disabled = storage.chapters !== undefined ? false : true


    const modelResultsButton = document.getElementById('btn-just-model-results')
    modelResultsButton.disabled = storage.modelresults.cells !== undefined ? false : true

}

const loadFileIntoStorage = (fileAsString) => {

    storage = initStorage()
    

    const chapters = splitIntoChapters(fileAsString);

    
    // Update to storage
    try { 
        storage.chapters = chapters
    } 
    catch(err) {
        console.log('Problem with extracting chapters: ', err.message)
    }
    // number of groups 
    try {
        storage.numberOfGroups = extractNumberOfGroups(chapters)
    }
    catch(err) {
        console.log('problem with extracting number of groups ' + err.message)
    }

    // model results
    try {

        const cells = getModelResultsAsCells(chapters)

        storage.modelresults = {
            cells: cells
        }
    } 
    catch(err) {
        console.log('error here' + err.message)
        throw 'Error with extracting model results: ' + err.message 
    }
    
    
    // Title
    

    storage.title = extractTitle(chapters)
}



const displayElementsInContent = (elements,clearContents=true) => {

    const content = document.getElementById('content')

    if (clearContents) {
        const children = content.children

        while (children.length>0)  {
            children[0].remove()
        }
    }

    if (elements !== undefined) {

        if (Array.isArray(elements)) {
            elements.forEach((e) => content.appendChild(e))
        } else {
            content.appendChild(elements)
        }

    }
}






const displayModelResults = () => {
    
    if (storage.modelresults === undefined) {
        return
    }


    const cells = storage.modelresults.cells

    

    // Join keys and values
    const cellToArray = (cell) => [...cell.keys].concat(cell.values)

    cellKeysAndValuesAsArray = cells.map((cell) => cellToArray(cell) )

    const modelResultTable =createTable([['Column1','Column2','Column3','Estimate','S.E.','Est/S.E.','P-Value']],cellKeysAndValuesAsArray)

    displayElementsInContent(modelResultTable)
    
}

const displayWholeOutput = () => {

    const chapters = storage.chapters

    const tocElements = chapters.occurances.map((chap) => collapsible(chap))

    // Create div for row
    const row = htmlElement('div',undefined,['row'])
    const colFrame = htmlElement('div',undefined,['col-sm-4'],[{key:'id', value:'content-frame'}])
    const colDisplay = htmlElement('div',undefined,['col-sm-4'],[{key:'id', value:'content-display'}])

    tocElements.forEach((ele) => colFrame.appendChild(ele.button))
    tocElements.forEach((ele) => colDisplay.appendChild(ele.chapter))

    row.appendChild(colFrame)
    row.appendChild(colDisplay)

    displayElementsInContent(row)
    
}