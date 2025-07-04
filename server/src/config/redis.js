import { createClient } from 'redis';

let redisClient;

export const connectRedis = async () => {
  try {
    redisClient = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379'
    });

    redisClient.on('error', (err) => {
      console.error('Redis Client Error:', err);
    });

    redisClient.on('connect', () => {
      console.log('🔴 Redis Connected');
    });

    await redisClient.connect();
  } catch (error) {
    console.error('Redis connection failed:', error.message);
  }
};

export const getRedisClient = () => redisClient;

export default redisClient;