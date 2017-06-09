/**
 *
 * @name JNET Decorators
 * @author Jordan Alphonso
 * @created 05/01/2017
 *
 * @description
 * All custom decorators will be implemented in this class and can be accessed throughout
 * the application by referencing this file. 
 */
import { Component } from "@angular/core";

/**
 * @public
 * @name JNETUIConfig
 * @type {Interface}
 *
 * @description
 * An {@link Interface} that will be passed as the argument for
 * a {@link JnetUI} decorator that will reside on each component class
 * that is expected to be used as a UI for Jnet application.
 */
export interface JNETUIConfig {

	/**
	 * @type {string}
	 * The tag name that this component will have
	 * when loaded into html. 
	 * Example: 
	 * 		tag = 'jnet';
	 * 		<jnet></jnet>
	 */
	tag: string;

	/**
	 * @type {string}
	 * The name of the html template that is associated
	 * with this component.
	 */
	templateName: string;

	/**
	 * @type {string}
	 * The name of the scss file that is associated
	 * with this component.
	 */
	styleName?: string;

	/**
	 * @type {Array<any>}
	 * Any services that should be injected into this component can be added
	 * here. These services can then be accessed by calling them from the compopnent's
	 * constructor.
	 */
	injectables?: Array<any>;

	/**
	 * @type {Array<string>}
	 * Supply all incoming properties names that this component can access
	 * from it's parent outputs.
	 */
	inputs?: Array<string>;

	/**
	 * @type {Array<string>}
	 * Supply all outgoing property names that can be accessed by this component's 
	 * child components
	 */
	outputs?: Array<string>;

}

/**
 * @public 
 * @name JnetUI
 * @type {Function}
 *
 * @description
 * Custom configuration for converting {@link JnetUI} decorators into 
 * {@link Component} decorator and applying all the necessary attributes to the component
 */
export function JnetUI(options: JNETUIConfig) {
	return function(ctor: Function) {
		let component = new Component({
			selector: options.tag,
			templateUrl: 'templates/'+options.templateName,
			providers: options.injectables,
			styleUrls: options.styleName === undefined ? undefined : ['styles/'+options.styleName.replace('scss', 'css')],
			exportAs: ctor.name
		});
		(ctor as any).annotations = [component];
	};
}