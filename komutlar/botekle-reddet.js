const Discord = require('discord.js');


exports.run = function(client, message, args) {
  
  if (!message.member.roles.cache.has('787631343571042305')) return message.channel.send('Bu Komutu Tester Rolü Olmadan Kullanamazsın')
	let lrowsisim = args[0]
  let sahip = args[1]
  let sebep = args[2]
  let sebep1 = args[3]
  let sebep2 = args[4]
  let sebep3 = args[5]
  let sebep4 = args[6]
  let sebep5 = args[7]
  let sebep6 = args[8]
  let sebep7 = args[9]
  let sebep8 = args[10]
  let sebep9 = args[11]
	let log = "787635549305044992" // bot eklendi / onaylandı / reddedildi kanalı
  
	  client.users.cache.get(sahip).send(`<@${lrowsisim}> Adlı Botun ${message.author} Tarafından Reddedildi `)
	if (!lrowsisim) return message.channel.send(`Botun idsini yazmalısın.`).then(msg => msg.delete(10000))
  if (!sebep) return message.channel.send(` Botu neden onaylamadığını yazmalısın.`).then(msg => msg.delete(10000))
    if (!sahip) return message.channel.send(` Bot Sahibi id yazman lazım.`).then(msg => msg.delete(10000))
  message.delete()
		client.channels.cache.get(log).send(` <@${sahip}> adlı kişinin <@${lrowsisim}> adlı botu reddedildi. Sebep : **${sebep}  ** `);
		message.channel.send(` Botu reddettiniz.`).then(msg => msg.delete(10000)) };


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['bot-reddet', 'reddet'],
  permLevel: 0
};

exports.help = {
  name: 'reddet', 
  description: "Sunucuya eklenen botu reddeder.",
  usage: 'reddet <bot ismi> - <sebep>'
};