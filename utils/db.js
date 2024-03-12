import { MongoClient } from 'mongodb';

class DBClient {
	constructor() {
		const {
			DB_HOST = 'localhost',
			DB_PORT = 27017,
			DB_DATABASE = 'files_manager',
		} = process.env;

		this.client = new MongoClient(`mongodb://${DB_HOST}:${DB_PORT}`, {
			userNewUrlParser: true,
			userUnifiedTopology: true,
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
		const userCollection = database.collection('users');
		return usersCollection.countDocuments();
	}

	async nbFiles() {
		const database = this.client.db(this.databaseName);
		const userCollection = database.collection('files');
		return usersCollection.countDocuments();
	}
}

const dbClient = new DBClient();

export default dbClient;
