let {Schema, model} = require("mongoose")

let welcomeSchema = new Schema({
  server: String,
  channel: String,
})

module.exports = model('welcomes', welcomeSchema)
