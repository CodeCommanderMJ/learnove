import { createClient } from 'redis';

let redisClient;

export const connectRedis = async () => {
  // Only attempt Redis connection if REDIS_URL is explicitly provided
  if (!process.env.REDIS_URL) {
    console.log('⚠️  No REDIS_URL provided, skipping Redis connection');
    redisClient = null;
    return;
  }

  try {
    redisClient = createClient({
      url: process.env.REDIS_URL
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