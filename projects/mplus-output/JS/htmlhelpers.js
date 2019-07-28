
const htmlElement = (tag,content,classesOfElement,attributes) => {
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


const addParagraph = (content) => {
    
    content = content.replace(/ /g,'&nbsp;')


    return htmlElement('p',content)

}


const createRow = (rowcells,celltype='td') => {



    const htmlCells =  Array.isArray(rowcells) ? rowcells.map((cell) => htmlElement(celltype,cell)) : htmlElement(celltype,cell)

    const row = htmlElement('tr')

    htmlCells.forEach((cell) =>  row.appendChild(cell))
    return(row)

}

const createTable = (headers,rows) => {

    const tbl = htmlElement('table',undefined,['omataulukko','table-condensed'])

    const thead = htmlElement('thead')
    const tbody = htmlElement('tbody')



    headers.forEach((header) => thead.appendChild( createRow( header,'th' )))
    rows.forEach((row) => tbody.appendChild( createRow( row )))

    tbl.appendChild(thead)
    tbl.appendChild(tbody)

    return tbl

}


const collapsible = (chap) => {

    //const row = htmlElement('div','',['row'])
    //const col = htmlElement('div','',['col-sm-12'])

    

    const button = htmlElement('button',chap.header.result,['btn','btn-primary','chapter-btn']
                    ,[
                        {key:'data-toggle',value:'collapse'},
                        {key:'data-target',value: '#'+chap.id},
                        {key:'type',value:'button'}
                    ]
                )
    

    const chapt = htmlElement('div',undefined,['collapse'],[{key: 'id',value: chap.id}])
    

    const paragraphs = chap.content.map((par) => addParagraph(par))


    // Join 'em
    paragraphs.forEach((p) => chapt.appendChild(p))
    //col.appendChild(button)
    //col.appendChild(chapt)
    //row.appendChild(col)
    
    //return row
    return {
        button: button,
        chapter: chapt
    }
}