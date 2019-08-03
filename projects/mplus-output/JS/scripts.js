
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