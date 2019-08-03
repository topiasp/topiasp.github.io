


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


const sortCells = (colidxs) => {



    const sortingFunction = (a,b) => {
 
        const comparer = (keyA,keyB) => {
            let result = 0
            if (keyA > keyB) {
                result = 1
            } 
            if (keyA < keyB) {
                result = -1
            }
            return result
        } 
        keyA = a.keys[colidxs[0]]
        keyB = b.keys[colidxs[0]]

        result1 = comparer(keyA,keyB)
        // Second sorting column
        keyA = a.keys[colidxs[1]]
        keyB = b.keys[colidxs[1]]

        result2 = comparer(keyA,keyB)
        

        return result1 || result2
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

    const modelStdResultsButton = document.getElementById('btn-just-std-model-results')
    modelStdResultsButton.disabled = storage.standardizedmodelresults.cells !== undefined ? false : true


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





const handleFileLoad = (e) => {
    const fileInput = document.getElementById('file-upload')
        
    const file = fileInput.files[0];

    const reader = new FileReader();

    reader.onload = (e) =>  {

        // Start from scratch
        displayElementsInContent(undefined)
        updateTitle('')
        updateButtonDisability()

        // Update based on file
        loadFileIntoStorage(reader.result);
        updateTitle(storage.title)
        updateButtonDisability()
        
    }

    reader.readAsText(file,"ISO-881");	

}