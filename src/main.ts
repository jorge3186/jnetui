/**
 * Created by jordan.alphonso on 3/28/2017.
 *
 * Root Application module will be imported and Bootstrapped using the
 * `PlatformBrowser` module in Angular. This allows for the application
 * to be compatible across all modern browsers.
 */
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {JNET} from "./bootstrap/jnet";
/**
 * Bootstrap the application with the bootstrapped component
 * supplied in {@link JNET}. All other components and directives will
 * be loaded asynchronously at the time they are called.
 */
platformBrowserDynamic().bootstrapModule(JNET);