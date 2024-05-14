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
