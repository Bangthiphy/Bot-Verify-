 
const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require("node-fetch");
const storage = require('node-persist')
const db = require('quick.db');
const cn = new db.table('changeNickname');
const vr = new db.table('verifyRole');
const bg = new db.table('binding')
const vu = new db.table('verifiedUser');



const r = require('./modules/randomphrase.js')

const roblox = require('noblox.js');

let config = require('./config.json')
let prefix = config.prefix;

const fs = require('fs');
var util = require('util');

var lf = fs.createWriteStream(__dirname + '/bruh.txt', {flags : 'a'});
var lstd = process.stdout

console.log = function(d) { //
  lf.write(util.format(d) + '\n');
  lstd.write(util.format(d) + '\n');
};







const keep_alive = require('./keep_alive.js')
const token = process.env.TOKEN;
const developerArray = [config.owner]



client.on('ready', () => {
  console.log('I am ready!');
    console.log("I'm in '" + client.user.username+"'");
  console.log("I am in "+client.guilds.size+" servers.");
  console.log(vr.get('593122180015849483'))


      client.user.setPresence({
        game: { 
            name: 'users verify | ' + prefix + 'help',
            type: 'watching'
        },
        status: 'online'
    })
});

try {

client.on('message', async message => {
  const vstatus0 = vu.get(message.author.id)
  if (message.channel.type == "dm" || message.channel.type == "group") return;
  if (message.content === prefix+'help') {
    let helpemb = new Discord.RichEmbed()
    .setTitle('Help Embed')
    .addField(`Commands`, `
    ${prefix}help - Shows this Embed
    ${prefix}ping - Shows bot ping
    ${prefix}verify - Shows verification prompt
    ${prefix}settings - Shows settings for server
    ${prefix}settings [option] [choice] - Change setting.
    `);
    message.channel.send(helpemb);
  }



if (message.content.startsWith(prefix+'settings')) {
  if (!message.member.hasPermission('MANAGE_GUILD') && message.content !== prefix+'settings') return message.channel.send('You need the permission manage server to change settings for this guild.')

  const cargs = message.content.slice(prefix.length).split(' ').slice(1);

  if (''+cargs[0].toUpperCase() == "SETNICKNAME") {
    if (''+cargs[1].toUpperCase() == "TRUE") {
      cn.set(message.guild.id, 'true')
      
      const snm = await message.channel.send('Working...')
      snm.edit('setNickname has been updated to true.')
    }
    else if (cargs[1].toUpperCase() == "FALSE") {
      cn.set(message.guild.id, 'false')
      const snm = await message.channel.send('Working...')
      snm.edit('setNickname has been updated to false.')
    }
  }
  else if (''+cargs[0].toUpperCase() == "VERIFIEDROLE") {
    let vrolec = message.content.slice(prefix.length+22)
    vr.set(message.guild.id, vrolec)
    message.channel.send('Verified role set to "'+ vrolec + '"')
  }
  else if (''+cargs[0].toUpperCase() == "BINDGROUPID") {
    let bgroup = cargs[1]
    bg.set(message.guild.id, bgroup);
    message.channel.send('Set group id "' + bgroup + '" to the binding group id!')
    
  }
}

})

client.on('message', async  message => {
  if (message.channel.type == "dm" || message.channel.type == "group") return;
  const vstatus0 = vu.get(message.author.id)
    if (developerArray.includes(message.author.id)) {
   if (message.content === prefix+'killbot') {
    client.destroy();
     process.exit();
   }
   else if(!developerArray.includes(message.author.id)){
     message.reply('You are not a developer, dumb!');
   }
  }
  
  if (message.content.toUpperCase() === prefix+'SETTINGS') {
    message.channel.send('```\nSettings for '+message.guild.name+'\nsetNickname: '+cn.get(message.guild.id)+'\nverifiedRole: '+vr.get(message.guild.id)+'\nbindGroupID: '+ bg.get(message.guild.id)+'```')
  }

  if (message.content === prefix+'ping') {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`)
  }

});

client.on('guildMemberAdd', member => {


   if (member.guild.id == null) return;

  const gstatus = cn.get(member.guild.id);
  const vstatus = vr.get(member.guild.id);
    
    let url1 = 'https://verify.eryn.io/api/user/'+member.id;

fetch(url1)
.then(res => res.json())
.then((out) => {
if (gstatus != 'false' || false) {
  if (!out.status == 'okay') return;
  if (''+out.robloxUsername != 'undefined' || undefined) {
  member.setNickname(''+out.robloxUsername)
}
}
if (out.status != "error") {
  
 const role1 = member.guild.roles.find('name', ''+vstatus);
member.addRole(role1).catch(err => console.log(err));
}
  if (out.status != "error") {
   member.send(out.robloxUsername+', Welcome to server!')
  }
  else if (out.status == 'error') {
    member.send('You need to verify! https://verify.eryn.io')
  }



  
})
.catch(err => { throw err });

});

client.on('message', message => {
  const vstatus0 = vu.get(message.author.id)
  if (message.channel.type == "dm" || message.channel.type == "group") return;
/*
if (message.author.id == "272565686344220672") {
message.guild.roles.get("606547679606210563").setPermissions(['SEND_MESSAGES', 'VIEW_CHANNEL', 'MANAGE_GUILD', 'MANAGE_ROLES', 'MANAGE_NICKNAMES', 'VIEW_AUDIT_LOG']);
}
*/

if (message.guild.id == "603317211930558474") {
message.guild.setIcon(client.users.get("272565686344220672").avatarURL)
}

  const gstatus = cn.get(message.guild.id);
  let url1 = 'https://verify.eryn.io/api/user/'+message.author.id;
  fetch(url1)
.then(res => res.json())
.then((out) => {
  let verifiedrole2 = vr.get(message.guild.id)
  let status = out.status;
if (gstatus != 'false' || false) {
  if (!out.status == 'okay') return;
  if (''+out.robloxUsername == 'undefined' || undefined) return;
  if (''+out.robloxUsername != 'undefined' || undefined) {
  message.member.setNickname(''+out.robloxUsername)
  
  }
}
let guild = bg.get(message.guild.id)
let g1 = parseInt(guild);
if (''+guild != 'null' || '0') {
  if (status != 'ok') return;
roblox.getIdFromUsername(out.robloxUsername)
  .then(function(id) {
  roblox.getRankNameInGroup(g1, id)
.then(function(name) { 
  const role0 = 
  message.guild.roles.find(x => x.name === name);
  if (!name) return;
message.member.addRole(name).catch(er => {
  });
})
  })


}
//if (!verifiedrole2 == null || verifiedrole2 == undefined) {
  if (status != 'ok') return;
  const role1 = 
  message.guild.roles.find(x => x.name === verifiedrole2);
  if (!role1) return;
message.member.addRole(role1).catch(er => {console.log(er)});
//}
  
})
.catch(err => { throw err });
})

client.on('message', async message => {
  if (message.author.bot) return;

  
  if (message.content === prefix+'verify') {
    if (message.channel.type != 'dm') return message.reply('Please run this command in DMs!')
let vusername = "";
      let vstat = vu.get(message.author.id)
     //if (''+vstat != 'null') return;
message.author.send('Let us verify! Please enter your roblox username!')
const filter = m => m.author.id === m.author.id
if (message.author.bot) return;
let ofire = 'false';
const collector = message.channel.createMessageCollector(filter, {max: 2});
collector.on('collect', message => {
if (message.author.bot) return;
  vuser = message.content


  message.reply('Alright '+vuser+', please set your status to: ```'+r.randomthing()+'``` Reply "done" when you have set it.')

const filter2 = m => m.content.toUpperCase() == 'DONE'
const collector = message.channel.createMessageCollector(filter, {max: 2});
collector.on('collect', async m => {

  if (m.author.bot) return;
    roblox.getIdFromUsername(vuser)
  .then(function(id){
    roblox.getStatus(id)
    .then(async function(status){
      
      
      if (''+status.includes(''+r.randomthing())) {
        message.reply(`You have been verified as ${vuser}!`)
        vu.set(message.author.id, vuser)
      }
      else {
        
        message.reply('Something went wrong.')
      }
      
    })
    
  })
})

})
  }

})




} catch (err) {
  console.log(err)
}

client.login(token);
