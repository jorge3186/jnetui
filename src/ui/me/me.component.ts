/**
 * @name MeComponent
 * @author Jordan Alphonso
 * @created 05/02/2017
 *
 * @description
 * This me component will have 'about me' information
 * as well as general skills information for users viewing this site.
 */
import { JnetUI } from "../../commons/decorators";

@JnetUI({
	tag: 'me',
	templateName: 'me.component.html'
})
export class MeComponent {
	public title:string = "Welcome to the About Me Page";
}