/**
 * @name FindingsAngComponent
 * @author Jordan Alphonso
 * @created 05/02/2017
 *
 * @description
 * This me component will have 'about me' information
 * as well as general skills information for users viewing this site.
 */
import { JnetUI } from "../../../commons/decorators";

@JnetUI({
	tag: 'me',
	templateName: 'findings-ang.component.html'
})
export class FindingsAngComponent {
	public title:string = "Welcome to the Findings Angular Page";
}