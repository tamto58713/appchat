const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

// our localhost port
const port = 8080
const app = express()

// our server instance
const server = http.createServer(app)

// This creates our socket using the instance of the server
const io = socketIO(server)

// This is what the socket.io syntax is like, we will work this later
let users = [];
io.on('connection', socket => {
  users.push(socket.id);
  console.log('New client connected');
  io.sockets.emit('new user connected', users);

  socket.on('disconnect', socket => {
    console.log('Someone disconnected');

    temp = users.filter(user => {
      return user !== socket.id
    })

    users = temp

    io.sockets.emit("user disconnected", users)
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`))
