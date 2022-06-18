const express = require('express')
const app = express()
const http = require('http').Server(app)
const port = process.env.PORT || 3000
/* Middlewares	  */

app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));

/* server stuff	  */

app.get('/',(req,res)=>{
	res.send("yes, i'm alive :)")
})

const server = http.listen(port, () => {
	console.log(`listening on http://localhost:${port}/`)
});

/* socket.io stuff  */
const io = require('socket.io')(server)
io.on('connection',(socket)=>{

	socket.on('message',(data)=>{
		socket.broadcast.emit('message',data)
	})
})


