require('dotenv').load();
var Secdo=require('./Secdo')
var IOC=require('./IOC')

var secdoClient = new Secdo({
    serverName: process.env.server_name,
    apiKey: process.env.api_key,
    company: process.env.company
})

secdoClient.getAgents()
.then((agentList)=> {
    console.dir(agentList)
})
.catch((ex)=>{
    console.log(ex)
})

secdoClient.isAgentInstalledOnHost('5.4.5.6')
.then((result)=> {
    console.log('Is agent installed on this host: ' + result)
})
.catch((ex)=>{
    console.log(ex)
})

secdoClient.getAgentState('host-vm')
.then((result)=> {
    console.log(result)
})
.catch((ex)=>{
    console.log(ex)
})

secdoClient.isolateHost('desktop')
.then((result)=> {
    console.log(result)
})
.catch((ex)=>{
    console.log(ex)
})

var newIOC = {
    company: "secdo",
    severity: IOC.severity.medium,
    ioc_data: "Tom\n 127.18.0.3",
    source: "Secdo  api",
    operations: [IOC.operations.iceBlock,IOC.operations.case],
    artifacts_type: IOC.artifactTypes.mixed,
    comment: "This is my comment"
}

secdoClient.loadIOC(newIOC)
.then((result)=>
{console.log(result)
})
.catch((ex)=>{
    console.error(ex)
})

secdoClient.resetBlackListState()
.then((result)=>{
    console.log(result)
})
.catch((ex=>{
    console.error(ex)
}))
