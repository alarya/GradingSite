angular.module('chat').service('Socket',['Authentication',
	'$location', '$timeout',
		function(Authentication, $location, $timeout) {
			if(Authentication.user){		//check if user authenticated
				this.socket = io();			//set service socket property
			} else {
				$location.path('/');		//if not redirect to home page
			}
			
			//-----Define service methods-------//
			
			this.on = function(eventName, callback){
				if(this.socket){
					this.socket.on(eventName, function(data){
						$timeout(function(){
							callback(data);
						});
					});
				}	
			};
			
			this.emit = function(eventName, data){
				if(this.socket){
					this.socket.emit(eventName, data);
				}	
			};
			
			this.removeListener = function(eventName){
				if(this.socket){
					this.socket.removeListener(eventName);
				}	
			};
		}		
]);