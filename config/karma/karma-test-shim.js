Error.stackTraceLimit = 0;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;

var builtPaths = (__karma__.config.builtPaths || ['dist/'])
                 .map(function(p) { return 'base/dist/'+p;});

__karma__.loaded = function () { };

function isJsFile(path) {
  return path.slice(-3) == '.js';
}

function isValidFile(path) {
  return /\.spec\.(.*\.)?js$/.test(path)
    && isAppFile(path);
}

function isAppFile(path) {
  return isJsFile(path) &&
    path.indexOf('dist/app') !== -1;
}

var allSpecFiles = Object.keys(window.__karma__.files)
  .filter(isValidFile);

System.config({

  baseURL: 'base/dist',

  map: {
    '@angular/core/testing': 'npm:@angular/core/bundles/core-testing.umd.js',
    '@angular/common/testing': 'npm:@angular/common/bundles/common-testing.umd.js',
    '@angular/compiler/testing': 'npm:@angular/compiler/bundles/compiler-testing.umd.js',
    '@angular/platform-browser/testing': 'npm:@angular/platform-browser/bundles/platform-browser-testing.umd.js',
    '@angular/platform-browser-dynamic/testing': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js',
    '@angular/http/testing': 'npm:@angular/http/bundles/http-testing.umd.js',
    '@angular/router/testing': 'npm:@angular/router/bundles/router-testing.umd.js',
    '@angular/forms/testing': 'npm:@angular/forms/bundles/forms-testing.umd.js',
  },
});

System.import('systemjs.config.js')
  .then(initTestBed)
  .then(initTesting);

function initTestBed(){
  return Promise.all([
    System.import('@angular/core/testing'),
    System.import('@angular/platform-browser-dynamic/testing')
  ])

  .then(function (providers) {
    var coreTesting    = providers[0];
    var browserTesting = providers[1];

    coreTesting.TestBed.initTestEnvironment(
      browserTesting.BrowserDynamicTestingModule,
      browserTesting.platformBrowserDynamicTesting());
  })
}

function initTesting () {

  console.debug(JSON.stringify(allSpecFiles));
  return Promise.all(
    allSpecFiles.map(function (moduleName) {
      return System.import(moduleName);
    })
  )
  .then(__karma__.start, __karma__.error);
}