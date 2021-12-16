import { IDatabaseDriver, Connection } from "@mikro-orm/core";
import {
  MikroOrmModuleOptions,
  MikroOrmOptionsFactory,
} from "@mikro-orm/nestjs";
import { ConfigService } from "@nestjs/config";
import { Idempotency } from "src/idempotency/idempotency.models";

export class MikroORMConfig implements MikroOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createMikroOrmOptions():
    | MikroOrmModuleOptions<IDatabaseDriver<Connection>>
    | Promise<MikroOrmModuleOptions<IDatabaseDriver<Connection>>> {
    return {
      user: this.configService.get<string>("DB_USER", "postgres"),
      password: this.configService.get<string>("DB_PWD", "docker"),
      dbName: this.configService.get<string>("DB_NAME", "testing_db"),
      host: this.configService.get<string>("DB_HOST", "localhost"),
      port: this.configService.get<number>("DB_PORT", 5432),
      type: 'postgresql',
      entities: [Idempotency],
      entitiesTs: [Idempotency],
      debug:
        this.configService.get<string>("NODE_ENV", "development") ===
        "development",
    };
  }
}
