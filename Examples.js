require('dotenv').load();

var Secdo=require('./Secdo')

var IOC = {
    artifactTypes: {
        hostName: 'hostname',
        MD5: 'md5hash',
        fileName: 'filename',
        complex: 'complex',
        fullPath: 'fullpath',
        destinationIP: 'dest_ip',
        mixed: 'mixed'
    },
    operations: {
        case:'CASE',
        iceBlock: 'ICEBLOCK',
        isolate: 'ISOLATE',
        blackList: 'BLACKLIST',
        syslog: 'SYSLOG',
        report: 'REPORT'
    },
    severity: {
        high: 'HIGH',
        medium: 'MEDIUM',
        informational: 'INFORMATIONAL',
        low: 'LOW'
    }
}


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
    //IMPORTANT: severity , operations and artifacts_type gets only certain parameters. That why I created the IOC var  ,it acts like an Enum for these parameters.Please use it to avoid mistakes
    company: "secdo",
    severity: IOC.severity.medium,
    ioc_data: "TestIOC\n  127.0.0.1",
    source: "Secdo-js  client",
    operations: [IOC.operations.iceBlock,IOC.operations.case],
    artifacts_type: IOC.artifactTypes.mixed,
    comment: "This is my comment"
}

secdoClient.loadIOC(newIOC) // Adds a new IOC to the system
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
