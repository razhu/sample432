import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
    constructor(@Inject('RedisClient') private readonly redisClient: Redis) {}

    onModuleDestroy(): void {
        this.redisClient.disconnect();
    }

    async get(key: string): Promise<string | null> {
        return this.redisClient.get(key);
    }

    async set(key: string, value: string): Promise<void> {
        await this.redisClient.set(key, value);
    }

    async setnx(key: string, value: string): Promise<void> {
        await this.redisClient.setnx(key, value);
    }

    async delete(key: string): Promise<void> {
        await this.redisClient.del(key);
    }

    async setWithExpiry(key: string, value: string, expiry: number): Promise<void> {
        await this.redisClient.set(key, value, 'EX', expiry);
    }
}
