module.exports = function(io, socket){
	
	//inform all connected socket clients about newly connected user
	io.emit('chatMessage',{
		type: 'status',
		text: 'connected',
		created: Date.now(),
		username: socket.request.user.username
	});	
	
	//event handler for messages sent. adds user info and emits to all socket clients
	socket.on('chatMessage',function(message){
		message.type = 'message';
		message.created = Date.now();
		message.username = socket.request.user.username;
		
		io.emit('chatMessage',message);
	});
	
	//when a user disconnects | notify all connected socket clients
	socket.on('disconnect',function(){
		io.emit('chatMessage',{
			type: 'status',
			text: 'disconnected',
			created: Date.now(),
			username: socket.request.user.username
		});
	});
};