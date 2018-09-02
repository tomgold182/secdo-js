# secdo-js #


Simple Secdo (Now Palo Alto) client which gives you the ability to perform various actions like getting Agent status,adding IOC's and isolating hosts.


### About ###
* Created By Tom Goldberg

### Supported functionalities: ###

secdo-js is currently supporting the following actions: 

| Method | Description | Input | Successful Output 
| ------ | ------ | ------ | ------ |
| getAgents() | Retrieves list of all the agents in the system | - | Json formatted list of agents
| isAgentInstalledOnHost(<host>) | gets and IP / Hostname and checks weather this host has a secdo agent installed | IP / Hostname | true / false
| getAgentState(<Hostname/IP/Agent ID>) | Gets an host / IP / agent ID  and retrieves the agent state. Throws exception Secdo can not find this agent | IP / Hostname / Agent ID | status of this agent  
| isolateHost(<Hostname>) | Gets an Hostname and isolates it . Throws an exception if the agent is not alive. | Hostname | 'Success' 
| loadIOC(ioc) | Gets an IOC object and loads it to the system. Throws exception in a case when there is a duplicate or some invalid parameters  | IOC object (see Examples.js for more detailed example) | 'Success' 
| resetBlackListState() | Resets the black list state | - | 'Success


### How To ###

1. isntall the repo inside your project folder 
~~~ 
npm install --save secdo-js
~~~
2. require the Secdo class. If you are going to use the IOC functionalities , you can use the IOC var (which acts like an enum and provides the available params for the load IOC method) from the examples.js file to avoid mistakes.
~~~
var Secdo=require('Secdo')
~~~
 3.Set the connection
~~~
var secdoClient = new Secdo({
    serverName: 'secdo.local',
    apiKey: 'asd23SA3FFDds',
    company: 'localCorp'
})
~~~

 4.Use the module. For complete and detailed set of examples , see the examples.js file.
~~~
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

var newIOC = {
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
~~~
