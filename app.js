const app = require('express')()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

const onInboundCall = (request, response) => {
  const ncco = 
  [
    {
    action: "talk",
    voiceName: "Emma",
    text: "Hi, i am Emma, i will be doing interview! I will ask you 5 questions, when you will be ready to start press #",
    level: 1
    },
    {
      action: 'input',
      eventUrl: [`${request.protocol}://${request.get('host')}/webhooks/dtmf`]
    },
    {
    action: "record",
    endOnKey: "#",
    beepStart: true
    },
    {
    action: "talk",
    voiceName: "Emma",
    text: "Question 1: what is functional programming ?",
    level: 1
    }
  ]

  response.json(ncco)
}

const onInput = (request, response) => {
  const dtmf = request.body.dtmf

  const ncco = [{
    action: 'talk',
    text: `You pressed ${dtmf}`
  }]

  response.json(ncco)
}

app
  .get('/webhooks/answer', onInboundCall)
  .post('/webhooks/dtmf', onInput)

app.listen(3000)

module.exports = app;
