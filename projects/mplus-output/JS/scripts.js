
// This works as a data storage
// for the uploaded & parsed Mplus output

const initStorage = () => {
    let storage = {
        chapters: undefined,
        modelresults: {
            cells: undefined
        },
        standardizedmodelresults: {
            cells: undefined
        }
    }
    return storage    
}

let storage = initStorage()





// This is run at on load

const init = () => {
    var fileInput = document.getElementById('file-upload');
  
    fileInput.addEventListener('change', handleFileLoad);
    
  
    /*
    loadFileIntoStorage(mplusoutput.raw)
    // Update title
    updateTitle(storage.title)

    updateButtonDisability()
     */
}


const showModelResults = () => {
    displayModelResults(storage.modelresults)
}
const showStdModelResults = () => {
    displayModelResults(storage.standardizedmodelresults)
}


const displayModelResults = (results) => {
    
    if (results === undefined) {
        return
    }
    // header

    const header = htmlElement({ tag: 'h2', content: results.header })
    // Download button
    const downloadButton = htmlElement({ tag: 'button',content: 'Download table as CSV',classesOfElement: ['btn','btn-primary'],attributes: [{ key: 'style',value:'margin-bottom: 15px' }] })
    downloadButton.addEventListener('click',() => {
        convertAndDownloadCSV.downloadCSV({
            headers: results.headers,
            data: results.cells
        })
    })
    displayElementsInContent(header,clearContents=true)
    displayElementsInContent(downloadButton,clearContents=false)


    const cells = results.cells

    


    cellKeysAndValuesAsArray = cells.map((cell) => cellToArray(cell) )

    const modelResultTable =createTable([results.headers],cellKeysAndValuesAsArray)

    displayElementsInContent(modelResultTable,clearContents=false)
    
}



const displayWholeOutput = () => {




    // Actual table
    const chapters = storage.chapters

    const tocElements = chapters.occurances.map((chap) => collapsibleCheckBoxList(chap))

    // Create div for row
    const row = htmlElement({ tag: 'div',classesOfElement: ['row']})
    const colFrame = htmlElement({ tag: 'div',classesOfElement: ['col-sm-4','chapter-frame'],attributes: [{key:'id', value:'content-frame'}] })
    const colDisplay = htmlElement({ tag: 'div', classesOfElement: ['col-sm-8','chapter-content'],attributes: [{key:'id', value:'content-display'}]})

    tocElements.forEach((ele) => colFrame.appendChild(ele.button))
    tocElements.forEach((ele) => colDisplay.appendChild(ele.chapter))

    row.appendChild(colFrame)
    row.appendChild(colDisplay)

    displayElementsInContent(row)

    
}


// Storage update


const loadFileIntoStorage = (fileAsString) => {

    storage = initStorage()
    

    
    // Update to storage
    try { 
        const RegExpChapter = /(^[A-Z][A-Z 0-9]+[A-Z]$)/gm

        const chapters =  extractChapters({ string: fileAsString, regex: RegExpChapter, filteringRegex: / (BY|WITH|ON)$/m  })
         
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

        const header = 'MODEL RESULTS'
        const cells = getModelResultsAsCells({ chapters: storage.chapters, headerToFind: header })

        storage.modelresults = {
            cells: cells,
            headers: ['Column1','Column2','Column3','Estimate','S.E.','Est/S.E.','P-Value','Signif.'],
            header: header
        }
        // Try to add p-value
        storage.modelresults.cells = storage.modelresults.cells.map((cell) => addPvalueToCell(cell))

        // Sort
        sortCells([1,2])
        console.log('sorting done')

    } 
    catch(err) {
        console.log('error in modelring results parsing: ' + err.message)
        throw 'Error with extracting model results: ' + err.message 
    }
    // standardized model results
    try {
        const header = 'STANDARDIZED MODEL RESULTS'
        const cells = getModelResultsAsCells({ chapters: storage.chapters, headerToFind: header })

        storage.standardizedmodelresults = {
            cells: cells,
            headers: ['Column1','Column2','Column3','Estimate','S.E.','Est/S.E.','P-Value','Signif.'],
            header: header
        }
        // Try to add p-value
        storage.standardizedmodelresults.cells = storage.standardizedmodelresults.cells.map((cell) => addPvalueToCell(cell))

       

    } 
    catch(err) {
        console.log('error in modelring results parsing: ' + err.message)
        throw 'Error with extracting model results: ' + err.message 
    }
    
    
    // Title
    

    storage.title = extractTitle(storage.chapters)
}
