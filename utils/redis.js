import redis from 'redis';

//const client = redis.client();

class RedisClient {
  constructor(client) {
    this.client = redis.client();
  }

  isAlive() {
    return this.client.connected;
  }

  get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, reply) => {
        if (err) reject(err);
        else resolve(reply);
      });
    });
  }

  set(key, value, duration) {
    return new Promise((resolve, reject) => {
      this.client.setex(key, duration, value, (err, reply) => {
        if (err) reject(err);
        else resolve(reply);
      });
    });
  }

  del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err, reply) => {
        if (err) reject(err);
        else resolve(reply);
      });
    });
  }
}

const redisClient = new RedisClient();

module.exports.redisClient = redisClient;
