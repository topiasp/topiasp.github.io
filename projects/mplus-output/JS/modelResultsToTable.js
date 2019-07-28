const getHeadersOfTable = (results) => {

    let RegExpHeaders = /(Two-Tailed$|P-Value$)/gm
    return results.content.filter((c) => c.match(RegExpHeaders))
}

const getGroupsFromResults = (results) => {


    let  RegExpGroup =  /Group [A-Z]+$/gm
    const groups = extractOccurancesOfRegex({ string: results.content.join('\n'), start: 0, chapters: [], regex: RegExpGroup })
    return groups
}


const getModelResultsAsCells = (chapters) => {
    if (chapters === undefined | chapters === null) {
        alert('No output loaded to get model results from!')
    } 
    // Model results- -----------------
    // Groups
    modelResults = chapters.occurances.filter((chapt) => chapt.header.result === 'MODEL RESULTS')[0]

    if (modelResults === undefined) {
        console.log('trowing no model results')
        throw "no 'MODEL RESULTS' found"
    }
    if (storage.numberOfGroups !== undefined & storage.numberOfGroups>1)  {
        groupheaders = getGroupsFromResults(modelResults)
        groupheaders = addEnds(groupheaders)        
    
        groups = extractChapters(groupheaders)
        grouptablerows = groups.occurances.map((group) => ExtractGroupSpecificRows(group))
        cells = grouptablerows.map((arr) => arr.flat()).flat()  
    } else {

        // This function works as it similar to number of groups = 1
        tablerows = ExtractGroupSpecificRows(modelResults)

        cells = tablerows.map((arr) => arr.flat()).flat()  
    }
    return(cells)  
    
}