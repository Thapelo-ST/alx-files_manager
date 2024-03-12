import mongoose from 'mongoose';

class DBClient {
    constructor () {
        const {
            DB_HOST = 'localhost',
            DB_PORT = 27017,
            DB_DATABASE = 'files_manager',
        } = process.env;
        
        const connectionString = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

        mongoose.connect(connectionString, {
            userNewUrlParser: true,
            userUnifiedTopology: true,
        });

        this.db = mongoose.connection;

        this.db.on('error', (error) => {
            console.log(`MongoDB error: ${error}`);
        });
    }

    isAlive() {
        return this.db.readyState === 1;
    }

    async nbUsers() {
        return mongoose.model('files').countDocuments();
    }
    
    async nbFiles() {
        return mongoose.model('files').countDocuments();
    }
}

const dbClient = new DBClient();

export default dbClient;
