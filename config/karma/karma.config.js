module.exports = function(config) {

	var now = Date.now();

	config.set({

		basePath: '../../',

		browsers: ['PhantomJS'],

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
      		{ pattern: 'dist/lib/rxjs/**/*.js.map', included: false, watched: false },

      		{ pattern: 'dist/lib/@angular/**/*.umd.js', included: false, watched: false },
      		{ pattern: 'dist/lib/@angular/**/*.umd.js.map', included: false, watched: false },

      		{ pattern: 'dist/systemjs.config.js', included: false, watched: false },

      		'config/karma/karma-test-shim.js',

      		{ pattern: 'dist/app/**/*.js', included: false, watched: true },

      		{ pattern: 'dist/app/**/*.js.map', included: false, watched: false },

			{ pattern: 'dist/templates/**/*.html', included: false, watched: true },

      		{ pattern: 'dist/styles/**/*.css', included: false, watched: true }

		],

    	preprocessors: {},

		reporters: ['mocha'],
		
		autoWatch: false,
		
		colors: true,
		
		logLevel: config.LOG_INFO,
		
		concurrency: Infinity

	});

}