import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfileModule } from './user_profile/user_profile.module';
import { UserCoinModule } from './user_coin/user_coin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],      
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        // url: 'postgres://tris_db_user:8cWlQ6VeJ6fBXYuIoV4AuUGEvDB6V81w@dpg-cli2oveg1b2c73aifarg-a.singapore-postgres.render.com/tris_db?ssl=true',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,           
        logging: true
      }),
      inject: [ConfigService],
    }),
    UserCoinModule,
    UserProfileModule
    // CustomersModule, 
  ],
  // controllers: [AppController],
  // providers: [{
  //   provide: ICoin,
  //   useClass: CoingeckoImplementation
  // }]
  // providers: [AppService],
})
export class AppModule { }