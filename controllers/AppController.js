const RedisClient = require('../utils/redis');
const DbClient = require('../utils/db');

class AppController {
    static getStatus(req, res) {
	const redisAlive = RedisClient.isAlive();
	const dbAlive = DbClient.isAlive();

	if (redisAlive && dbAlive) {
	    res.json({ redis: true, db: true });
	    res.end();
	}
    }

    static async getStats(req, res) {
	const users = await DbClient.nbUsers();
	const files = await DbClient.nbFiles();
	res.json({ users, files });
	res.end();
    }
}

export default AppController;
