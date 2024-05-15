const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

class DBClient {
  constructor() {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';
    this.url = `mongodb://${this.host}:${this.port}`;
    this.connected = false;
    this.client = new MongoClient(this.url, { useUnifiedTopology: true });
    this.client
      .connect()
      .then(() => {
        this.connected = true;
      })
      .catch((err) => console.log(err.message));
    this.db = this.client.db(this.database);
  }

  isAlive() {
    return this.connected;
  }

  async nbUsers() {
    await this.client.connect();
    const users = await this.client
      .db(this.database)
      .collection('users')
      .countDocuments();
    return users;
  }

  async nbFiles() {
    await this.client.connect();
    const users = await this.client
      .db(this.database)
      .collection('files')
      .countDocuments();
    return users;
  }

  // helping functions
  async find_user(id) {
    const _id = new ObjectId(id);
    await this.client.connect();
    const user = await this.client.db(this.database).collection('users').findOne({ _id });
    return user;
  }

  async create_file(file) {
    await this.client.connect();
    const result = await this.client
      .db(this.database)
      .collection('files')
      .insertOne(file);
    return result.ops[0];
  }

  async find_files(query, page) {
    await this.client.connect();
    const files = await this.client
      .db(this.database)
      .collection('files')
      .find(query)
      .skip(page * 20)
      .limit(20)
      .toArray();
    return files;
  }

  async find_file(query) {
    try {
      const file = await File.findOne(query);
      return file;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
