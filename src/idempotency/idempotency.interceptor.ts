import {
  CallHandler,
  ExecutionContext,
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { clearConfigCache } from "prettier";
import { map, Observable } from "rxjs";
import { IdempotencyService } from "./idempotency.service";

@Injectable()
export class IdempotencyInterceptor implements NestInterceptor {
  constructor(private readonly idempotencyService: IdempotencyService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Promise<Observable<any>> {
    const httpData = context.switchToHttp();
    const req = httpData.getRequest();

    console.log(req.headers);
    const idempotencyKey =
      req.headers["X-idempotency-Key"] || req.headers["x-idempotency-key"];
    const path = req.originalUrl;
    const method = req.method;

    if (!idempotencyKey) {
      throw new HttpException(
        { error: "request is missing idempotency key" },
        HttpStatus.BAD_REQUEST
      );
    }

    const idempotency = await this.idempotencyService.createKey({
      key: idempotencyKey,
      method,
      path,
    });

    return next.handle().pipe(
      map(async (data) => {
        await this.idempotencyService.updateResponse(idempotency, {responseBody: data, responseStatus: 201 });
        return data;
      })
    );
  }
}
