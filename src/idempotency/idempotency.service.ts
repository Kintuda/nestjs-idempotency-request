import { EntityRepository } from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";
import { Idempotency } from "./idempotency.models";
import { IdempotencyRepository } from "./idempotency.repository";

export interface IdempotencyInitAttributes {
  path: string;
  method: string;
  key: string;
}

export interface IdempotencyResponse {
  responseStatus: number;
  responseBody: Record<string, unknown>;
}

@Injectable()
export class IdempotencyService {
  constructor(private readonly idempotency: IdempotencyRepository) {}

  public async createKey(data: IdempotencyInitAttributes) {
    const idempotencyEntity = new Idempotency(data.key, data.path, data.method);
    await this.idempotency.persistAndFlush(idempotencyEntity);

    return idempotencyEntity;
  }

  public async updateResponse(entity: Idempotency, data: IdempotencyResponse) {
    const idempotency = this.idempotency.assign(entity, data);
    await this.idempotency.persistAndFlush(idempotency);

    return idempotency;
  }
}
