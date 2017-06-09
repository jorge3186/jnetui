/**
 * @name JNET
 * @author Jordan Alphonso
 * @created 05/01/2017
 *
 * @description
 * The root application that will load all other dependencies. This
 * module will be bootstrapped based on the browser supplied using
 * {@link BrowserModule}. All services, components and directives will be
 * injected asynchronously and need to be addded here. All must first be registered
 * in {@link ../commons/dispatcher.ts} under the appropriate section.
 */
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";

import { UI_COMPONENTS } from "../commons/dispatcher";
import { UI_BOOTSTRAPPER } from "../commons/dispatcher";
import { SERVICES } from "../commons/dispatcher";
import { JnetRouting } from "../commons/routing";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        JnetRouting,
        HttpModule
    ],
    declarations: UI_COMPONENTS,
    bootstrap: UI_BOOTSTRAPPER,
    providers: SERVICES
})
export class JNET {}