const axios = require('axios');
const telegramSend = require('./telegram/telegram.js');
const fuel = require('./fuelCheck/fuelCheck.js');
const weather = require('./weatherCheck/weatherCheck.js');
const mongoDb = require('./mongoDb/mongoDb.js');
const shareMarket = require('./shareMarket/shareMarket.js')
const jokes = require('./jokes/jokes.js')

require('dotenv').config({path:`${__dirname}/.env`});

const userName = 'Bob'
const today = new Date();
const TELEGRAM_DEMO_USER = process.env.TELEGRAM_DEMO_USER;

exports.handler = async (event) => {
    
    const fuelCall = await fuel();
    const weatherCheck = await weather();
    const stocks = await shareMarket();
    const aJoke = await jokes();
    
    //Template
    const msg_template =
    `
    ⏳
    
    Hi ${userName}, when life gives you lemons, make lemonade.
    
    ${aJoke.setup}
    ${aJoke.delivery}
    
    Today @ ${weatherCheck.timeDate},
    the temperature is ${weatherCheck.temperature},
    with humidity @ ${weatherCheck.humidity},
    winds up to ${weatherCheck.windSpeed}
    and ${weatherCheck.rain} of rain.
    
    Diesel is ${fuelCall.diesel.dieselPriceRecal} today.
    @ ${fuelCall.diesel.dieselStation}
    
    Petrol is ${fuelCall.petrol.petrolPriceRecal} today.
    @ ${fuelCall.petrol.petrolStation}
    
    Latest on the stock market:
    ${stocks[0].name} @ USD $${stocks[0].current}
    ${stocks[1].name} @ USD $${stocks[1].current}
    ${stocks[2].name} @ USD $${stocks[2].current}
    ${stocks[3].name} @ USD $${stocks[3].current}
    
    Hit me again!
    https://bit.ly/YOURLINK
    
    ⏳
    `
    
    
    const callMongo = await mongoDb.mongoInsertOne(today,msg_template);
    return telegramSend(TELEGRAM_DEMO_USER,msg_template);
    
};
