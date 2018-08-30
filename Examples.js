require('dotenv').load();
var Secdo=require('./Secdo')


var secdoClient = new Secdo({
    serverName: process.env.server_name,
    apiKey: process.env.api_key,
    company: process.env.company
})

secdoClient.getAgents().then((agentList)=> {
console.dir(agentList)
})