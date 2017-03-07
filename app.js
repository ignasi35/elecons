const express = require('express')
const request = require('request');
const moment = require('moment')
const app = express()

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const PORT = process.env.PORT || 3000
const url = 'http://fran.noip.me:8888/consumo?id=0001'

app.use(express.static('public'))

var dataReads = []
var connections = []

app.get('/', function(req,res) {
  res.sendFile(__dirname + '/index.html')
})

//it listens a  message 'connection' and  will do the function
io.on('connection', function(socket){
  connections.push(socket);
  console.log(`Connected: ${connections.length} sockets connected`)
  
  // Emit - send data available
  const myInterval = setInterval( () => {
    request(url,  (error, response, body) => {

      let bodyParsed = body.replace(/\n/g,'')
      let current = bodyParsed.substring(bodyParsed.indexOf(':')+1);
      let accumulated = bodyParsed.substring(0,bodyParsed.indexOf(':'))

      let readObject = {
          date : moment(Date.now()).format('DD/MM/YYYY hh:mm:ss'), 
          current : +current,
          accumulated: +accumulated
        }
      // //array pushing
      // dataReads.push(readObject)
      // console.log(dataReads)
    console.log(readObject)

    socket.emit('new read', {reading: readObject})
    })
  }, 30000)
  setTimeout(() => clearInterval(myInterval), 240000)
})

server.listen( PORT, () => console.log(`Listening on ${PORT}...`) )
