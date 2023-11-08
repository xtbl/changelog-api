import * as user from '../users';
// create a test for user handler
describe('user handler', () => {
	it('should do something', async () => {
		expect(1).toBe(1);
	})

	it('should create a new user', async () => {
		const req = {body: {username: 'hello', password: 'hi'}};
		const res = {json({token}) {
			expect(token).toBeTruthy();
		}};

		await user.createNewUser(req, res);
	})
})
