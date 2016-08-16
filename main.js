'use strict'
const config = require('./config')
const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController
const tg = new Telegram.Telegram(config.BOT_TOKEN)

class PingController extends TelegramBaseController {
    /**
     * @param {Scope} $
     */
    pingHandler($) {
        $.sendMessage('pong')
    }

    get routes() {
        return {
            'ping': 'pingHandler'
        }
    }
}

class OtherwiseController extends TelegramBaseController {
    handle() {
        // console.log('otherwise')
    }

    before(command, scope) {
        // scope.someData = true
        console.log(`${new Date()}; Received Message:=> `, scope._update._message._text.substring(1));
        return scope
    }
}

tg.router
    // .when(['ping'], new PingController())
    .otherwise(new OtherwiseController());