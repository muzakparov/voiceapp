const app = require('express')()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

const onInboundCall = (request, response) => {
  const ncco = 
  [
    {
    action: "talk",
    voiceName: "Emma",
    text: "Hi, i am Emma, i will be doing interview! I will ask you 5 questions, when you will be ready to start press 1",
    level: 1
    },
    {
      action: 'input',
      eventUrl: [`${request.protocol}://${request.get('host')}/webhooks/dtmf`]
    },
    // {
    // action: "record",
    // eventUrl: [`${request.protocol}://${request.get('host')}/webhooks/recordings`],
    // beepStart: true
    // },
  
  ]

  response.json(ncco)
}

const onInput = (request, response) => {
  const dtmf = request.body.dtmf

  if(dtmf == 1) {
    const ncco = [  {
      action: "talk",
      voiceName: "Emma",
      text: "Question 1: what is functional programming ?",
      level: 1
      }]

    response.json(ncco)
  }
 
}

const onRecording = (request, response) => {
 
  response.json(response)
}

app
  .get('/webhooks/answer', onInboundCall)
  .post('/webhooks/dtmf', onInput)
  .post('/webhooks/recordings', onRecording)

app.listen(3000)

module.exports = app;
