angular.module('project').controller('ProjectController',
	['$scope','$routeParams','$location','Authentication','Project',
		function($scope, $routeParams,$location,Authentication, Project){
			$scope.authentication = Authentication;
			//create an article
			$scope.create = function(){
				var array = this.requirements.split(',');
				var project = new Project({
					title: this.title,
					purposeText: this.purposeText,
					requirements: array
				});
				//save the newly created article
				project.$save(function(response){
						$location.path('project/' + response._id);
					}, function(errorResponse){
						$scope.error = errorResponse.data.message;
				});
			};
			//find a collection of document
			$scope.find = function(){
				$scope.project = Project.query();	
			};
			//find a single document
			$scope.findOne = function(){
				$scope.project = Project.get({
					projectId: $routeParams.projectId
				});
			};	
			//Update a document
			$scope.update = function(project){
				$scope.project.$update(function(){
					$location.path('project/'+ $scope.project._id);
				}, function(errorResponse){
					$scope.error = errorResponse.data.message;
				});	
			};		
			//delete an article
			$scope.delete = function(project){
				if(project){
					project.$remove(function(){
						for(var i in $scope.project){
							if($scope.project[i] === project){
								$scope.project.splice(i,1);
							}
						}
					});
				}else{
					$scope.project.$remove(function(){
						$location.path('project');
					});
				}
			};
	}
]);