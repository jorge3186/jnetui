/**
 * @name Gulp File
 * @author Jordan Alphonso
 * @created 05/01/2017
 *
 * @description
 * This is the gulp file that will execute all build commands.
 * There are many commands that can be run by typing 'gulp {task}' into
 * the command line. When typing just `gulp` it will run the default commond
 * which is `build`.
 *
 * All gulp tasks should be defined in `config/tasks.js` and referenced here using Tasks.get(${task-name})
 */
const gulp = require('gulp');
const Tasks = require('./config/tasks').Tasks;

gulp.task('lint', Tasks.get('lint'));
gulp.task('sass', Tasks.get('sass'));
gulp.task('json', Tasks.get('json'));
gulp.task('templates', Tasks.get('templates'));
gulp.task('config', Tasks.get('config'));
gulp.task('lib', Tasks.get('lib'));
gulp.task('compile', ['sass', 'json', 'templates', 'config', 'lib'], Tasks.get('compile'));
gulp.task('test', ['compile', 'test:compile'], Tasks.get('test'));
gulp.task('test:compile', Tasks.get('test:compile'));
gulp.task('test:remap', Tasks.get('test:remap'));
gulp.task('test:postclean', ['test:remap'], Tasks.get('test:postclean'));
gulp.task('browser', Tasks.get('browser'));
gulp.task('serve', ['browser'], Tasks.get('serve'));
gulp.task('build', Tasks.get('build'));
gulp.task('build:skipTests', Tasks.get('build:skipTests'));
gulp.task('build:serve', ['build'], Tasks.get('build:serve'));

gulp.task('default', () => { gulp.start('build') });