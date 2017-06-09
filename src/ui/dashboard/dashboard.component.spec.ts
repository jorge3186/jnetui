/**
 * @name DashboardComponentTest
 * @author Jordan Alphonso
 * @created 05/05/2017
 *
 * @description
 * Unit Test cases for DashboardComponent class.
 */
 import { UnitTest } from "../../utils/test/test.builder";
import { TestUtil } from '../../utils/test/test.util';
import { DashboardComponent } from "./dashboard.component";

UnitTest.create('DashboardComponent')

	/**
	 * Inject DashboardComponent into 
	 * angular's TestBed.
	 */
	.inject({
		tested: DashboardComponent
	})

	/**
	 * Test if the component instance is defined 
	 * after initialization of Test environment.
	 */
	.test('is defined', (fixture) => {
		expect(fixture.componentInstance).toBeDefined();
	})

	/**
	 * Get the title from the `<h3></h3>` tag and 
	 * verify that the title is what we expect.
	 */
	.test('has correct title', (fixture) => {
		TestUtil.update([fixture]);
		let el = TestUtil.getElementByCss(fixture, 'h3');
		expect(el.innerHTML).toEqual('Welcome to the Dashboard');
	})

	/**
	 * Build and run the DashboardComponent Tests
	 */
	.run();