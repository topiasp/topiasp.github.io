


// Extracting table as cells

const getModelResultsAsCells = (params) => {
    
    const chapters = params.chapters
    const headerToFind = params.headerToFind
    const tableheaders = params.tableheaders
    


    let cells
    

    if (chapters === undefined | chapters === null) {
        alert('No output loaded to get model results from!')
    } 
    // Model results- -----------------
    // Groups
    modelResults = chapters.occurances.filter((chapt) => chapt.header.result === headerToFind)[0]

    if (modelResults === undefined) {
        console.log('trowing no model results for string ', headerToFind)
        throw "no '"+headerToFind+"' found"
    }
    if (storage.numberOfGroups !== undefined & storage.numberOfGroups>1)  {

        let  RegExpGroup =  /Group [A-Z_]+$/gm

        let groups = extractChapters({ string: modelResults.content.join('\n'), regex: RegExpGroup })

        let grouptablerows = groups.occurances.map((group) => ExtractGroupSpecificRows(group))
        cells = grouptablerows.map((arr) => arr.flat()).flat()  
        cells = cells.map((cell) => ensureCellKeyCount({ cell: cell, headercount: tableheaders.length }))

    } else {

        // This function works as it similar to number of groups = 1
        tablerows = ExtractGroupSpecificRows(modelResults)

        cells = tablerows.map((arr) => arr.flat()).flat()  
        cells = cells.map((cell) => ensureCellKeyCount({ cell: cell, headercount: tableheaders.length }))
    }
    return(cells)  
    
}


// Ensure that each cell has as many keys as there are headers in the table

const ensureCellKeyCount = ({ cell, headercount }) => {

    while (cell.keys.length + cell.values.length < headercount) {

        cell.values.push("")

    }

    return cell
    
}



var OccurancesToTableRows = (occurances) => {

    const getTableCellsFromRow = (rowString) => {
        cells = rowString.split(/([A-Z_\-0-9.$]+)/).filter((cell) => /[A-Z0-9]/.test(cell)    )
        return(cells)
    }


    let originalTableRows =  occurances.content.map((r) =>   getTableCellsFromRow(r)).filter((r) => r.length>0)

    

    const rowAsObject = (row,additionalKey) => {
        const rowObj = {}
        rowObj.keys = [ additionalKey, row[0] ]
        row.splice(0,1)
        rowObj.values = row
        return rowObj
    }

    const tableRows = originalTableRows.map((or) => rowAsObject(or,occurances.header.result))
    return(tableRows)
}


const ExtractGroupSpecificRows = (group) => {
    

    // Group specific actions
    
    grouptableheaders = extractOccurancesOfRegex({ string: group.content.join('\n'), start: 0, chapters: [], regex: /(.+[A-Za-z]$)/gm })
    grouptableheaders = addEnds(grouptableheaders)
    grouptables = extractChapterContent(grouptableheaders)

    tablerows = grouptables.occurances.map((occ) => OccurancesToTableRows(occ))
    // Add group as key to cells
    const addKeyToCell = (cell,key) => {
        cell.keys  =  [key].concat(cell.keys)
        return cell
    }
    tablerows = tablerows.map((row) => row.map((cell) => addKeyToCell(cell,group.header.result)))
    
    return(tablerows)
}



// Extract specific things

const extractNumberOfGroups = (chapters) => {
    var RegExpNumberOfGroups = /(Number of groups[ ]+[0-9]{1,2})/
    var StringContainingNumberOfGroups =  chapters.string.match(RegExpNumberOfGroups)
    return StringContainingNumberOfGroups ===  null ? undefined : StringContainingNumberOfGroups[0].replace(/[^0-9]/g,'') * 1
}


const extractTitle = (chapters) => {
    let title = chapters.occurances[0].content.filter((c) => c.toLowerCase().indexOf('title:')>-1)
    return title === undefined ? undefined : title[0]
}