import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
  static getStatus(req, res) {
    const redisAlive = redisClient.isAlive();
    const dbAlive = dbClient.isAlive();
    res.status(200).send({ redis: redisAlive, db: dbAlive });
  }

  static async getStats(req, res) {
    const usersNumber = await dbClient.nbUsers();
    const filesNumber = await dbClient.nbFiles();
    res.status(200).send({ users: usersNumber, files: filesNumber });
  }
}

module.exports = AppController;
