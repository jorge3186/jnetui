/**
 *
 * @name JnetRouting
 * @author Jordan Alphonso
 * @created 05/02/2017
 *
 * @description
 * This is the router module that will hold all routes and route data 
 * for our application.
 */
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { UI_ROUTES } from "../commons/dispatcher";

@NgModule({
	imports: [ RouterModule.forRoot(UI_ROUTES) ],
	exports: [ RouterModule ]
})
export class JnetRouting {}

