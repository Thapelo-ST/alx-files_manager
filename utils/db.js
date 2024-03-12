import { MongoClient } from 'mongodb';

class DBClient {
    constructor() {
	const {
	    DB_HOST = 'localhost',
	    DB_PORT = 27017,
	    DB_DATABASE = 'files_manager',
	} = process.env;

	this.client = new MongoClient(`mongodb://${DB_HOST}:${DB_PORT}`, {
	    useNewUrlParser: true,
	    useUnifiedTopology: true,
	});

	this.databaseName = DB_DATABASE;
	this.connected = false;
	this.connect();
    }

    async connect() {
	try {
	    await this.client.connect();
	    this.connected = true;
	} catch (error) {
	    console.error(error.message);
	    this.connected = false;
	}
    }

    isAlive() {
	return this.connected;
    }

    async nbUsers() {
	const database = this.client.db(this.databaseName);
	const usersCollection = database.collection('users');
	return usersCollection.countDocuments();
    }

    async nbFiles() {
	const database = this.client.db(this.databaseName);
	const filesCollection = database.collection('files');
	return filesCollection.countDocuments();
    }

    async createUser(user) {
	const database = this.client.db(this.databaseName);
	const usersCollection = database.collection('users');
	return usersCollection.insertOne(user);
    }

    async getUser(query) {
	const database = this.client.db(this.databaseName);
	const usersCollection = database.collection('users');
	return usersCollection.findOne(query);
    }
}

const dbClient = new DBClient();

export default dbClient;
