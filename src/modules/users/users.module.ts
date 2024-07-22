import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
/**  A module class can inject providers as well
 * (e.g., for configuration purposes)
 *  module classes themselves cannot be injected as providers due to circular dependency .
 **/
export class UsersModule {}
