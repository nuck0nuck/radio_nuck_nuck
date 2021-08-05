const Discord = require("discord.js")
const ytdl = require("ytdl-core")
const {
    token,
    channel_id,
    video_urls
} = require("./config.json")
const client = new Discord.Client()

const owner= "owner id"
const prefix= "!!";


client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
    client.user.setPresence({
    status: 'idle',
    activity: {
        name: `coded by nuck nuck`,
        type: 'LISTENING',
    }
  })
    const voiceChannel = client.channels.cache.get(channel_id)
    voiceChannel.join().then(connection => {
        console.log("Joined voice channel")
        function play(connection) {
            const stream = ytdl(video_urls[Math.floor(Math.random() * video_urls.length)], { filter: "audioonly" })
            const dispatcher = connection.play(stream)
            dispatcher.on("finish", () => {
                play(connection)
            })
        }

        play(connection)
    })
})

client.on('message', message => {
      if (message.content === `${prefix}reset`) {
	  if (message.author.id !== `${owner}`) return false;
    client.destroy();
    client.login(TOKEN);
  
      }
    });

client.login(TOKEN)
