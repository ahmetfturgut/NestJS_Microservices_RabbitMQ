import { Module } from '@nestjs/common';
import type { RedisClientOptions } from 'redis'; 
import { CacheModule } from '@nestjs/cache-manager';
import { AuthService } from './auth.service';
const redisStore = require('cache-manager-redis-store');

@Module({
    imports: [
        CacheModule.register<RedisClientOptions>({
            store: redisStore,
            isGlobal: true,
            ttl: 0
        })
    ],
    exports: [AuthService],
    providers: [AuthService],
})
export class AuthModule { }