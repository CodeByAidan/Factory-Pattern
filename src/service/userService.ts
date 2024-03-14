import { UserFactory } from './userFactory';
import { Keys, SingleKeys } from '../models/types';

/**
 * A service class for user operations.
 *
 * @export
 * @class UserService
 */
export class UserService {
	/**
	 * Approves a request for the user corresponding to the given key.
	 *
	 * @template K - The key type
	 * @param {SingleKeys<K>} user - The user key
	 * @param {number} requestId - The ID of the request to approve
	 * @return {*}  {boolean} - Whether the request was approved or not
	 * @memberof UserService
	 */
	approveRequest<K extends Keys>(
		user: SingleKeys<K>,
		requestId: number,
	): boolean {
		return UserFactory.approveRequest(user, requestId);
	}

	/**
	 * Retrieves the user map.
	 *
	 * @return {string[]} - An array of user names
	 * @memberof UserService
	 */
	getAllUsers(): string[] {
		return UserFactory.getAllUsers();
	}

	/**
	 * Retrieves the salary information for the user corresponding to the given key.
	 *
	 * @template K - The key type
	 * @param {SingleKeys<K>} user - The user key
	 * @return {string} - The salary information
	 * @memberof UserService
	 */
	getSalaryByUser<K extends Keys>(user: SingleKeys<K>): string {
		return UserFactory.getUser(user).getSalary();
	}

	/**
	 * Retrieves the role of the user corresponding to the given key.
	 *
	 * @template K - The key type
	 * @param {SingleKeys<K>} user - The user key
	 * @return {string} - The user role
	 * @memberof UserService
	 */
	getUserRole<K extends Keys>(user: SingleKeys<K>): string {
		return UserFactory.getUser(user).constructor.name;
	}
}
