const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path'); 

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
    // this.db = this.client.db(this.database);
  }


  async connect() {
    try {
      
      await this.client.connect();
      this.connected = true;
      console.log('Connected to MongoDB');

      // Check if the database exists, create if it doesn't
      const dbList = await this.client.db().admin().listDatabases();
      if (!dbList.databases.some(db => db.name === this.database)) {
        await this.createDatabase();
      }
    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
      throw error;
    }
  }

  async createDatabase() {
    let dbPath;
    try {
      dbPath = path.join(__dirname, '..','utils', this.database);
      fs.mkdirSync(dbPath);
      console.log(`Database '${this.database}' created at ${dbPath}`);
    } catch (error) {
      console.error(`Error creating database '${this.database}' at ${dbPath}:`, error.message);
      throw error;
    }
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
}

const dbClient = new DBClient();
module.exports = dbClient;
