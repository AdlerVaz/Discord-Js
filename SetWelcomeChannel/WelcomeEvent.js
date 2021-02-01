const bot = require('../main')// I haven't tested this code yet ...
const Discord = require("discord.js")
const modelWelcome = require('../models/welcomes')

bot.on("guildMemberAdd", async (member) => {
  let guild = await modelWelcome.findOne({ server: member.guild.id }).exec()
  if(!guild) return;
  let channel = member.guild.channels.cache.find((c) => c.id === guild.channel)
  if(!channel) return;
  
 channel.send( `welcome to the server!`)//add the message/embed/attachmentu want
})//maybe it will work..bruh idk 
