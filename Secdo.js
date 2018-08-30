var request =require('request')
class Secdo{
    constructor(connectionDetails) {
        this.serverName=connectionDetails.serverName
        this.apiKey=connectionDetails.apiKey
        this.company=connectionDetails.company
        this._run_command_api_URL='publicapiv2/run/command/'
    }
    getAgents() {
        const options = {
            url: `https://${this.serverName}/${this._run_command_api_URL}`,
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'COMMAND-NAME': 'get_agents',
                'API-KEY': this.apiKey
            } ,
            body: { company: this.company },
            json: true ,
            rejectUnauthorized:false
          }; 
          return new Promise(function(resolve,reject){
              var parsedBody;

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
}
module.exports = Secdo