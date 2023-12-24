import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from "cache-manager";
import { expiresTimeConfig } from 'src/core/environment/config';

@Injectable()
export class AuthService {

    constructor(@Inject(CACHE_MANAGER) private readonly cacheService: Cache) { }

    public async setCache(key: string, value: string): Promise<string> {
        return await this.cacheService.set(key, value);
    }

    public async getCache(key: string): Promise<string> {
        return await this.cacheService.get(key);
    }

    public async deleteCache(key: string): Promise<void> {
        return await this.cacheService.del(key);
    }

    public async resetCache(): Promise<void> {
        return await this.cacheService.reset();
    }

    public async getAllCache(): Promise<any> {
        return await this.cacheService.store.keys();
    }

    public isTokenExpired(timestamp: number) {
        const age = Date.now() - timestamp;
        return age > expiresTimeConfig.authExpiresIn;
    }

}