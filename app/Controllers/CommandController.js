// command
import RegisterTableCommand from './Command/RegisterTableCommand'
import ShowFreeTableCommand from './Command/ShowFreeTableCommand'
import StartCommand from './Command/StartCommand'
import CancelTableCommand from './Command/CancelTableCommand'

export default class CommandController {
    /**
     *
     * @param bot
     */
    constructor (bot) {
        this.bot = bot
        this.commands = []
        this.registerCommands()
    }

    registerCommands () {
        this.commands.push(new StartCommand(this.bot))
        this.commands.push(new RegisterTableCommand(this.bot))
        this.commands.push(new ShowFreeTableCommand(this.bot))
        this.commands.push(new CancelTableCommand(this.bot))
    }

    async HandleMessage (msg) {
        for (const command of this.commands) {
            if (command.isMyMessage(msg)) {
                await command.handleMessage(msg)
                return
            }
        }
    }

    async HandleQuery (msg) {
        for (const command of this.commands) {
            if (command.isMyQuery(msg)) {
                await command.handleQuery(msg)
                return
            }
        }
    }

    getCommands () {
        const commands = []
        for (const command of this.commands) {
            const commandArr = command.getCommand()
            if (commandArr !== false) {
                commands.push(commandArr)
            }
        }
        return commands
    }
}
