const axios = require('axios')
require('dotenv').config({path:`${__dirname}/../.env`});

const getWeather = async () => {
    return axios({
        method : 'GET',
        url : 'http://reg.bom.gov.au/fwo/IDN60901/IDN60901.94760.json'
    }).then((response) => {
        const temperature = `${response.data.observations.data[0].apparent_t}*C`
        const timeDate = `${response.data.observations.data[0].local_date_time}`
        const humidity = `${response.data.observations.data[0].rel_hum}%`
        const windSpeed = `${response.data.observations.data[0].wind_spd_kmh}KM/h`
        const rain = `${response.data.observations.data[0].rain_trace}mm`
        const result = {temperature,timeDate,humidity,windSpeed,rain}
        console.log(result)
        return result
    })
}

module.exports = getWeather