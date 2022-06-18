var socket = require('socket.io-client')('https://nodereplchat.herokuapp.com/');
const repl = require('repl')
const chalk = require('chalk');
const username = "anon"
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})
socket.on('disconnect', function() {
	socket.emit('disconnect')
});
socket.on('connect', () => {
	console.log(chalk.red('=== start chatting ==='))
})
socket.on('message', (data) => {
	const { msg, username } = data
	console.log(chalk.green(username + ': ' + msg.split('\n')[0]));
})
/*
repl.start({
	prompt: '',
	eval: (cmd) => {
		socket.send({cmd,username})
	}
})*/


const inpMsg = (ques,cb)=>{
	readline.question(ques,(msg)=>{
		cb(msg)
	})
}
const printMsg = (msg) =>{
	socket.emit('message',{msg,username})
	inpMsg('# ',printMsg)
}

inpMsg('# ',printMsg)

