const UserModel = require('../Models/User')
const TableModel = require('../Models/Table')

//command
const RegisterTableCommand = require('./Command/RegisterTableCommand')
const ShowFreeTableCommand = require('./Command/ShowFreeTableCommand')
const StartCommand = require('./Command/StartCommand')
const CancelTableCommand = require('./Command/CancelTableCommand')

class CommandController {
    /**
     *
     * @param bot
     */
    constructor(bot) {
        this.bot = bot
        this.commands = []
        this.registerCommands()
    }


    registerCommands() {
        this.commands.push(new StartCommand(this.bot))
        this.commands.push(new RegisterTableCommand(this.bot))
        this.commands.push(new ShowFreeTableCommand(this.bot))
        this.commands.push(new CancelTableCommand(this.bot))
    }

    async HandleMessage(msg) {
        for (let command of this.commands) {
            if (command.isMyMessage(msg)) {
                await command.handleMessage(msg)
                return
            }
        }
    }

    async HandleQuery(msg) {
        for (let command of this.commands) {
            if (command.isMyQuery(msg)) {
                await command.handleQuery(msg)
                return
            }
        }
    }

    getCommands() {
       let commands = []
        for (let command of this.commands) {
            let commandArr = command.getCommand();
            if (commandArr !== false) {
                commands.push(commandArr)
            }
        }
       return commands
    }

}

module.exports = CommandController