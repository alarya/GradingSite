angular.module('chat').controller('ChatController', ['$scope','Socket',
	function($scope, Socket) {
		$scope.messages = [];             //array to hold messages
		
		//add retrieved messges to the array 
		Socket.on('chatMessage',function(message){
			$scope.messages.push(message);
		});
		
		//send new messages by emitting event on Socket
		$scope.sendMessage = function(){
			var message = {
				text: this.messageText,
			};
			
			Socket.emit('chatMessage', message);
			
			this.messageText = '';
		};
		
		//to deconsruct controller instance
		$scope.$on('$destroy', function(){
			Socket.removeListener('chatMessage');
		});
	}
]);