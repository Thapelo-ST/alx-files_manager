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
    }

    async isAlive() {
	try {
	    await this.client.connect();
	    return true;
	} catch (error) {
	    return false;
	} finally {
	    await this.client.close();
	}
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

    async getUser(query) {
	const database = this.client.db(this.databaseName);
	const usersCollection = database.collection('users');
	return usersCollection.findOne(query);
    }

    async createUser(user) {
	const database = this.client.db(this.databaseName);
	const usersCollection = database.collection('users');
	return usersCollection.insertOne(user);
    }
}

const dbClient = new DBClient();

export default dbClient;
