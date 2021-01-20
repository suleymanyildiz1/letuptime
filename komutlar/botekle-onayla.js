const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async function(client, message, args) {
  
  if (!message.member.roles.cache.has('787631343571042305')) return message.channel.send('Bu Komutu Tester Rolü Olmadan Kullanamazsın')
	let lrowsisim = args[0]
  let sahip = args[1]
  if (!sahip) return message.channel.send('sahip id yazman gerek')
	let log = "787635549305044992" // bot eklendi / onaylandı / reddedildi kanalı
	
	if (!lrowsisim) return message.channel.send(` Botun idsini yazmalısın.`).then(msg => msg.delete(10000))
  message.delete()
		client.channels.cache.get(log).send(` <@${sahip}> adlı kişinin Sunucuya Eklenen <@${lrowsisim}> adlı botu onaylandı.`);
		message.channel.send(`Botu onayladınız.`)
  client.users.cache.get(sahip).send(`<@${lrowsisim}> adlı botun ${message.author} tarafından kabul edildi`)
  const d = await db.fetch(`bmesaj_${lrowsisim}`)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bot-onayla', 'onayla'],
  permLevel: 0
};

exports.help = {
  name: 'botonayla', 
  description: "Sunucuya eklenen botu onaylar.",
  usage: 'botonayla <bot ismi>'
};