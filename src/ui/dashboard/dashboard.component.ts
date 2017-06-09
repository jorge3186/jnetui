/**
 * @name DashboardComponent
 * @author Jordan Alphonso
 * @created 05/02/2017
 *
 * @description
 * This dashboard component will have general information for users,
 * as well and a few snippets and widgets for viewing. This is the default
 * route when a user navigates to the initial website domain.
 */
import { JnetUI } from "../../commons/decorators";

@JnetUI({
	tag: 'dashboard',
	templateName: 'dashboard.component.html'
})
export class DashboardComponent {
	public title:string = "Welcome to the Dashboard";
}