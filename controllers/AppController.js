import dbClient from '../utils/db';

class AppController {
    static async getStatus(req, res) {
        const isDbAlive = await dbClient.isAlive();

        if (isDbAlive) {
            res.status(200).json({
                redis: true,
                db: true,
            });
        } else {
            res.status(500).json({
                error: 'Database connection error',
            });
        }
    }

    static async getStats(req, res) {
        try {
            const usersCount = await dbClient.nbUsers();
            const filesCount = await dbClient.nbFiles();

            res.status(200).json({
                users: usersCount,
                files: filesCount,
            });
        } catch (error) {
            res.status(500).json({
                error: 'Error retrieving stats',
            });
        }
    }
}

export default AppController;
