// Gets unemployment rate
const getStat= async stat => {

    const data = stat.query
    const url = stat.url

    try {
        const response = await fetch(url, {
          method: 'POST', // or 'PUT'
          body: JSON.stringify(data), // data can be `string` or {object}!
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        let json = await response.json();
        console.log('Success with stat:', json);

        // manipulate
        // string to int, value to scalar instead of array
        json.data = json.data.filter(observation => /[0-9]/.test(observation.values[0])) // Remove observations that don't have numbers
        json.data = json.data.map(observation => ({...observation, values:   observation.values[0] * 1  }) )

        // Calc avg
        const avg = json.data.map(ob => ob.values).reduce((tot,cur) => tot+cur) / json.data.length

        const rtrn = {
            observations: json.data,
            observationCount: json.data.length,
            avg
        }

        store.statdata = rtrn

        return(rtrn)



    } catch (error) {
        alert('Error loading statistic')
        console.error('Error loading stat data:', error);
    }

}

// This helps getting a specific statistic
const getStatForKunta = kunta => {
  const obs = store.statdata.observations.find(obs => obs.key.includes('KU'+kunta))
  if (obs) {
    return obs.values
  }
  return undefined

}
const polygonColor = number =>  number ?  number > store.statdata.avg ? 'red' : 'green' : undefined

