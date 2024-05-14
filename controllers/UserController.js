import dbClient from "../utils/db";
import sha1 from 'sha1';

class UserController {
  static async postNew(req, res) {
    try {
      console.log('Request Headers:', req.headers);
      console.log('Request Body:', req.body);
      const { email, password } = req.body;
      console.log('Email:', email);
      console.log('Password:', password);
      if (!email) {
        return res.status(400).json({ error: 'Missing email' });
      }
      if (!password) {
        return res.status(400).json({ error: 'Missing password' });
      }

      const existingUser = await dbClient.db.collection('users').findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Already exist' });
      }

      const hashedPassword = sha1(password);
      const newUser = {
        email,
        password: hashedPassword,
      };

      // const result = await dbClient.db.collection('users').insertOne(newUser);
      const result = await dbClient.db.collection('users').insertOne(newUser);
      return res.status(201).json({ id: result.insertedId, email });
    } catch (err) {
      console.error(`Failed to create user: ${err}`);
      return res.status(500).json({ error: 'Failed to create user' });
    }
  }
}

module.exports = UserController;
