const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const fs = require('fs');
require('./util/eventLoader')(client);
const db = require('quick.db')
const express = require('express');
const app = express();
const http = require('http');
    app.get("/", (request, response) => {
    response.sendStatus(200);
    });
    app.listen(process.env.PORT);
    setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
    }, 280000);

const log = message => {
  console.log(`BOT: ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

////////////////////////

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  return permlvl;
};

client.login(process.env.token);


client.on('ready', () => {
    client.user.setPresence({
        game: {
            name: `+ekle`,
            type: 'WATCHING'
            // Değerler:
            // PLAYING: Oynuyor
            // WATCHING: İzliyor
            // LISTENING: Dinliyor
        },
        status: 'online'
        // Değerler:
        // online: Çevrimiçi
        // dnd: Rahatsız Etmeyin
        // idle: Boşta
    })
})

client.on("guildMemberRemove", member => {
  
  let sahip = db.fetch(`botsahipid.${member.id}`); //bot listde belirttiğiniz bot sahip dbsi
  let bot = db.fetch(`botekle.${member.id}`);
  
  if (member.id === sahip) {
    member.guild.members.ban(bot, {
      reason: "Sunucudan Çıktığın İçin Botun Banlandı!"
    });
  } 
  
  
}); 

///=====================KOMUTLAR=========================\\\
      client.on('guildMemberAdd', member => { 
      if(member.user.bot)
      member.roles.add('787656136786182184')//bot id
      else 
      member.roles.add('787656015445360690')//üye id
      });

///=====================BOOST============================\\\
//////// - BOOST ÇEKİNCE MESAJ
client.on('guildMemberUpdate', async(oldMember, newMember) => {

if(oldMember.roles.has('802174574480719893')) {

if(!newMember.roles.has('802174574480719893')) return client.channels.get('801510281515630624').send(newMember.user.tag + ' | Boostunu çekti ! ')

}}
)

//////// - boost basınca mesaj
client.on('guildMemberUpdate', async(oldMember, newMember) => {

if(!oldMember.roles.has('802174574480719893')) {

if(newMember.roles.has('802174574480719893')) return client.channels.get('801510281515630624').send(newMember.user.tag + ' | Boost Bastı ! ')

}}
)