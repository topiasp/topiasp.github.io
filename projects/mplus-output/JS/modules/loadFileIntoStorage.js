
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
        const variables = ['Estimate','S.E.','Est/S.E.','P-Value','Signif.']
        const tableheaders = ['Column1','Column2','Column3'].concat(variables)
        const cells = getModelResultsAsCells({ chapters: storage.chapters, headerToFind: header,tableheaders: tableheaders })

        const groups = getUniqueFromArray( cells.map((c) => c.keys[0] ) )

        storage.modelresults = {
            cells: cells,
            variables: variables,
            headers: tableheaders,
            header: header,
            groups: groups,
            cellsForGroupComparison: undefined
        }

        // Try to add p-value
        let pvalueindex = tableheaders.indexOf('P-Value') - 3
        
        if (pvalueindex>-1) {
            storage.modelresults.cells = storage.modelresults.cells.map((cell) => addPvalueToCell({ cell: cell, pvalueindex: pvalueindex }))
        }
        // Sort
        sortCells([1,2])

        // Mangle for group comparisons 
                
        const cellsToGroupComparison = (obj,elem) => {
            
            key = elem.keys.slice(1,3).join('')
            
            if (obj[key]===undefined) {
            
                obj[key] = {	
                    keys: elem.keys.slice(1,3),
                    values: [
                        {
                            group: elem.keys[0],
                            values: elem.values
                        }
                    ]
                }
                
            } else {
                
                obj[key].values.push({
                    group: elem.keys[0],
                    values: elem.values
                    
                })
            }
            
            return obj
        }

        storage.modelresults.cellsForGroupComparison =  Object.values( cells.reduce(cellsToGroupComparison,{}) )

        extractVariableValuesPerGroup = (cellForGroupComparison,variable,variableIndex) => {
            return cellForGroupComparison.values.map((groupvalues) =>  { return({ keys: cellForGroupComparison.keys.concat(variable),  variable: variable,  variableIndex: variableIndex, group: groupvalues.group, value: groupvalues.values[variableIndex] }) } )
        }   
        storage.modelresults.cellsForGroupComparison = storage.modelresults.variables.map((variable,idx) => {
            
            return storage.modelresults.cellsForGroupComparison.map((cell) => extractVariableValuesPerGroup(cell,variable,idx))  
            
        }).flat()
        


        
    } 
    catch(err) {
        console.log('error in modelring results parsing: ' + err.message)
        throw 'Error with extracting model results: ' + err.message 
    }
    // standardized model results
    try {
        const header = 'STANDARDIZED MODEL RESULTS'
        const tableheaders = ['Column1','Column2','Column3','Estimate','S.E.','Est/S.E.','P-Value','Variance','Signif.']
        const cells = getModelResultsAsCells({ chapters: storage.chapters, headerToFind: header, tableheaders: tableheaders })

        storage.standardizedmodelresults = {
            cells: cells,
            headers: tableheaders,
            header: header
        }
        // Try to add p-value

        let pvalueindex = tableheaders.indexOf('P-Value') - 3
        
        if (pvalueindex>-1) {
            storage.standardizedmodelresults.cells = storage.standardizedmodelresults.cells.map((cell) => addPvalueToCell({ cell: cell, pvalueindex: pvalueindex }))
        }
       

    } 
    catch(err) {
        console.log('error in modelring results parsing: ' + err.message)
        throw 'Error with extracting model results: ' + err.message 
    }
    
    
    // Title
    

    storage.title = extractTitle(storage.chapters)
}

