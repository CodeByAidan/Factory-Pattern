/**
 * Interface representing a staff member.
 *
 * @interface IStaff
 */
interface IStaff {
	/**
	 * Gets the salary information for the staff member.
	 *
	 * @return {string} - The salary information
	 * @memberof IStaff
	 */
	getSalary(): string;
}

/**
 * A class representing a manager, implementing the `IStaff` interface.
 *
 * @class Manager
 * @implements {IStaff}
 */
class Manager implements IStaff {
	/**
	 * Retrieves the salary information for the manager.
	 *
	 * @return {string} - The salary information
	 * @memberof Manager
	 */
	getSalary(): string {
		return 'I am paid too much';
	}

	/**
	 * Approves a request.
	 *
	 * @param {number} requestId - The ID of the request to approve
	 * @return {*}  {boolean} - Whether the request was approved or not
	 * @memberof Manager
	 */
	approveRequest(requestId: number): boolean {
		if (requestId <= 0) {
			throw new Error('Invalid request ID');
		}

		console.log(`Request ${requestId} has been approved.`);
		return true;
	}
}

/**
 * A class representing a developer, implementing the `IStaff` interface.
 *
 * @class Developer
 * @implements {IStaff}
 */
class Developer implements IStaff {
	/**
	 * Retrieves the salary information for the developer.
	 *
	 * @return {string} - The salary information
	 * @memberof Developer
	 */
	getSalary(): string {
		return 'underpaid';
	}
}

/** @type {UserMap} */
const userMap = {
	dev: Developer,
	manager: Manager,
};

/**
 * The type representing the user map.
 *
 * @typedef {typeof userMap} UserMap
 */

/**
 * The keys of the user map.
 *
 * @typedef {keyof UserMap} Keys
 */

/**
 * A tuple type representing a key-value pair from the user map.
 *
 * @typedef {T extends Keys ? [T, InstanceType<UserMap[T]>] : never} Tuples
 */

/**
 * A type representing a single key from the user map.
 *
 * @typedef {[K] extends (K extends Keys ? [K] : never) ? K : never} SingleKeys
 */

/**
 * The user map.
 *
 * @type {UserMap}
 */
type UserMap = typeof userMap;

/**
 * The keys of the user map.
 *
 * @type {Keys}
 */
type Keys = keyof UserMap; // 'dev' | 'manager'

/**
 * A tuple representing a key-value pair from the user map.
 *
 * @type {Tuples<T>}
 * @template T - The key type
 */
type Tuples<T> = T extends Keys ? [T, InstanceType<UserMap[T]>] : never;

/**
 * A type representing a single key from the user map.
 *
 * @type {SingleKeys<K>}
 * @template K - The key type
 */
type SingleKeys<K> = [K] extends (K extends Keys ? [K] : never) ? K : never;

export { Manager, Developer, userMap };
export type { IStaff, UserMap, Keys, Tuples, SingleKeys };
