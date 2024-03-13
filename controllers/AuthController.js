const { v4: uuidv4 } = require('uuid');
const redisClient = require('../utils/redis');
const DbClient = require('../utils/db');
const base64 = require('base-64');

class AuthController {
    static async getConnect(req, res) {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const credentials = base64.decode(authHeader.split(' ')[1]).split(':');
        const [email, password] = credentials;

        const user = await DbClient.getUserByEmailAndPassword(email, password);

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const token = uuidv4();
        const key = `auth_${token}`;
        
        await redisClient.setex(key, 86400, user._id.toString());

        res.status(200).json({ token });
    }

    static async getDisconnect(req, res) {
        const token = req.headers['x-token'];

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const key = `auth_${token}`;
        const userId = await redisClient.get(key);

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        await redisClient.del(key);

        res.status(204).end();
    }
}

module.exports = AuthController;
