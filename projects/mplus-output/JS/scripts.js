
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

    updateButtonDisability()
    */
}
