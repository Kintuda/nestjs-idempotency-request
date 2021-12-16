import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MikroORMConfig } from "./config/mikroORM.config";
import { IdempotencyModule } from "./idempotency/idempotency.module";

@Module({
  imports: [
    IdempotencyModule,
    ConfigModule.forRoot(),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        new MikroORMConfig(configService).createMikroOrmOptions(),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
