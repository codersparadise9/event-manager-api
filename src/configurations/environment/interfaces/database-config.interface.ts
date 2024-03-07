/**
 * interface to describe database configuration object
 */
import { DatabaseType } from 'typeorm';

export interface DatabaseConfig {
  type: DatabaseType;
  host: string | 'localhost';
  port: number;
  username: string;
  password: string;
  database: string;
  entities: any[];
  synchronize: boolean;
}
