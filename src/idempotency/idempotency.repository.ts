import { Repository } from "@mikro-orm/core";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Idempotency } from "./idempotency.models";

@Repository(Idempotency)
export class IdempotencyRepository extends EntityRepository<Idempotency> {}