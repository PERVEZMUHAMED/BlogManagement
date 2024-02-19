import { createClient, RedisClientType } from "redis";

export default class RateLimiter {

    private redisClient: RedisClientType;
    private readonly limit: number;
    private readonly windowMS: number;

    constructor(limit: number, windowMs: number) {
        this.redisClient = createClient();
        this.limit = limit;
        this.windowMS = windowMs;
    }

    public checkRateLimit = async (IP: string): Promise<boolean> => {
        try {
            const currentTime = Date.now();
            const key = `rateLimit:${IP}`;
            const currentRequest = await this.redisClient.get(key)
            const requestCount = currentRequest ? parseInt(currentRequest, 10) : 0;
            if (requestCount >= this.limit) {
                return false;
            }
            await this.redisClient.multi().incr(key)
                .expire(key, this.windowMS / 1000).exec()
        } catch (error) {
            return error;
        }
        return true;
    }
}