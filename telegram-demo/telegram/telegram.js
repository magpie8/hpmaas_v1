const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config({path:`${__dirname}/../.env`});

const token = process.env.TELEGRAM_TOKEN;

const bot = new TelegramBot(token, {polling: true});

const send = async (userId,msg) => {
    if(userId && msg != null){
        return bot.sendMessage(userId, msg);
    } else {
        console.log('UserID or Message missing')
    }
}

module.exports = send