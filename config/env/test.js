// Invoke 'strict' JavaScript mode
'use strict';

// Set the 'test' environment configuration object
module.exports = {
	db: 'mongodb://localhost/mean-test',
	sessionSecret: 'testSessionSecret',
	viewEngine: 'ejs',
	facebook: {
		clientID: 'APP_ID',
		clientSecret: 'APP_SECRET',
		callbackURL: 'http://localhost:3000/oauth/facebook/callback'
	},
	twitter: {
		clientID: 'APP_ID',
		clientSecret: 'APP_SECRET',
		callbackURL: 'http://localhost:3000/oauth/twitter/callback'
	},
	google: {
		clientID: 'APP_ID',
		clientSecret: 'APP_SECRET',
		callbackURL: 'http://localhost:3000/oauth/google/callback'
	}
};