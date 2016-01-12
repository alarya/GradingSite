var mongoose = require('mongoose'),
	Project = mongoose.model('Project');
	
// Method used internally to extract error messages from error object from mongoose module
var getErrorMessage = function(err){
	if (err.errors){
		for (var errName in err.errors){
			if (err.errors[errName].message) 
				return err.errors[errName].message;				
		}
	} else {
		return 'Unkown server error';
	}
};

//Create operation
exports.create = function(req,res){
	var project = new Project(req.body);
	project.creator = req.user;
	
	project.save(function(err){
		if (err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else {
			res.json(project);
		}
	});	
};

//list all articles
exports.list = function(req,res){
	Project.find().sort('-created').populate('creator', 
	'firstName lastName fullName').exec(function(err,project){
		if (err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			res.json(project);
		}
	});
};

//get a particular article by id: middleware used in other methods
exports.projectByID = function (req,res,next,id){
	Project.findById(id).populate('creator', 
	'firstName lastName fullName').exec(function(err,project){
		if (err)return next(err);
		if(!project) return next(new Error('Failed to load article '+id));
		
		req.project = project;
		next();
	});
};

//read a project
exports.read = function(req,res){
	res.json(req.project);	
};

//update a project
exports.update = function (req,res){
	var project = req.article;
	//project.courseNumber = req.body.courseNumber;
	project.title = req.body.title;
	project.purposeText = req.body.purposeText;
	project.requirements = req.body.requirements;
	
	project.save(function(err){
		if(err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else {
			res.json(project);
		}
	});	
};

//delete a project
exports.delete = function (req,res){
	var project = req.project;
	
	project.remove(function(err){
		if(err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(project);
		}
	});
};

//authenticating the delete and update operations on the articles
exports.hasAuthorization = function(req, res, next){
	if(req.article.creator.id !== req.user.id){
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();	
};