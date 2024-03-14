import {
	Keys,
	Manager,
	SingleKeys,
	Tuples,
	UserMap,
	userMap,
} from '../models/types';

type ClassType<A extends Keys> = Extract<
	Tuples<Keys>,
	[A, InstanceType<UserMap[A]>]
>[1];

/**
 * A factory class for creating user instances.
 *
 * @export
 * @class UserFactory
 */
export class UserFactory {
	/**
	 * Returns an instance of the user class corresponding to the given key.
	 *
	 * @static
	 * @template K - The key type
	 * @param {SingleKeys<K>} k - The user key
	 * @return {*}  {ClassType<K>} - An instance of the user class
	 * @memberof UserFactory
	 */
	static getUser<K extends Keys>(k: SingleKeys<K>): ClassType<K> {
		if (typeof userMap[k] === 'function') {
			return new (userMap[k] as new () => ClassType<K>)();
		}
		throw new Error(`Constructor for key ${k} is not a function`);
	}

	/**
	 * Returns the user map.
	 *
	 * @static
	 * @return {UserMap} - The user map
	 * @memberof UserFactory
	 */
	static getUserMap(): UserMap {
		return userMap;
	}

	/**
	 * Retrieves the names of all users.
	 *
	 * @static
	 * @return {string[]} - An array of user names
	 * @memberof UserFactory
	 */
	static getAllUsers(): string[] {
		return Object.keys(userMap).map(
			(key) => UserFactory.getUser(key as Keys).constructor.name,
		);
	}

	/**
	 * Retrieves the role of the user corresponding to the given key.
	 *
	 * @static
	 * @template K - The key type
	 * @param {SingleKeys<K>} k - The user key
	 * @return {string} The user role
	 * @memberof UserFactory
	 */
	static getUserRole<K extends Keys>(k: SingleKeys<K>): string {
		return UserFactory.getUser(k).constructor.name;
	}

	/**
	 * Approves a request for the user corresponding to the given key.
	 *
	 * @static
	 * @template K - The key type
	 * @param {SingleKeys<K>} user - The user key
	 * @param {number} requestId - The ID of the request to approve
	 * @return {*}  {boolean} - Whether the request was approved or not
	 * @memberof userFactory
	 */
	static approveRequest<K extends Keys>(
		user: SingleKeys<K>,
		requestId: number,
	): boolean {
		const userInstance = UserFactory.getUser(user);
		if (userInstance instanceof Manager) {
			return userInstance.approveRequest(requestId);
		} else {
			throw new Error('Only managers can approve requests');
		}
	}
}
