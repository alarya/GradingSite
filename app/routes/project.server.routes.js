var users = require('../../app/controllers/users.server.controller'),
	project = require('../../app/controllers/project.server.controller');
	

module.exports = function(app){
	app.route('/api/project')
	.get(project.list)
	.post(project.create);	
	
	app.route('/api/project/:projectId')
	.get(project.read)
	.put(project.update)
	//.delete(users.requiresLogin,project.delete);
	.delete(project.delete);
	//every route that has the projectId param first call projectId method
	app.param('projectId',project.projectByID); 
};