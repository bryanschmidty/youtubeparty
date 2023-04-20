import Ws from 'App/Services/Ws'
Ws.boot()

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', (socket) => {
  socket.on('server-news', (message) => {
    console.log(`server-news ${message}`)
  })

  socket.on('room-create', (roomId, googleId) => {
    console.log(`room-create ${roomId}, ${googleId}`)
  })

  socket.on('room-join', (roomId, googleId) => {
    console.log(`joining ${roomId}, ${googleId}`)
  })

  socket.on('room-leave', (roomId, googleId) => {
    console.log(`leaving ${roomId}, ${googleId}`)
  })

  socket.on('chat-message', (roomId, googleId, message) => {
    console.log(`chat-message ${roomId}, ${googleId}, ${message}`)
  })

  socket.on('player-state-change', (roomId, googleId, state, time) => {
    console.log(`player-state-change ${roomId}, ${googleId}, ${state}, ${time}`)
  })

  socket.on('queue-add', (roomId, googleId, videoId) => {
    console.log(`queue-add ${roomId}, ${googleId}, ${videoId}`)
  })

  socket.on('queue-remove', (roomId, googleId, videoId) => {
    console.log(`queue-remove ${roomId}, ${googleId}, ${videoId}`)
  })

  socket.on('video-upvote', (roomId, googleId, videoId) => {
    console.log(`video-upvote ${roomId}, ${googleId}, ${videoId}`)
  })

  socket.on('video-downvote', (roomId, googleId, videoId) => {
    console.log(`video-downvote ${roomId}, ${googleId}, ${videoId}`)
  })

  socket.on('user-login', (googleId) => {
    console.log(`user-login ${googleId}`)
  })

  socket.on('user-logout', (googleId) => {
      console.log(`user-logout ${googleId}`)
  })

  socket.on('user-promote', (roomId, googleId, userId, roleId) => {
    console.log(`user-promote ${roomId}, ${googleId}, ${userId},  ${roleId}`)
  })

  socket.on('user-demote', (roomId, googleId, userId, roleId) => {
    console.log(`user-demote ${roomId}, ${googleId}, ${userId},  ${roleId}`)
  })

  socket.on('user-ban', (roomId, googleId, userId) => {
    console.log(`user-ban ${roomId}, ${googleId}, ${userId}`)
  })
})
