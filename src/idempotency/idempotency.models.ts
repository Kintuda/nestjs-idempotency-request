import { Entity, Property } from "@mikro-orm/core";

@Entity({ tableName: "idempotency_keys" })
export class Idempotency {
  @Property({
    columnType: "uuid",
    defaultRaw: "uuid_generate_v4()",
    primary: true,
  })
  id!: string;

  @Property({ columnType: "text", nullable: false, unique: true })
  idempotencyKey!: string;

  @Property({ columnType: "varchar(125)", nullable: false })
  requestPath: string;

  @Property({ columnType: "varchar(20)", nullable: false })
  requestMethod: string;

  @Property({ columnType: "int", nullable: true })
  responseStatus: number;

  @Property({ columnType: "jsonb", nullable: true })
  responseBody: Record<string, unknown>;

  @Property({
    columnType: "timestamp",
    nullable: false,
    defaultRaw: "now()",
    onCreate: () => new Date(),
  })
  createdAt: Date;

  @Property({ columnType: "timestamp", nullable: true })
  deletedAt: Date;

  constructor(
    idempotencyKey: string,
    requestPath: string,
    requestMethod: string
  ) {
    this.idempotencyKey = idempotencyKey;
    this.requestPath = requestPath;
    this.requestMethod = requestMethod;
  }

  public isActive(): boolean {
    return !(this.deletedAt && this.deletedAt.getTime() < new Date().getTime());
  }
}
