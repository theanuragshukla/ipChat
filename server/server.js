const express = require('express')
const app = express()
const http = require('http').Server(app)
const port = process.env.PORT || 3000

/* Middlewares	  */

app.use(express.json())
app.use(express.urlencoded({
	extended: true
}))

/* server stuff	  */

app.get('/',(req,res)=>{
	res.send("yes, i'm alive :)")
})

const server = http.listen(port, () => {
	console.log(`listening on ${port}`)
})

/* socket.io stuff  */

const io = require('socket.io')(server)
io.on('connection',async (socket)=>{
	socket.on('usrInfo',async (user,room)=>{
		socket.data.user = user
		socket.data.room = room
		const id = 10000000 +  Math.floor(Math.random()*9000000)
		socket.data.id = id
		socket.data.color = id%6
		await socket.join(room)
	})
	socket.on('message',(data)=>{
		console.log(socket.data.id)
		socket.to(socket.data.room).emit('message',data,socket.data.color,Math.floor(socket.data.id/10000))
		socket.emit('yourMsg',data,socket.data.color,Math.floor(socket.data.id/10000))
	})
})


