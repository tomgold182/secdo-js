require('dotenv').load();
var Secdo=require('./Secdo')


var secdoClient = new Secdo({
    serverName: process.env.server_name,
    apiKey: process.env.api_key,
    company: process.env.company
})

//  secdoClient.getAgents().then((agentList)=> {
//     console.dir(agentList)
//     })
//     .catch((ex)=>{
//         console.log(ex)
// })

// secdoClient.isAgentInstalledOnHost('5.4.5.6').then((result)=> {
//     console.log('Is agent installed on this host: ' + result)
//     })
//     .catch((ex)=>{
//         console.log(ex)
//     })

// secdoClient.getAgentState('host-vm').then((result)=> {
//     console.log(result)
//     })
//     .catch((ex)=>{
//         console.log(ex)
//     })

secdoClient.isolateHost('desktop').then((result)=> {
    console.log(result)
})
.catch((ex)=>{
    console.log(ex)
})