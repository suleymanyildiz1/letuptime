const Discord = require('discord.js');
const moment = require('moment');
 
exports.run = (client, message, args) => {
message.channel.send(' **Botun Yeniden Başlatılmasını Onaylıyor Musun ?**')
.then(() => {
  message.channel.awaitMessages(response => response.content === "evet", {
    max: 1,
    time: 30000,
    errors: ['time'],
  })
  .then((collected) => {
      message.channel.send('  **Yeniden Başlıyorum**   ').then(message => {
      console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] 👾 **Bot Yeniden Başlatılıyor** 👾`)
      process.exit(1);
    }).catch(console.error)
    })
    .catch(() => {
      message.channel.send(' `Yeniden Başlama İşlemini İptal Ettim` ');
    });
});
};
 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yenile','yb'],
  permLevel: 4
};
 
exports.help = {
  name: 'reboot',
  description: '[YAPIMCI]',
  usage: 'reboot'
};