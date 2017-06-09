/**
 *
 * @name Dispatcher
 * @author Jordan Alphonso
 * @created 05/02/2017
 *
 * @description
 * This file will hold all registry classes, components, services and directives used
 * within the application. Any access to the declared classes will be taken from here.
 */
import { Route } from "@angular/router";

import { RootComponent } from "../ui/root/root.component";
import { DashboardComponent } from "../ui/dashboard/dashboard.component";
import { MeComponent } from "../ui/me/me.component";
import { FindingsAngComponent } from "../ui/findings/ang/findings-ang.component";

import { MenuService } from "../services/menu.service";
import { AuthService } from "../services/auth.service";

/**
 * @public
 * @name UI_BOOTSTRAPPER
 * @type {Array<any>}
 * 
 * @description
 * Registry for the components that this application will bootstrap with it's
 * {@link @NgModule} on startup.
 */
export const UI_BOOTSTRAPPER = [
	RootComponent,
];

/**
 * @public
 * @name UI_COMPONENTS
 * @type {Array<any>}
 * 
 * @description
 * Registry for all UI components that have been decorated with 
 * {@link JnetUI} decorators.
 */
export const UI_COMPONENTS = [
	RootComponent,
	DashboardComponent,
	MeComponent,
	FindingsAngComponent
];

/**
 * @public
 * @name UI_ROUTES
 * @type {Array<any>}
 * 
 * @description
 * Registry for all routes that can be accessible along with their 
 * corresponding permissions. Permissions should be set with the {@code data} 
 * attribute of the {@link Route}.
 */
export const UI_ROUTES: Array<Route> = [
	{path: '', redirectTo: 'dashboard', pathMatch: 'full' },
	{path: 'dashboard', component: DashboardComponent},
	{path: 'me', component: MeComponent},
	{path: 'findings/ng', component: FindingsAngComponent}
];

/**
 * @public
 * @name SERVICES
 * @type {Array<any>}
 * 
 * @description
 * Registry for the services that this application will configure with it's
 * {@link @NgModule} on startup. These classes should have the {@link @Injectable}
 * decorator applied.
 */
export const SERVICES = [
	MenuService,
	AuthService
];