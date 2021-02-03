import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeadlessChromeModule } from './headless-chrome/headless-chrome.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typedEnv } from './utils/typed-env';
import { UserEntity } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { PostEntity } from './post/post.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    synchronize: true,
    host: typedEnv.DB_HOST,
    port: typedEnv.DB_PORT,
    username: typedEnv.DB_USER,
    password: typedEnv.DB_PASSWORD,
    database: typedEnv.DB_NAME,
    entities: [UserEntity, PostEntity],
    migrationsTableName: 'migration_table',
    migrations: ['./migration/*.js'],
    cli: {
      migrationsDir: 'migration',
    },
  }),
    HeadlessChromeModule, UserModule, AuthModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
