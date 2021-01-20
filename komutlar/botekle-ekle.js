const Discord = require('discord.js');
const db = require("quick.db")

exports.run = function(client, message, args) {

	let lrowsid = args[0] 
	let prefix = args[1]
  let onaylımı = args[2]
  let basvuru = "787653402829914142"// başvurunun gideceği kanal
	let kanal = "787635346204131340" // başvurunun yapılacağı kanal
  let log = "787635549305044992" // bot eklendi / onaylandı / reddedildi kanalı 
	
  if (message.channel.id !== kanal) return message.channel.send(`Bu komutu sadece <#${kanal}> kanalında kullanabilirsin.`).then(msg => msg.delete(10000))
	if (message.channel.id == kanal) {
  if (!lrowsid) return message.channel.send(` Botunun ID'sini yazmalısın.`).then(msg => msg.delete(10000))
  if (!prefix) return message.channel.send(` Botunun prefixini yazmalısın.`).then(msg => msg.delete(10000))
  message.delete()
  const embed = new Discord.MessageEmbed()
  .setColor("BLACK")
  .setDescription(`[Ekle](https://discordapp.com/oauth2/authorize?client_id=${lrowsid}&scope=bot&permissions=0)`, true)
  .setTitle("Bot Ekletme")
  .addField("Bot Sahibi", `<@${message.author.id}>`)
  .addField("Botun İsmi", `<@${lrowsid}>`)
  .addField("Bot Prefix", prefix)
  client.channels.cache.get(basvuru).send(embed).then(async(Emojiler) => {
const Emotes = ['✅']
const Filtre = (Reaksiyon) =>
Emotes.includes(Reaksiyon.emoji.name)
//Emojiler.react(Emotes[0])
var Tepkiler = Emojiler.createReactionCollector(Filtre, {
})
Tepkiler.on('collect', async (Tepki) => {
if (Tepki.emoji.name === '✅') {
Emojiler.delete()
}
})
})
  client.channels.cache.get(log).send(` ${message.author} **adlı kullanıcının** <@${lrowsid}> **adlı botu sıraya ekledi. Botu onaylanmayı bekliyor.** <@&787631343571042305> `)
  message.author.send(`<@${lrowsid}> Adlı botun sıraya alındı!`)
  db.set(`botsahipid.${message.author.id}`, message.author.id)
  db.set(`botekle.${message.author.id}`, lrowsid)
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bot-ekle','ekle'],
  permLevel: 0
};

exports.help = {
  name: 'botekle', 
  description: "Sunucuya bot eklemenizi sağlar.",
  usage: 'botekle <botid> <prefix>'
};