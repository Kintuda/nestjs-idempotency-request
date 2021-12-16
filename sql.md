CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE idempotency_keys (
    id uuid not null default uuid_generate_v4() primary key,
    idempotency_key text not null unique,
    request_path varchar(126) not null,
    request_method varchar(10) not null,
    response_status smallint,
    response_body jsonb,
    created_at timestamp not null default now(),
    deleted_at timestamp
);
