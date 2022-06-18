var socket = require('socket.io-client')('https://nodereplchat.herokuapp.com/');
  const repl = require('repl')
  const chalk = require('chalk');
const username = "anon"
  socket.on('disconnect', function() {
      socket.emit('disconnect')
  });
  socket.on('connect', () => {
      console.log(chalk.red('=== start chatting ==='))
  })
  socket.on('message', (data) => {
      const { cmd, username } = data
      console.log(chalk.green(username + ': ' + cmd.split('\n')[0]));
  })
  repl.start({
      prompt: '',
	  eval: (cmd) => {
		  socket.send({cmd,username})
      }
  })