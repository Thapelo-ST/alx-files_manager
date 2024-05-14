import { v4 as uuidv4 } from 'uuid';
import sha1 from 'sha1';
import redisClient from '../utils/redis';
import dbClient from '../utils/db';


class AuthController {
  static async getConnect(req, res) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    const [email, password] = Buffer.from(authHeader.split(' ')[1], 'base64').toString('utf-8').split(':');
    const hashedPassword = sha1(password);

    try {
      const user = await dbClient.db.collection('users').findOne({ email: email, password: hashedPassword });
      if (!user) {
        return res.status(401).send({ error: 'Unauthorized' });
      }

      const token = uuidv4();
      await redisClient.set(`auth_${token}`, user._id.toString(), 24 * 60 * 60);

      return res.status(200).json({ token: token });
    } catch (error) {
      console.error(`Failed to authenticate user: ${error}`);
      return res.status(500).send({ error: 'Internal Server Error' });
    }
  }

  static async getDisconnect(req, res) {
    const token = req.header('X-Token');
    if (!token) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    try {
      const userId = await redisClient.get(`auth_${token}`);
      if (!userId) {
        return res.status(401).send({ error: 'Unauthorized' });
      }

      await redisClient.del(`auth_${token}`);
      return res.status(204).end();
    } catch (error) {
      console.error(`Failed to disconnect user: ${error}`);
      return res.status(500).send({ error: 'Internal Server Error' });
    }
  }
}


module.exports = AuthController;
