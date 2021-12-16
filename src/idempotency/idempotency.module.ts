import { MikroORM } from "@mikro-orm/core";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { IdempotencyInterceptor } from "./idempotency.interceptor";
import { Idempotency } from "./idempotency.models";
import { IdempotencyRepository } from "./idempotency.repository";
import { IdempotencyService } from "./idempotency.service";

@Module({
  providers: [IdempotencyService, IdempotencyInterceptor],
  imports: [MikroOrmModule.forFeature({ entities: [Idempotency] })],
  exports: [IdempotencyService, IdempotencyInterceptor],
})
export class IdempotencyModule {}
