import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategy/GoogleStrategy';
import { FacebookStrategy } from './strategy/FacebookStrategy';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  providers: [AuthService,GoogleStrategy,FacebookStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
