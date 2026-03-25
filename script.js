let countryList = []

async function pullData() {
    const vanillaAllData = await fetch("https://restcountries.com/v3.1/all?fields=name,population,region,flags")
    const allData = await vanillaAllData.json()

    countryList = allData.map(({name, region, population})=> {
        return {
            name: name.common,
            region: region,
            population: population
        }
    })

    printToScreen(countryList)
}

function printToScreen(list) {
    const totalPop = document.getElementById('total-pop')
    const totalPoplist = list.reduce((total, listItem)=> {
        return total+listItem.population
    }, 0)
    const listBox = document.getElementById('country-list')
    const listInside = list.map((obj)=> {
        return `<li>${obj.name} ${obj.region} ${obj.population}</li>`
    }).join('')

    listBox.innerHTML = listInside
    totalPop.innerHTML = `<strong>Total Population:</strong> ${totalPoplist}`
}

pullData()

const searchBox = document.getElementById('search-box')

searchBox.addEventListener('input', event => {
    const targetWord = event.target.value.toLowerCase();
    const filtredBox = countryList.filter((list)=> {
        return list.name.toLowerCase().includes(targetWord)
    })

    printToScreen(filtredBox)
})

const lowButton = document.getElementById('low')
const highButton = document.getElementById('high')
const resetButton = document.getElementById('reset')
let sortedList =[]

lowButton.addEventListener('click', event => {
    sortedList = [...countryList].sort((a, b)=>{
        return a.population - b.population
    })
    printToScreen(sortedList)
})

highButton.addEventListener('click', event => {
    sortedList = [...countryList].sort((a, b)=> {
        return b.population - a.population
    })
    printToScreen(sortedList)
})

resetButton.addEventListener('click', event => {
    printToScreen(countryList)
})
