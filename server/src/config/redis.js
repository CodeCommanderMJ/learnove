import { createClient } from 'redis';

let redisClient;

export const connectRedis = async () => {
  try {
    redisClient = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379'
    });

    redisClient.on('error', (err) => {
      console.log('Redis Client Error (skipping for demo):', err.message);
    });

    redisClient.on('connect', () => {
      console.log('🔴 Redis Connected');
    });

    await redisClient.connect();
  } catch (error) {
    console.log('⚠️  Redis connection failed (continuing without Redis):', error.message);
    redisClient = null;
  }
};

export const getRedisClient = () => redisClient;

export default redisClient;