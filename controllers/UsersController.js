import dbClient from '../utils/db';
import sha1 from 'sha1';
import { v4 as uuidv4 } from 'uuid';
import redisClient from '../utils/redis';
import base64 from 'base-64';

class UsersController {
	static async postNew(req, res) {
		const { email, password } = req.body;

		if (!email) {
			return res.status(400).json({ error: 'Missing email' });
		}

		if (!password) {
			return res.status(400).json({ error: 'Missing password' });
		}

		const existingUser = await dbClient.getUser({ email });

		if (existingUser) {
			return res.status(400).json({ error: 'Already exist' });
		}

		const hashedPassword = sha1(password);

		const newUser = {
			email,
			password: hashedPassword,
		};

		const result = await dbClient.createUser(newUser);

		return res.status(201).json({ id: result.insertedId, email });
	}

	static async getMe(req, res) {
		const token = req.headers['x-token'];

		if (!token) {
			return res.status(401).json({ error: 'Unauthorized' });
		}

		const key = `auth_${token}`;
		const userId = await redisClient.get(key);

		if (!userId) {
			return res.status(401).json({ error: 'Unauthorized' });
		}

		const user = await dbClient.getUserById(userId);

		if (!user) {
			return res.status(401).json({ error: 'Unauthorized' });
		}

		return res.json({ id: user._id, email: user.email });
	}
}

module.exports = UsersController;
