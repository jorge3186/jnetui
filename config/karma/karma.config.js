module.exports = function(config) {

	config.set({

		basePath: '../../',

		browsers: ['Chrome'],

		frameworks: ['jasmine'],

		files: [

			'dist/lib/core-js/client/shim.min.js',
			'dist/lib/systemjs/dist/system.src.js',
		    'dist/lib/zone.js/dist/zone.js',
		    'dist/lib/zone.js/dist/long-stack-trace-zone.js',
		    'dist/lib/zone.js/dist/proxy.js',
		    'dist/lib/zone.js/dist/sync-test.js',
		    'dist/lib/zone.js/dist/jasmine-patch.js',
		    'dist/lib/zone.js/dist/async-test.js',
		    'dist/lib/zone.js/dist/fake-async-test.js',
		    'dist/lib/reflect-metadata/Reflect.js',
		    
		    { pattern: 'dist/lib/rxjs/**/*.js', included: false, watched: false },

      		{ pattern: 'dist/lib/@angular/**/*.umd.js', included: false, watched: false },
      		{ pattern: 'dist/lib/@angular/**/*.umd.js.map', included: false, watched: false },

      		{ pattern: 'dist/systemjs.config.js', included: false, watched: false },

      		'config/karma/karma-test-shim.js',

      		{ pattern: 'dist/app/**/*.js', included: false, watched: false },

      		{ pattern: 'dist/app/**/*.js.map', included: false, watched: false },

			{ pattern: 'dist/templates/**/*.html', included: false, watched: false },

      		{ pattern: 'dist/styles/**/*.css', included: false, watched: false },

      		{ pattern: 'src/**/*.ts', included: false, watched: false },

		],

    	preprocessors: {
    		'dist/app/**/!(test)/**/!(*spec).js': ['coverage']
    	},

    	coverageReporter: {
	      	type : 'json',
	      	dir: 'dist/coverage/'
	    },

		reporters: ['mocha', 'coverage'],
		
		autoWatch: false,
		
		colors: true,
		
		logLevel: config.LOG_INFO,

		browserNoActivityTimeout: 30000,
		
		concurrency: Infinity

	});

}