import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { LoggingModule } from './modules/logging/logging.module';
import { LoggingMiddleware } from './common/middleware/logging.middleware';
@Module({
  imports: [UsersModule, LoggingModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
    /**
      We may also further restrict a middleware to a particular request method by passing an object containing the route path and request method to the forRoutes() method when configuring the middleware.
     **/
    // .forRoutes({ path: 'cats', method: RequestMethod.GET });
  }
}
