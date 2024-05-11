import MongoClient from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || '27017';
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}/${database}`;

    this.db = MongoClient.connect(url);
  }

  async isAlive() {
    this.db = await MongoClient.connect('mongodb://localhost:27017');
  }

  async nbUsers(users) {
    return this.db.collection(users).countDocuments();
  }

  async nbFiles(files) {
    return this.db.collection(files).countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;
