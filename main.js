const dbClient = require('./utils/db');

async function main() {
  // Check if the connection is alive
  console.log(dbClient.isAlive());

  // Get the number of users
  try {
    const numUsers = await dbClient.nbUsers();
    console.log(`Number of users: ${numUsers}`);
  } catch (err) {
    console.error(`Failed to get number of users: ${err}`);
  }

  // Get the number of files
  try {
    const numFiles = await dbClient.nbFiles();
    console.log(`Number of files: ${numFiles}`);
  } catch (err) {
    console.error(`Failed to get number of files: ${err}`);
  }
}

main();
