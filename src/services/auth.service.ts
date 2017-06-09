/**
 * @name AuthService
 * @author Jordan Alphonso
 * @created 05/10/2017
 *
 * @description
 * All Authentication/Login information and validation will be called through
 * this class and the methods supplied.
 */
import { Injectable } from "@angular/core";

import { Messages } from "../commons/messages";
import { StringUtils } from "../utils/string.utils";

/**
 * @public
 * @type {Class}
 *
 * @description
 * This is a simple class that holds
 * the login information when a user is making a 
 * login attempt.
 */
export class LoginUser {

	constructor(
		public name: string,
		public pw: string) {}

}

/**
 * @public
 * @type {Class}
 *
 * @description
 * After a successful login, the current user's information is then
 * stored in this class and accessed through the {@link AuthService}.
 */
export class JnetUser {

	constructor(
		public username: string,
		public firstname: string,
		public lastname: string,
		public email: string,
		public phone: string) {}

}


@Injectable()
export class AuthService {

	/**
	 * @private
	 * @type {JnetUser}
	 *
	 * @description
	 * The authenticated user after a successful login.
	 */
	private authUser: JnetUser;

	/**
	 * @public
	 * @type {Function}
	 * @return {Boolean}
	 *
	 * @description
	 * Validates the login credentials before attempting to
	 * make a call to the login api.
	 */
	public validateLogin(login: LoginUser): boolean {
		Messages.clear();

		let valid = true;
		if (!StringUtils.hasLength(login.name)) {
			Messages.error('Username is required');
			valid = false;
		}
		if (!StringUtils.hasLength(login.pw)) {
			Messages.error('Password is required');
			valid = false;
		}
		return valid;
	}

}