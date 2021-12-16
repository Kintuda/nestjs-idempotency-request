import { Controller, Get, UseInterceptors } from "@nestjs/common";
import { AppService } from "./app.service";
import { IdempotencyInterceptor } from "./idempotency/idempotency.interceptor";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseInterceptors(IdempotencyInterceptor)
  getHello() {
    return { ok: true };
  }
}
