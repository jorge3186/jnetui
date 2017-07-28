const gulp = require('gulp');
const tslint = require('gulp-tslint');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const typescript = require('gulp-typescript');
const tsProject = typescript.createProject('tsconfig.json');
const sourcemaps = require('gulp-sourcemaps');
const karma = require('karma');
const browsersync = require('browser-sync').create();
const historyAPI = require('connect-history-api-fallback');
const del = require('del');
const remap = require('remap-istanbul/lib/gulpRemapIstanbul');

/**
 * @type {Class}
 * 
 * Helper class to retrieve tasks through
 * a static get(taskname) function.
 */
class Tasks {

	static get(task) {
		return taskdef[task];
	}

}

const taskdef = {
	
	/**
	 * Lint all Typescript files based on the tslint.json
	 * configuration file.
	 */
	"lint": () => {
		return gulp.src(['src/**/*.ts', '!src/**/*.spec.ts', '!src/**/test/*.ts'])
        .pipe(tslint({
            formatter: 'stylish',
            configuration: 'config/tslint.json'
        }))
        .pipe(tslint.report());
	},

	/**
	 * Copies all json files from the src folder into the 
	 */
	"json": () => {
		return gulp.src('src/**/*.json')
        .pipe(gulp.dest('dist/app'));
	},

	/**
	 * Takes all scss files from the src folder and 
	 * converts them to css using `gulp-sass` then moves
	 * the file to `dist/app/styles` folder.
	 */
	"sass": () => {
		return gulp.src('src/**/*.scss')
        .pipe(sass())
        .pipe(rename({
            dirname: '/styles'
        }))
        .pipe(gulp.dest('dist'));
	},

	/**
	 * Takes all html files, exlcuding `index.hmlt` and copies them
	 * to the `dist/templates` folder.
	 */
	"templates": () => {
		return gulp.src(['src/**/*.html', '!**/index.html'])
        .pipe(rename({
            dirname: '/templates'
        }))
        .pipe(gulp.dest('dist'));
	},

	/**
	 * Copies the root `index.html` file and the systemJs config
	 * `systemjs.config.js` file into the `dist/app` folder.
	 */
	"config": () => {
		return gulp.src(['src/index.html', 'config/systemjs.config.js'])
        .pipe(gulp.dest('dist'));
	},

	/**
	 * Copies all necessary libraries from the `node_modules` directory
	 * to the `dist/lib` directory.
	 */
	"lib": () => {
		return gulp.src([
	        'core-js/client/shim.min.js',
	        'systemjs/dist/system-polyfills.js',
	        'systemjs/dist/system.src.js',
	        'reflect-metadata/Reflect.js',
	        'rxjs/**/*.js',
	        'zone.js/dist/**/*.js',
	        '@angular/**/bundles/**'
	    ], {cwd: "node_modules/**"})
	        .pipe(gulp.dest("dist/lib"));
	},

	/**
	 * Compiles all typescript files into javascript es5 files.
	 * This task excludes all test files and test folders.
	 */
	"compile": () => {
		const result = gulp.src(['src/**/*.ts', '!src/**/*.spec.ts', '!src/**/test/*.ts'])
	        .pipe(sourcemaps.init())
	        .pipe(tsProject());
	    return result.js
	        .pipe(sourcemaps.write('.', {sourceRoot: '/src'}))
	        .pipe(gulp.dest('dist/app'));
	},

	/**
	 * Creates a karma server based off the karma.config.js file
	 * and starts the test executions. Once complete, it will start the 
	 * 'test:postclean' task.
	 */
	"test": () => {
		const server = new karma.Server({
	        configFile: __dirname+'/karma/karma.config.js',
	        singleRun: true}, () => {
	            gulp.start('test:postclean');
	        });
	    server.start();
	},

	/**
	 * Compiles all typescript files that either end in 'spec.ts' or 
	 * exists within a folder named test.
	 */
	"test:compile": () => {
		const result = gulp.src(['src/**/*.spec.ts', 'src/**/test/*.ts'])
	        .pipe(sourcemaps.init())
	        .pipe(tsProject());
	    return result.js
	        .pipe(sourcemaps.write('.', {sourceRoot: '/src'}))
	        .pipe(gulp.dest('dist/app'));
	},

	/**
	 * Once karma has completed, the test files are gathered
	 * and deletes them from the 'dist' folder.
	 */
	"test:postclean": () => {
		del('dist/app/**/*.spec.js');
    	del('dist/app/**/*.spec.js.map');
    	del('dist/app/**/test');
    	del('dist/coverage');
	},

	/**
	 * Takes the 'coverage-final.json' file produced by karma
	 * and uses remap-istanbul to remap the coverage to the typescript
	 * files and sends the reports to the 'dist/coverage-reports' folder.
	 */
	"test:remap": () => {
		return gulp.src('dist/coverage/**/coverage-final.json')
			.pipe(remap({
				reports: {
					'html': 'dist/coverage-reports/html',
					'cobertura': 'dist/coverage-reports/coverage.xml',
					'text-summary': null
				}
			}));
	},

	/**
	 * Initializes Browsersync and starts up a session.
	 */
	"browser": () => {
		return browsersync.init(
        ['src/**/*.ts', 
        'src/**/*.html', 
        'src/**/*.scss'], 

        {
          "browser": "chrome",
          "port": 8080,
          "files": [
            "dist/**/*.js",
            "dist/**/*.html",
            "dist/**/*.css"
          ],
          "server": {
            baseDir: "dist",
            middleware: [ historyAPI() ]
          }
        });
	},

	/**
	 * Once browsersync has been started, this task will watch all application
	 * files and automatically reload browsersync when a change is deteced.
	 */
	"serve": () => {
		gulp.watch(["src/**/*.ts"], ['compile']).on('change', function (e) {
        browsersync.reload;
	        console.log( e.path + ' has been changed. Compiling.');
	    });
	    gulp.watch(["src/**/*.html", "src/**/*.scss", "src/**/*.js", "src/**/*.json"], ['resources']).on('change', function (e) {
	        browsersync.reload;
	        console.log(e.path + ' has been changed. Updating.');
	    });
	},

	/**
	 * Run a complete build, but skips the test execution.
	 */
	"build:skipTests": () => {
		del.sync('./dist');
    	return gulp.start('compile');
	},

	/**
	 * Run a complete build, including test execution and coverage.
	 */
	"build": () => {
	    del.sync('./dist');
	    return gulp.start('test');
	},

	/**
	 * Run a complete build. Once the build is complete it will 
	 * start up browsersync and serve the application on the specified
	 * browser, watching for file changes.
	 */
	"build:serve": () => {
		gulp.start('serve');
	}
};

module.exports.Tasks = Tasks;