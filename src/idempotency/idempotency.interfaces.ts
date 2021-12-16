
export type HTTPMethods = 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface IdempotencyAttributes {
    idempotencyKey: string
    path: string
    method: HTTPMethods
}