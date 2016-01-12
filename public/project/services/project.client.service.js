angular.module('project').factory('Project',['$resource'
	,function($resource){
		return $resource('api/project/:projectId',{
			projectId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}]);