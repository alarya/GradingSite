angular.module('project').config(['$routeProvider',
	function($routeProvider){
		$routeProvider.
		when('/project',{
			templateUrl: 'project/views/list-project.client.view.html'
		}).
		when('/project/create',{
			templateUrl: 'project/views/create-project.client.view.html'
		}).
		when('/project/:projectId',{
			templateUrl: 'project/views/view-project.client.view.html'
		}).
		when('/project/edit/:projectId',{
			templateUrl: 'project/views/edit-project.client.view.html'
		});
	}
]);