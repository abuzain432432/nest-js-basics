import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { LoggingModule } from './modules/logging/logging.module';
import { LoggingMiddleware } from './common/middleware/logging.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import envConfig, { EnvironmentVariablesType } from './config/envConfig';
@Module({
  imports: [
    ConfigModule.forRoot({
      ...envConfig(),
    }),
    UsersModule,
    LoggingModule,
    MongooseModule.forRootAsync({
      useFactory: async (
        configService: ConfigService<EnvironmentVariablesType>,
      ) => {
        const dbUlr = configService.get('MONGODB_URL', { infer: true });
        return {
          uri: dbUlr,
        };
      },
      inject: [ConfigService<EnvironmentVariablesType>],
    }),
  ],
})
export class AppModule implements NestModule {
  constructor() {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
