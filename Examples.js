require('dotenv').load();
var Secdo=require('./Secdo')


var secdoClient = new Secdo({
    serverName: process.env.server_name,
    apiKey: process.env.api_key,
    company: process.env.company
})

// secdoClient.getAgents().then((agentList)=> {
// console.dir(agentList)
// })

secdoClient.isAgentInstalledOnHost('192.168.0.19').then((result)=> {
    console.log('Is agent installed on this host: ' + result)
    })