
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



const locationOfString = (string,substring) => {
    var regexp=new RegExp("\\b"+substring+"\\b")
    
    const match = regexp.exec(string)

    if (match===null) {
        return({
            start: -1,
            end: -1
        })
    }


    return({
        start: match.index,
        end: match.index + substring.length
        
    })
}

const extractOccurancesOfRegex = (params) => {

    const regex = params.regex
    const lengthOfStringForFinalEnd = params.string.length * 1
    let idx = 0

    const occurances = []

    while ((res = regex.exec(params.string)) !== null) {
        occurances.push({ result: res[0], id: 'C'+idx, contentStart: res.index + res[0].length, start: res.index  })
        idx++
    }

    return { occurances: occurances,
        string: params.string
            } 
 
}


const extractNumberOfGroups = (chapters) => {
    var RegExpNumberOfGroups = /(Number of groups[ ]+[0-9]{1,2})/
    var StringContainingNumberOfGroups =  chapters.string.match(RegExpNumberOfGroups)
    return StringContainingNumberOfGroups ===  null ? undefined : StringContainingNumberOfGroups[0].replace(/[^0-9]/g,'') * 1
}


const extractChapters = (headersObj) => {

    let headers =  headersObj.occurances
    const string = headersObj.string

    const arr = []
    for (headerIdx in headers) {
        header = headers[headerIdx]
        arr.push({
            header: header,
            id: header.id,
            content: string.substring(header.contentStart,header.end).split('\n')//.filter((p) => p.length>0)
        })
    }

    headersObj.occurances = arr
    return(headersObj)
}

const addEnds = (obj) => {


    arr = obj.occurances
    arr[arr.length-1].end = obj.string.length 

    for (i = (arr.length-2); i >= 0;i--) {
        arr[i].end = arr[(i+1)].start-1
    }
    obj.occurances = arr

    return obj
}






var OccurancesToTableRows = (occurances) => {

    const getTableCellsFromRow = (rowString) => {
        cells = rowString.split(/([A-Z_0-9.$]+)/).filter((cell) => /[A-Z0-9]/.test(cell)    )
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
    grouptables = extractChapters(grouptableheaders)

    tablerows = grouptables.occurances.map((occ) => OccurancesToTableRows(occ))
    // Add group as key to cells
    const addKeyToCell = (cell,key) => {
        cell.keys  =  [key].concat(cell.keys)
        return cell
    }
    tablerows = tablerows.map((row) => row.map((cell) => addKeyToCell(cell,group.header.result)))
    
    return(tablerows)
}

const extractTitle = (chapters) => {
    let title = chapters.occurances[0].content.filter((c) => c.toLowerCase().indexOf('title:')>0)
    return title === undefined ? undefined : title[0]
}