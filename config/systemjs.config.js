/**
 * Created by jordan.alphonso on 4/11/2017.
 *
 * Configuration for SystemJS which loads all angular components
 * using a compiler that converts from Typescript to Javascript.
 */
(function (global) {
    System.config({
        paths: {
            // paths serve as alias
            'npm:': 'lib/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            jnet: 'app',
            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            
            rxjs: 'npm:rxjs'
        },
        packages: {
            jnet: {
                main: './main.js',
                defaultExtension: 'js'
            },
            rxjs: {
                main: './bundles/Rx.min.js',
                defaultExtension: 'js'
            }
        }
    });
})(this);