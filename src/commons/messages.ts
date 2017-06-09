/**
 * @name Messages
 * @author Jordan Alphonso
 * @created 05/11/2017
 *
 * @description
 * A convenient class with static functions that will allow you to access a 
 * common message and error holder in any class. The messages will be held in
 * a static instance of the class and only retrieve through this instance.
 */
export class Messages {

	/**
	 * @private
	 * @type {Messages}
	 *
	 * @description
	 * The static instance. Once this instance is created, no other
	 * instances of this class should be created.
	 */
	private static instance: Messages;

	/**
	 * @public
	 * @type {Array<string>}
	 *
	 * @description
	 * The messages that will be held in the static instance.
	 */
	public messages: Array<string> = new Array<string>();

	/**
	 * @public
	 * @type {Array<string>}
	 *
	 * @description
	 * The errors that will be held in the static instance.
	 */
	public errors: Array<string> = new Array<string>();

	/**
	 * @public
	 * @static
	 * @type {Function}
	 *
	 * @description
	 * Add an error to the instance's errors array.
	 */
	public static error(error: string): void {
		Messages.getInstance().errors.push(error);
	}

	/**
	 * @public
	 * @static
	 * @type {Function}
	 *
	 * @description
	 * Add a message to the instance's message array.
	 */
	public static message(message: string): void {
		Messages.getInstance().messages.push(message);
	}

	/**
	 * @public
	 * @static
	 * @type {Function}
	 * @return {Array<string>}
	 *
	 * @description
	 * Returns the instance's array of messages.
	 */
	public static getMessages(): Array<string> {
		return Messages.instance.messages;
	}

	/**
	 * @public
	 * @static
	 * @type {Function}
	 * @return {Array<string>}
	 *
	 * @description
	 * Returns the instance's array of errors.
	 */
	public static getErrors(): Array<string> {
		return Messages.getInstance().errors;
	}

	/**
	 * @public
	 * @static
	 * @type {Function}
	 *
	 * @description
	 * Clears all messages and errors from the instance.
	 */
	public static clear(): void {
		Messages.getInstance().messages = new Array<string>();
		Messages.getInstance().errors = new Array<string>();
	}

	/**
	 * @public
	 * @static
	 * @type {Function}
	 * @return {Messages}
	 *
	 * @description
	 * Creates an instance of Messages if {@link Messsages.instance} is not
	 * defined. Returns the instance.
	 */
	public static getInstance(): Messages {
		if (typeof Messages.instance === 'undefined' ||
				Messages.instance === null) {
			Messages.instance = new Messages();
		}
		return Messages.instance;
	}
}