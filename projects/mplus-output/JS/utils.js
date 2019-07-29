
// --------------------------------------------- CSV ------------------------------------------------ */
//      Source: https://halistechnology.com/2015/05/28/use-javascript-to-export-your-data-as-csv/     */

function convertArrayOfCellsToCSV(args) {

    let headers,data,delimiter

    headers = args.headers
    data    = args.data
    delimiter = args.delimiter || ';'

    let result = ''

    result += headers.join(delimiter) + '\n'


    result += data.map((d) => cellToArray(d).join(delimiter)).join('\n')
    return result
}


function convertArrayOfObjectsToCSV(args) {
    // This is not used as data structure is not applicable  
    var result, ctr, keys, columnDelimiter, lineDelimiter, data;

    data = args.data || null;
    if (data == null || !data.length) {
        console.log('data is null')
        return null;
    }

    columnDelimiter = args.columnDelimiter || ';';
    lineDelimiter = args.lineDelimiter || '\n';

    keys = Object.keys(data[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach(function(item) {
        ctr = 0;
        keys.forEach(function(key) {
            if (ctr > 0) result += columnDelimiter;

            result += item[key];
            ctr++;
        });
        result += lineDelimiter;
    });

    return result;
}


function downloadCSV(args) {  

    console.log('Creating csv')

    var data, filename, link;
    var csv = convertArrayOfCellsToCSV(args);
    if (csv == null) return;

    console.log('Created csv-data')

    filename = args.filename || 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    data = encodeURI(csv);

    link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();
}

// -------------- CSV



// general 

// Join keys and values
const cellToArray = (cell) => [...cell.keys].concat(cell.values)


const pvalueSignificance = (pvalue) => {
    if (pvalue<0.001) {
        return '***'
    } else if (pvalue<0.01) {
        return '**'
    } else if (pvalue<0.05) {
        return '*'
    } else if (pvalue<0.1) {
        return '.'
    } 
    return('')
}


const addPvalueToCell = (cell) => {

    const pvalue = cell.values[ (cell.values.length-1) ] * 1

    cell.values = cell.values.concat(pvalueSignificance(pvalue))
    return cell
}


const sortCells = (colidx) => {

    const sortingFunction = (a,b) => {
        keyA = a.keys[colidx]
        keyB = b.keys[colidx]

        let result = 0
        if (keyA > keyB) {
            result = 1
        } 
        if (keyA < keyB) {
            result = -1
        }
        return result
    }


    storage.modelresults.cells.sort(sortingFunction)
}




const updateTitle = (titleAsString) => {
    
    if (titleAsString !== undefined) {
        const titleHolder = document.getElementById('output-title')
        titleHolder.innerHTML = titleAsString
    }
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
            cells: cells,
            headers: ['Column1','Column2','Column3','Estimate','S.E.','Est/S.E.','P-Value','Signif.']
        }
        // Try to add p-value
        storage.modelresults.cells = storage.modelresults.cells.map((cell) => addPvalueToCell(cell))

        // Sort
        sortCells(1)

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



const downloadModelResultsAsCSV = () => {
    console.log('got here')
   downloadCSV({ headers: storage.modelresults.headers, data: storage.modelresults.cells, filename: 'modelresults.csv' })

}




const displayModelResults = () => {
    
    if (storage.modelresults === undefined) {
        return
    }
    // Download button
    const downloadButton = htmlElement('button','Download table as CSV',['btn','btn-primary'],[{ key: 'style',value:'margin-bottom: 15px' }])
    downloadButton.addEventListener('click',downloadModelResultsAsCSV)
    displayElementsInContent(downloadButton,clearContents=true)


    const cells = storage.modelresults.cells

    


    cellKeysAndValuesAsArray = cells.map((cell) => cellToArray(cell) )

    const modelResultTable =createTable([storage.modelresults.headers],cellKeysAndValuesAsArray)

    displayElementsInContent(modelResultTable,clearContents=false)
    
}

const displayWholeOutput = () => {




    // Actual table
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