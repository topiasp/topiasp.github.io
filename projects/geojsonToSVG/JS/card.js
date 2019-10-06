

const card = stat => {

    const cont = document.createElement('div')
    cont.classList.add('card-container')
    
    const header = document.createElement('div')
    header.classList.add('card-header')
    header.innerText = stat.name

    const number = document.createElement('div')
    number.classList.add('card-number')
    number.innerText = stat.value

    cont.appendChild(header)
    cont.appendChild(number)

    return(cont)
}


const setCardToContainer = stat => {

    // remove previous if any
    let cards = document.getElementById('content-container').children

    while (cards.length>0) {
        cards[0].remove()
    }


    

    document.getElementById('content-container').appendChild(card(stat)) // { name: 'Helsinki', value: 9.9 }
}