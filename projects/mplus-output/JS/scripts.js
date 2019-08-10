
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
        },
        numberOfGroups: undefined
    }
    return storage    
}

let storage = initStorage()





// This is run at on load

const init = () => {
    var fileInput = document.getElementById('file-upload');
  
    fileInput.addEventListener('change', handleFileLoad);
    
    
    loadFileIntoStorage(mplusoutput.raw)
    updateTitle(storage.title)
    updateButtonDisability()
    
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


const showGroupComparison = () => {


    const groupComparisonContainer =  htmlElement({ tag:'div' })

    // header
    const header = htmlElement({ tag:'h2', content: 'GROUP COMPARISON'})

    // table
    // Table

    const headers = ['Column 1', 'Column 2', 'Variable' ].concat( storage.modelresults.groups )
    // converts cell object to single array
    const cellGroupsAsColumns = (cell) => cell[0].keys.concat(cell.map((cell) => cell.value))
    const cellsToTable = [...storage.modelresults.cellsForGroupComparison]
    const rows = cellsToTable.map(cellGroupsAsColumns)
    const table = createTable([headers],rows)

    table.id = 'groupComparisonTable'

    // Download button

    const downloadButton = htmlElement({ tag: 'button',content: 'Download table as CSV',classesOfElement: ['btn','btn-primary'],attributes: [{ key: 'style',value:'margin-bottom: 15px' }] })
    downloadButton.addEventListener('click',() => {
        convertAndDownloadCSV.downloadCSV({
            headers: headers,
            data: rows
        })
    })

    // Selectors for variables
    /*
    const variableSelector = htmlElement({ tag: 'div', classesOfElement: ['btn-group'] })
    
    storage.modelresults.variables.forEach((variable) => {
        const btn = htmlElement(
                {
                    tag: 'button',
                    classesOfElement: ['btn','btn-warning'],
                    attributes: [{ key:'type', value:'button'}],
                    content: variable
                }
            )
        variableSelector.appendChild( btn  )
    })
    */

    const nameForVariableSelectorForm = 'variableSelectors'
    const variableSelector = checkBoxList({ options: storage.modelresults.variables, idForInputGroup: nameForVariableSelectorForm })

    
    // Join 'em
    groupComparisonContainer.appendChild(header)
    groupComparisonContainer.appendChild(downloadButton)
    groupComparisonContainer.appendChild(variableSelector)
    groupComparisonContainer.appendChild(table)

    // Create elements
    displayElementsInContent(groupComparisonContainer)

    // Add event listeners after creating elements

    const handleCheckboxChange = (e) => {
        e.preventDefault()

        const variableSelectors =   document.getElementById(nameForVariableSelectorForm).children

        const selectedVariables = []

        for (selectorIndex=0; selectorIndex < variableSelectors.length; selectorIndex++) {
            let selector = variableSelectors[selectorIndex].children[0]

            if ( selector.checked ) {
                selectedVariables.push( selector.value )
            }
        }

        document.getElementById('groupComparisonTable').remove()

        const cellsToTable = [...storage.modelresults.cellsForGroupComparison]
        let rows = cellsToTable.map(cellGroupsAsColumns)

        rows = rows.filter((row) =>   selectedVariables.indexOf(row[2])>-1 )


        const table = createTable([headers],rows)
        table.id = 'groupComparisonTable'

        displayElementsInContent(table,clearContents=false)
    
    }

    var variableSelectorForm = document.getElementById(nameForVariableSelectorForm)
    var variableSelectors    = variableSelectorForm.children

    for (selectorIndex=0; selectorIndex < variableSelectors.length; selectorIndex++) {
        variableSelectors[selectorIndex].addEventListener('change',handleCheckboxChange)
    }
   
    

    
}



