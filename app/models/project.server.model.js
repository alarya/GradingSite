var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	

var ProjectSchema = new Schema({	
	courseNumber: {
		type: String,
	},
	title: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
	purposeText: {
		type: String,
		default: '',
		trim: true
	},
	requirements: {
		type: [String]
	}
});

mongoose.model('Project',ProjectSchema);