import { NeonQueryFunction } from '@neondatabase/serverless';

export type SQL = NeonQueryFunction<false, false>;
export type QueryHandler<P, T> = (sql: SQL, params: P) => Promise<T[]>;