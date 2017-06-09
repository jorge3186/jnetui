/**
 * @name UnitTest
 * @author Jordan Alphonso
 * @created 06/01/2017
 *
 * @description
 * A simple api that allows for generating clean and easy unit tests.
 * This is integrated with jasmin and Angular's TestBed to help reduce the boiler plate
 * code that is needed for each unit test to run.
 */
import { async } from "@angular/core/testing";
import { inject } from "@angular/core/testing";
import { ComponentFixture } from "@angular/core/testing";

import { TestConfig } from "./test.util";
import { TestUtil } from "./test.util";

/**
 * @name UnitTest
 * @type {Class}
 * 
 * Unit Test class that will return itself to string together multiple tests
 * and should finally end by calling run().
 */
export class UnitTest {

	/**
	 * @type {String}
	 *
	 * The description for the unit test.
	 */
	private desc: string;
	
	/**
	 * @type {TestConfig}
	 *
	 * Test configuration that will hold all angular components.
	 */
	private config: TestConfig;
	
	/**
	 * @type {String[]}
	 * 
	 * Holds the descriptions from each individual unit test.
	 */
	private testDesc: string[];
	
	/**
	 * @type {any[]}
	 * 
	 * Stores the unit tests in order as they are declared.
	 */
	private tests: any[];

	constructor(desc: string) {
		this.desc = desc;
		this.testDesc = [];
		this.tests = [];
	}

	/**
	 * @public
	 * @static
	 * @param {String} desc
	 * @return {UnitTest}
	 * 
	 * A static method to help create a new unit test class. By Default, all tests have
	 * access to the ComponentFixture that is of the Config.tested type. This fixture can be accessed by 
	 * declaring it as a parameter in the test itself. 
	 * Example: .test("My first test", (fixture) => {
	 *				expect(fixture.componentInstance).toBeDefined();
	 * 			});
	 */
	public static create(desc: string): UnitTest {
		let unit = new UnitTest(desc);
		return unit;
	}

	/**
	 * @public 
	 * @param {TestConfig} config
	 *
	 * This method will eventually be called with TestBed.initTest()
	 * which will set up the TestBed and allow for access to the ComponentFixture
	 * and all html elements associated with it.
	 */
	public inject(config: TestConfig): UnitTest {
		this.config = config;
		return this;
	}

	/**
	 * @public 
	 * @param {String} desc
	 * @param {Function} test
	 * @return {UnitTest} this
	 *
	 * Add a test to this UnitTest class' container which will later be executed 
	 * when run() is invoked.
	 */
	public test(description: string, test: (fixture?: ComponentFixture<any>) => void): UnitTest {
		this.testDesc.push(description);
		this.tests.push(test);
		return this;
	}

	/**
	 * @public 
	 * @param {String} desc
	 * @param {Function} test
	 * @return {UnitTest} this
	 *
	 * Add a test to this UnitTest class' container which will later be executed 
	 * when run() is invoked. When there is an `x` in front of the method, it will follow
	 * jasmine's order and disable the test.
	 */
	public xtest(description: string, test: (fixture?: ComponentFixture<any>) => void): UnitTest {
		this.testDesc.push('**x**'+description);
		this.tests.push(test);
		return this;
	}

	/**
	 * @public 
	 * @param {String} desc
	 * @param {Function} test
	 * @return {UnitTest} this
	 *
	 * Add an async test to this UnitTest class' container which will later be executed 
	 * when run() is invoked.
	 */
	public testAsync(description: string, test: (fixture?: ComponentFixture<any>) => void): UnitTest {
		this.testDesc.push('**async**'+description);
		this.tests.push(test);
		return this;
	}

	/**
	 * @public 
	 * @param {String} desc
	 * @param {Function} test
	 * @return {UnitTest} this
	 *
	 * Add an async test to this UnitTest class' container which will later be executed 
	 * when run() is invoked. When there is an `x` in front of the method, it will follow
	 * jasmine's order and disable the test.
	 */
	public xtestAsync(description: string, test: (fixture?: ComponentFixture<any>) => void): UnitTest {
		this.testDesc.push('**x**'+description);
		this.tests.push(test);
		return this;
	}

	/**
	 * @public 
	 *
	 * Execute all tests in the order they were added using jasmine.
	 */
	public run(): void {
		describe(this.desc, () => {
			TestUtil.initTest(this.config);
			this.tests.forEach((test, idx) => {

				let desc = this.testDesc[idx];
				if (desc.startsWith('**x**')) {
					xit(desc.replace('**x**', ''), () => {
						let fixture = TestUtil.fixtureFor(this.config.tested);
						test(fixture);
					});
				} else if (desc.startsWith('**async**')) {
					it(desc.replace('**async**', ''), () => {
						let fixture = TestUtil.fixtureFor(this.config.tested);
						async(test(fixture));
					});
				} else {
					it(desc, () => {
						let fixture = TestUtil.fixtureFor(this.config.tested);
						test(fixture);
					});
				}
			});
		});
	}

}