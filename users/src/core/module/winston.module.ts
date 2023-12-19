import { Module } from '@nestjs/common';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';

@Module({
    imports: [
        WinstonModule.forRoot({
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json(),
            ),
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.ms(),
                        nestWinstonModuleUtilities.format.nestLike('MyApp', {
                            colors: true,
                            prettyPrint: true,
                        }),
                    ),
                }),
                new winston.transports.File({
                    filename: 'info.log',
                    level: 'info',
                }),
                new winston.transports.File({
                    filename: 'error.log',
                    level: 'error',
                }),
            ],
        }),
    ],

    controllers: [],
    providers: [],
})
export class LoggerWinstonModule { }

