\\just an example for how to use it [message.inlineReply("Pog")}
const { Client } = require("discord.js");

require("./ExtendedMessage");

const client = new Client();

client.on("message", msg => {
    if (msg.author.bot) return;
    if (msg.content === "hi") {
        msg.inlineReply("hello");
    }
});

client.login("ur token");
