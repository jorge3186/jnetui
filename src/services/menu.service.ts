/**
 * @name MenuService
 * @author Jordan Alphonso
 * @created 05/01/2017
 *
 * @description
 * This service will make an {@link Http} call from 
 */
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

/**
 * @public
 * @name MenuItem
 * @type {Class}
 *
 * @description
 * Template class that holds information retrieved from menu.json file
 * and all permission attributes for this menu item.
 */
 export class MenuItem {

 	constructor(
 		public title: string,
 		public url: string,
 		public permissions: string,
 		public submenus: MenuItem[]) {}

 	/**
 	 * @public
 	 * @type {Function}
 	 *
 	 * @description
 	 * Splits the Menu Permissions into {@code String[]} and
 	 * returns the Array
 	 */
 	public getPermissions(): string[] {
 		return this.permissions.split(',');
 	}
 }


@Injectable()
export class MenuService {

	/**
	 * @private
	 * @type {string}
	 *
	 * @description
	 * The constant path to where the menu.json file resides
	 */
	private menuUrl: string = 'app/files/menu/menu.json';

	/**
	 * @private
	 * @type {Observable}
	 *
	 * @description
	 * The asynchronous menu that will be fetched using 
	 * the {@link Http#get} method. Since this menu.service is a singleton
	 * class, this menu item will be stored in effort to not make http calls
	 * everytime the menu needs to be accessed.
	 */
	private menu: Observable<MenuItem[]>;
	private submenus: any[];

	constructor(private http: Http) {}

	/**
	 * @public
	 * @type {Function}
	 * @return {Observable} the async menu from menu.json file
	 *
	 * @description
	 * This method will perform the {@link Http#get} call to our menu.json
	 * file and return the {@link Observable} that is parsed.
	 */
	public getMenu(): Observable<MenuItem[]> {
		if (this.menu !== undefined) {
			return this.menu;
		}

		this.menu = this.http.get(this.menuUrl)
			.map((res) => this.updateSubMenus(<MenuItem[]>res.json()))
			.catch((err:any) => Observable.throw(err 
				|| 'Error retrieving menu.json file'));
		return this.menu;
	}

	/**
	 * @private
	 * @type {Function}
	 * @param {MenuItem[]} menu - the full menu
	 * @return {MenuItem[]} the submenus
	 *
	 * @description
	 * This function will run through each menu item and update the url paths
	 * for all the sub items based on the root path.
	 */
	private updateSubMenus(menu: MenuItem[]): MenuItem[] {
		let entry: string = undefined;

		this.submenus = new Array<any>();
		for (let m of menu) {
			if (m.submenus !== undefined) {
				let updated = false;
				entry = m.url;

				for (let sub of m.submenus) {
					if (!updated) {
						m.url = m.url+sub.url;
						updated = true;
					}
					sub.url = entry+sub.url;
				}
				this.submenus.push({url: m.url, subs: m.submenus});	
			}
		}
		return menu;
	}

	/**
	 * @public
	 * @type {Function}
	 * @param {string} active - the current router view
	 *
	 * @description
	 * Return the submenu based on the active url
	 * that is passed as a parameter.
	 */
	public getSubmenu(active: string): MenuItem[] {
		if (typeof this.submenus !== 'undefined') {
			for (let sub of this.submenus) {
				if (sub.url === active) {
					return sub.subs;
				}
			}
		}
		return [];
	}

	/**
	 * @public
	 * @type {Function}
	 * @return {MenuItem[]} the refreshed menu
	 *
	 * @description
	 * At certain points in the application, then menu needs to be refreshed. For example,
	 * once a user logs in they may have access to additional menu items. In order for the user
	 * to see these items we need to make another {@link Http#get} call to our menu.json file.
	 */
	public refreshMenu(): Observable<MenuItem[]> {
		this.menu === undefined;
		return this.getMenu();
	}
}