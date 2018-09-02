var request =require('request')
class Secdo{
    constructor(connectionDetails) {
        this.serverName=connectionDetails.serverName
        this.apiKey=connectionDetails.apiKey
        this.company=connectionDetails.company
        this._run_command_api_URL='publicapiv2/run/command/'
        this.commands = {
            getAgents:'get_agents',
            isolateHost:'isolate',
            loadIOC: 'load_ioc'
        }
    }
    getAgents() {
        const options = {
            url: `https://${this.serverName}/${this._run_command_api_URL}`,
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'COMMAND-NAME': this.commands.getAgents,
                'API-KEY': this.apiKey
            } ,
            body: { company: this.company },
            json: true ,
            rejectUnauthorized:false
          }; 
          return new Promise(function(resolve,reject){
              request.post(options,function(err,response,body){
                  if (err){
                      return reject(err)
                  }
				  if(response.statusCode>=400){
                      return reject(body)
                  }
                  return resolve(body.agents)
              })
          })
    }
    isAgentInstalledOnHost(host){
        const options = {
            url: `https://${this.serverName}/${this._run_command_api_URL}`,
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'COMMAND-NAME': this.commands.getAgents,
                'API-KEY': this.apiKey
            } ,
            body: { company: this.company },
            json: true ,
            rejectUnauthorized:false
          }; 
          return new Promise(function(resolve,reject){
              request.post(options,function(err,response,body){
                  if (err){
                      return reject(err)
                  }
				  if(response.statusCode>=400){
                      return reject(body)
                  }
                  var agents=body.agents
                
                  agents.forEach(function(agent) {
                      if (agent.interfaces.includes(host) || agent.hostName == host) {
                          return resolve(true)
                      }
                  })
                  return resolve(false)         
              })
          })
    }
    getAgentState(host){
        const options = {
            url: `https://${this.serverName}/${this._run_command_api_URL}`,
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'COMMAND-NAME': this.commands.getAgents,
                'API-KEY': this.apiKey
            } ,
            body: { company: this.company },
            json: true ,
            rejectUnauthorized:false
          }; 
          return new Promise(function(resolve,reject){
              request.post(options,function(err,response,body){
                  if (err){
                      return reject(err)
                  }
				  if(response.statusCode>=400){
                      return reject(body)
                  }
                  var agents=body.agents
                
                  agents.forEach(function(agent) {
                      if (agent.interfaces.includes(host) || agent.hostName == host || agent.agentId==host) {
                          return resolve(agent.agentState)
                      }
                  })
                  return reject('No agent with ID/Host/IP: '+ host)         
              })
          })
    }
isolateHost(host,comment="Automated Isolation"){
        const options = {
            url: `https://${this.serverName}/${this._run_command_api_URL}`,
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'COMMAND-NAME': this.commands.isolateHost,
                'API-KEY': this.apiKey
            } ,
            body: { 
                company: this.company,
                host_name: host,
                comment: comment
             },
            json: true ,
            rejectUnauthorized:false
          }; 
          return new Promise(function(resolve,reject){
              request.post(options,function(err,response,body){
                  if (err){
                      return reject(err)
                  }
				  if(response.statusCode>=400){
                      return reject(body)
                  }
                  if (body.reply==true){
                      return resolve('Success')
                  }
                  if (body.reply.error) {
                      return reject(body.reply.error)
                  }
                         
              })
          })
    }
    loadIOC(ioc){
        const options = {
            url: `https://${this.serverName}/${this._run_command_api_URL}`,
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'COMMAND-NAME': this.commands.loadIOC,
                'API-KEY': this.apiKey
            } ,
            body: { 
                company: this.company,
                severity: ioc.severity,
                ioc_data: ioc.ioc_data,
                source: ioc.source,
                operations: ioc.operations,
                artifacts_type: ioc.artifacts_type,
                comment: ioc.comment
             },
            json: true ,
            rejectUnauthorized:false
          }; 
          return new Promise(function(resolve,reject){
              request.post(options,function(err,response,body){
                  if (err){
                      return reject(err)
                  }
				  if(response.statusCode>=400){
                      return reject(body)
                  }
                  if (body==true){
                      return resolve('Success')
                  }
                  if (body.reason) {
                      return reject(body.reason)
                  } 
              })
          })
    }
}
module.exports = Secdo