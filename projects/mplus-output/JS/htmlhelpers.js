// Helpers to create html elements


const htmlElement = ({ tag, content, classesOfElement, attributes }) => {

  
    const ele = document.createElement(tag)
    if (content !== undefined) {
        ele.innerHTML = content
    }

    if (classesOfElement !== undefined) {
        classesOfElement.forEach((c) => ele.classList.add(c))
    }
    if (attributes !== undefined) {
        attributes.forEach((atr) => ele.setAttribute(atr.key,atr.value)   )
    }


    return ele
}


const spacesForHtml = (string) => {

    let replacement = '&nbsp';

    return string.replace(/\s/g,replacement)
   
}

const addParagraph = (content) => {
    
    return htmlElement({ tag: 'div',content: content, classesOfElement: ['result-paragraph'] })

}


const createRow = (rowcells,celltype='td') => {



    const htmlCells =  Array.isArray(rowcells) ? rowcells.map((cell) => htmlElement({ tag: celltype, content: cell})) : htmlElement({ tag: celltype,content: cell})

    const row = htmlElement({ tag: 'tr' })

    htmlCells.forEach((cell) =>  row.appendChild(cell))
    return(row)

}

const createTable = (headers,rows) => {

    const tbl = htmlElement({ tag: 'table' ,classesOfElement: ['omataulukko','table-condensed']})

    const thead = htmlElement({ tag: 'thead' })
    const tbody = htmlElement({ tag: 'tbody'})



    headers.forEach((header) => thead.appendChild( createRow( header,'th' )))
    rows.forEach((row) => tbody.appendChild( createRow( row )))

    tbl.appendChild(thead)
    tbl.appendChild(tbody)

    return tbl

}




const selectList = (options) => {

    const select = htmlElement({ tag: 'select',classesOfElement: ['form-control'],attributes: [{key:'multiple', value:''}] })

    options.forEach((option) => select.appendChild(htmlElement({ tag: 'option',content: option })))

    return select

}



const checkBoxList = (options) => {
  

    const form = htmlElement({ tag: 'form' })

    const createCheckBox = (option) => {
        const div = htmlElement({ tag: 'div', classesOfElement: ['checkbox']})
        
        const input = htmlElement({ tag: 'input', attributes: [{ key: 'type', value: 'checkbox' }, { key: 'value', value: ''}] })
        const label = htmlElement({ tag: 'label'  })

        label.appendChild(input)
        label.innerHTML += option



        div.appendChild(label)
        return div
    }

    options.forEach((option) => form.appendChild(  createCheckBox(option)  ))

    return form

}



const collapsibleCheckBoxList = (chap) => {


    const div = htmlElement({ tag: 'div', classesOfElement: ['checkbox']})
    const label = htmlElement({ tag: 'label' })
    const checkbox = htmlElement({tag: 'input'
                   
                    ,attributes: [
                        {key:'data-toggle',value:'collapse'},
                        {key:'data-target',value: '#'+chap.id},
                        {key:'type',value:'checkbox'}
                    ]
                }
                )
    
    label.appendChild(checkbox)
    label.innerHTML += chap.header.result

    div.appendChild(label)


    const chapt = htmlElement({ tag: 'div',classesOfElement: ['collapse','chapter'], attributes: [{key: 'id',value: chap.id}] })
    

    const paragraphs = chap.content.map((par) => addParagraph(spacesForHtml(par)))

    // add header

    chapt.appendChild(htmlElement({ tag: 'h3', content: chap.header.result }))


    // Join 'em
    paragraphs.forEach((p) => chapt.appendChild(p))

    
    //return row
    return {
        button: div,
        chapter: chapt
    }
}
