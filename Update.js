var { exec } = require("child_process")

module.exports = {
    name: "update",
    description: "Update the bot from github and restart it",
    run: async (bot, message, args) => {
        if (message.author.id === "YOUR ID HERE PLS ") {
            exec('git pull origin master', (stdout, stderr) => {
                message.channel.send("update: ```" + stdout + "```")
            })
        }
    }
}
