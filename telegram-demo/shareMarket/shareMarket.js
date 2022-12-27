const axios = require('axios')

const FINNHUB_API = process.env.FINNHUB_API
const stockList = ['TSLA','TWLO','META','NVDA']
const results = [];

const loopStock = async () => {
    
    for(const single of stockList){
        await  axios({
             method: 'GET',
             url : `https://finnhub.io/api/v1/quote?symbol=${single}&token=${FINNHUB_API}`
         }).then((response) => {
             const name = single;
             const current = response.data.c;
             const open = response.data.o;
             const low = response.data.l;
             const high = response.data.h;
             console.log({name,open,current,low,high})
             results.push ({name,open,current,low,high})
        }).catch((error) => {
             const error_arg = `Error loopStock - ${error}`
            console.log(error_arg)
            return error_arg
        })
    } return results
}

module.exports = loopStock