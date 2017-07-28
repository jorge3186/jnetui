/**
 * @name DashboardComponentTest
 * @author Jordan Alphonso
 * @created 05/05/2017
 *
 * @description
 * Unit Test cases for RootComponent class.
 */
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";

import { TestUtil } from '../../utils/test/test.util';
import { UnitTest } from '../../utils/test/test.builder';
import { RootComponent } from "./root.component";
import { MenuService } from "../../services/menu.service";
import { AuthService } from "../../services/auth.service";

import { MenuServiceStub } from '../../utils/test/stubs/menu.service.stub';
import { RouterStub } from '../../utils/test/stubs/router.stub';

UnitTest.create('RootComponent')

	.inject({
		imports: [RouterTestingModule, FormsModule],
		tested: RootComponent,
		injectables: [
			{ injectable: MenuService, use: MenuServiceStub },
			{ injectable: AuthService },
			{ injectable: Router, use: RouterStub }
		]
	})

	.test('is defined', (fixture) => {
		expect(fixture.componentInstance).toBeDefined();
	})

	.test('has a login button', (fixture) => {
		let el = TestUtil.getElementByCss(fixture, '.login-bar');
		expect(el.innerHTML).toEqual('login');
	})

	.test('shows login box when login button is clicked', (fixture) => {
		fixture.componentInstance.ngOnInit();
		TestUtil.update([fixture]);

		let el = TestUtil.getElementByCss(fixture, '.login-bar');
		el.click();
		TestUtil.update([fixture]);

		let loginBox = TestUtil.getElementByCss(fixture, '.login-view-box');
		let loginBg = TestUtil.getElementByCss(fixture, '.login-view-bg');

		expect(fixture.componentInstance.loginView).toBeTruthy();
		expect(loginBox).toBeDefined();
		expect(loginBg).toBeDefined();

		loginBg.click();
		TestUtil.update([fixture]);
		expect(fixture.componentInstance.loginView).toBeFalsy();
	})

	.run();
