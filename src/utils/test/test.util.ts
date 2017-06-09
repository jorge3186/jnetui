/**
 * @name TestUtil
 * @author Jordan Alphonso
 * @created 05/05/2017
 *
 * @description
 * Utility classes for helping write unit tests for jnet application.
 */
import { Type } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { ComponentFixture } from "@angular/core/testing";
import { async } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
import { platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";

/**
 * @public
 * @name TestConfig;
 * @type {Interface}
 *
 * @description
 * An Inteface that will be passed in as the only argument when 
 * triggering {@link TestUtil#init} method.
 */
export interface TestConfig {
	/**
	 * @type {Array<InjectableMock>}
	 * Any services that need to be injected into the TestBed
	 */
	injectables?: InjectableMock[];

	/**
	 * @type {any}
	 * Declaration that need to be initialized in the TestBed
	 */
	tested?: any;

	/**
	 * @type {Array<any>}
	 * All external modules that need to be imported into the TestBed
	 */
	imports?: any[];
}

/**
 * @public
 * @name InjectableMock
 * @type {Interface}
 *
 * @description
 * An interface to establish an injectable that should be
 * mocked within Angular's TestBed.
 */
export interface InjectableMock {

	/**
	 * @type {any}
	 * The actual provider that will be mocked
	 */
	injectable: any;

	/**
	 * @type {any}
	 * The mock class to use instead of the actual provider, if necessary
	 */
	use?: any;
}

/**
 * @name TestUtil
 * @type {Class}
 *
 * @description
 * A Utility class that will help aid developers while 
 * testing the application. This class will use a lot of the testing tools
 * provided by Angular.
 */
export class TestUtil {

	/**
	 * @type {Function}
	 * @param {TestConfig} config
	 *
	 * Initialize {@link TestBed} only if the static property 'initialized'
	 * is true. Then compile components provided in the config. This method is typically used
	 * within the {@link beforeEach} call.
	 */
	public static initTest<T>(config: TestConfig): void {

		let providers: any[];
		if (config.injectables !== undefined) {
			providers = new Array<any>();
			for (let p of config.injectables) {
				if (p.use !== undefined) {
					providers.push({provide: p.injectable, useClass: p.use});
				} else {
					providers.push(p.injectable);
				}
			}
		}

		let templatePath: string = config.tested.annotations[0].templateUrl;
		let stylesPath: string[] = config.tested.annotations[0].styleUrls;

		if (stylesPath !== undefined && stylesPath.length > 0) {
			(stylesPath as Array<string>).forEach((val: string, idx: number) => {
				if (!stylesPath[idx].startsWith('base/dist/')) {
					stylesPath[idx] = 'base/dist/'+stylesPath[idx];
				}
			});
		}

		beforeEach(async(() => {
			TestBed.configureTestingModule({
				providers: providers,
				declarations: [config.tested],
				imports: config.imports
			}).overrideComponent(config.tested, {
				set: {
					providers: providers,
					templateUrl: 'base/dist/'+templatePath,
					styleUrls: stylesPath
				}
			}).compileComponents();
		}));
	}

	/**
	 * @type {Function}
	 * @param {Type<T>} component
	 * @return {ComponentFixture<T>}
	 * Create a component fixture that will be used to test elements
	 * within the template and it respective component instance.
	 */
	public static fixtureFor<T>(component: Type<T>): ComponentFixture<T> {
		return TestBed.createComponent(component);
	}

	/**
	 * @type {Function}
	 * @param {ComponentFixture<T>} fixutre
	 * @return {any} HTML Element that is found or undefined
	 * Finds an HTML element by it's tag name based on the ComponentFixture that
	 * has been supplied.
	 */
	public static getElementByCss<T>(fixture: ComponentFixture<T>, css: string): any {
		if (fixture !== undefined && css !== undefined) {
			let debug = fixture.debugElement.query(By.css(css));
			return debug ? debug.nativeElement : undefined;
		}
		return undefined;
	}

	/**
	 * @type {Function}
	 * @param {ComponentFixture<any>[]} fixtures
	 * Updates the fixture by calling {@link ComponentFixture#detectChanges}
	 */
	public static update(fixtures: Array<ComponentFixture<any>>): void {
		if (fixtures !== undefined && fixtures.length > 0) {
			fixtures.forEach((fixture) => {
				fixture.detectChanges();
			});
		}
	}

}