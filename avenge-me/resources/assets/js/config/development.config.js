var config = {
	env: 'development',
	api: {
		base_url: 'http://192.168.99.100',
		defaultRequest: {
			headers: {
				'X-Requested-With': 'rest.js',
				'Content-Type': 'application/json'
			}
		}
	},
	social: {
		facebook: '',
		twitter: '',
		github: ''
	},
	debug: true
}
module.exports = config;