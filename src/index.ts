import { UserService } from './service/userService';

console.log(
	'salary for manager: ',
	new UserService().getSalaryByUser('manager'),
);
console.log('salary for dev: ', new UserService().getSalaryByUser('dev'));

const userService = new UserService();

console.log('Role of manager: ', userService.getUserRole('manager'));
console.log('Role of dev: ', userService.getUserRole('dev'));
console.log('All users: ', userService.getAllUsers());

try {
	console.log(
		'Manager approving request: ',
		userService.approveRequest('manager', 123),
	);
} catch (error) {
	if (error instanceof Error) {
		console.error(error.message);
	}
}

export * from './models/types';
export * from './service/userFactory';
export * from './service/userService';
