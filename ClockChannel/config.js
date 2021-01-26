module.exports = {
    //all fields are **required**
    clockchannel: '801927873333690389', // ID of a voice channel that used to display the time
    timezone: 'Asia/Kolkata', // Timezone (take a look at https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List)
    format: `h:mm a D/M ddd`, // Clock format, leave this default seting for 24h format, read more at https://momentjs.com/docs/#/displaying/format/
    updateinterval: 60000, // Discord is ratelimiting us for 10 minutes!
    //[ON WORK, IGNORE THIS FIELD] dev: 'YOUR ID', // Developer's ID for sending the errors
  }
