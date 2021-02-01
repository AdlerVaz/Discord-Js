const modelWelcome = require('../../models/welcomes')//this works not sure about the event 
module.exports = {
  name: "setwelcomechannel",
  run: async (bot, msg, args) => {
    let channel = msg.mentions.channels.first()
    let welcome = await modelWelcome.findOne({ server: msg.guild.id }).exec()
      if(!channel) return msg.channel.send("You must mention a channel...")

      if(welcome) {
        await welcome.updateOne({ server: msg.guild.id, channel: channel.id })
        msg.channel.send("Welcome channel successfully changed.")
      } else {
        let newb = new modelWelcome({ server: msg.guild.id, channel: channel.id })
        await newb.save()
        msg.channel.send("Welcome channel is successfully established.")
      }
}}
