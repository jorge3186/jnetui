/**
 * @name StringUtils
 * @author Jordan Alphonso
 * @created 05102017
 *
 * @description
 * A utility class that will help resolve common {@code string} issues
 * and checks.
 */
export class StringUtils {

	/**
	 * @public
	 * @static
	 * @type {Function}
	 * @return {Boolean}
	 * 
	 * @description
	 * Determines whether the given string is {@code undefined},
	 * is an empty string or is valid.
	 */
	public static hasLength(input: string): boolean {
		if (input !== undefined 
			&& input.length > 0) {
			return true;
		}
		return false;
	}

}