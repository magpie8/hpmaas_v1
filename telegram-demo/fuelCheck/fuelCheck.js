const axios = require('axios')
require('dotenv').config({path:`${__dirname}/../.env`});

const FUELCHECK_APIKEY = process.env.FUELCHECK_APIKEY
const FUELCHECK_APIKEY_PERSIST = process.env.FUELCHECK_APIKEY_PERSIST

const latitude = "unquote and input the desired GPS coordinates for fuel price lookup"
const longitude = "unquote and input the desired GPS coordinates for fuel price lookup"

const getToken = async () => {
    return axios({
            method: 'GET',
            url: 'https://api.onegov.nsw.gov.au/oauth/client_credential/accesstoken?grant_type=client_credentials',
            headers: {
                'authorization' : FUELCHECK_APIKEY
            }
        }).then((response) => {
            return response.data.access_token
        }).catch((error) => {
            const error_arg = `Error fuelCheck - ${error}`
            console.log(error_arg)
            return error_arg
        })
}

const getU91 = async (token) => {
    let result = '';
    let data = JSON.stringify({
        "latitude": latitude,
        "longitude": longitude,
        "fueltype": "U91",
        "sortby": "Price",
        "sortascending": "true"
    })
    await axios({
            method: 'POST',
            url: 'https://api.onegov.nsw.gov.au/FuelPriceCheck/v2/fuel/prices/nearby?address=Woonona Ave Wahroonga',
            data: data,
            headers:{
            'Content-Type': 'application/json',
            'apikey': FUELCHECK_APIKEY_PERSIST,
            'transactionID': '1',
            'requestTimeStamp': '07/04/2022 11:35:00 AM',
            'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            const petrolStation = response.data.stations[response.data.stations.length -1].name
            const petrolPrice = response.data.prices[response.data.prices.length -1].price
            const petrolPriceDecimal = petrolPrice / 100
            const petrolPriceRounded = petrolPriceDecimal.toFixed(2)
            const petrolPriceRecal = '$' + petrolPriceRounded + ' / L'
            const googleMaps = `https://www.google.com/maps/search/${petrolStation}`
            const googleMapsEncoded = encodeURI(googleMaps)
            result = {petrolStation,googleMapsEncoded,petrolPriceRecal}
        }).catch((error) => {
            const error_arg = `Error fuelCheck - ${error}`
            console.log(error_arg)
            return error_arg
        })
        return result
}

const getDl = async (token) => {
    let result = '';
    let data = JSON.stringify({
        "latitude": latitude,
        "longitude": longitude,
        "fueltype": "DL",
        "sortby": "Price",
        "sortascending": "true"
    })
    await axios({
            method: 'POST',
            url: 'https://api.onegov.nsw.gov.au/FuelPriceCheck/v2/fuel/prices/nearby?address=Woonona Ave Wahroonga',
            data: data,
            headers:{
            'Content-Type': 'application/json',
            'apikey': FUELCHECK_APIKEY_PERSIST,
            'transactionID': '1',
            'requestTimeStamp': '07/04/2022 11:35:00 AM',
            'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            const dieselStation = response.data.stations[response.data.stations.length -1].name
            const dieselPrice = response.data.prices[response.data.prices.length -1].price
            const dieselPriceDecimal = dieselPrice / 100
            const dieselPriceRounded = dieselPriceDecimal.toFixed(2)
            const dieselPriceRecal = '$' + dieselPriceRounded + ' / L'
            const googleMaps = `https://www.google.com/maps/search/${dieselStation}`
            const googleMapsEncoded = encodeURI(googleMaps)
            result = {dieselStation,googleMapsEncoded,dieselPriceRecal}
        }).catch((error) => {
            const error_arg = `Error fuelCheck - ${error}`
            console.log(error_arg)
            return error_arg
        })
        return result
}

const callEverything = async () => {
    const token = await getToken()
    const petrol = await getU91(token)
    const diesel = await getDl(token)
    console.log({petrol,diesel})
    return({petrol,diesel}) 
}

module.exports = callEverything