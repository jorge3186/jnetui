/**
 * @name RootComponent
 * @author Jordan Alphonso
 * @created 05/02/2017
 *
 * @description
 * This component will be the root component of the application. It will hold the 
 * {@code <router-outlet>} attribute as well as the menu navigation.
 */
import { OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Observable } from "rxjs/Rx";

import { JnetUI } from "../../commons/decorators";
import { Messages } from "../../commons/messages";
import { MenuService } from "../../services/menu.service";
import { MenuItem } from "../../services/menu.service";
import { AuthService } from "../../services/auth.service";
import { LoginUser } from "../../services/auth.service";
import { LoggerFactory } from "../../services/log.factory";
import { Logger } from "../../services/log.factory";

@JnetUI({
	tag: 'jnet',
	templateName: 'root.component.html',
	styleName: 'root.component.scss',
	injectables: [MenuService, AuthService]
})
export class RootComponent implements OnInit {

	/**
	 * @public
	 * @type {Observable}
	 *
	 * @description
	 * This is the applications menu. It can be accessed throughout 
	 * the application since it is contained in the root component.
	 */
	public menu: Observable<MenuItem[]>;

	/**
	 * @public
	 * @type {Boolean}
	 *
	 * @description
	 * When {@code true}, this will display the login box.
	 */
	public loginView: boolean;

	/**
	 * @public 
	 * @type {AuthUser}
	 * 
	 * @description
	 * This is the user that is mapped to the login form.
	 */
	public user: LoginUser = new LoginUser('', '');

	/**
	 * @public
	 * @type {Array<string>}
	 *
	 * @description
	 * Any errors that are sent from services, other component,
	 * or directives will be stored in this array.
	 */
	public msg: Messages = Messages.getInstance();

	/**
	 * @private
	 * @type {Logger}
	 *
	 * @description
	 * Logger for RootComponent class.
	 */
	private logger: Logger = LoggerFactory.getLogger('RootComponent');

	/**
	 * @public 
	 * @type {Constructor}
	 */
	constructor(private menuService: MenuService,
				private authService: AuthService,
				private router: Router) {}

	/**
	 * @public 
	 * @type {Function}
	 *
	 * @description
	 * This is the implementation of the interface {@link OnInit}
	 * provided by Angular and it will trigger this function
	 * once the component has finished loading.
	 */
	public ngOnInit(): void {
		this.menu = this.menuService.getMenu();
		this.loginView = false;
	}

	/**
	 * @public
	 * @type {Function}
	 * @return {boolean}
	 *
	 * @description
	 * This is a helper function to determine whether a menu item is
	 * a divider or not while being accessed in an {@code *ngFor} loop.
	 */
	public isDivider(item:MenuItem): boolean {
		if (item.title === '') {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * @public
	 * @type {Function}
	 * @return {MenuItem[]} the submenus for the active route
	 *
	 * @description
	 * Return the correct submenus based on the current active
	 * route provided by the router.
	 */
	public getSubMenu(): MenuItem[] {
		return this.menuService.getSubmenu(this.router.url);
	}

	/**
	 * @public
	 * @type {Function}
	 *
	 * @description
	 * This will reset the login box and display it on the screen.
	 */
	public displayLogin(): void {
		this.user = new LoginUser('', '');
		this.loginView = true;
	}

	/**
	 * @public 
	 * @type {Function}
	 *
	 * @description
	 * This is hide the login box from the screen and enable
	 * the ui, unless it has invalid permissions. If that is the 
	 * case then it will redirect back to the dashboard.
	 */
	public hideLogin(): void {
		this.loginView = false;
		Messages.clear();
	}

	/**
	 * @public 
	 * @type {Function}
	 *
	 * @description
	 * Validates the login form. Once validation is passed then an attempt
	 * to login is made. If not successful, it will display the reason for
	 * the unsuccessful attempt in the login box.
	 */
	public authenticate(): void {
		if (this.authService.validateLogin(this.user)) {
			this.logger.debug('Attempting login');
		}
	}

}