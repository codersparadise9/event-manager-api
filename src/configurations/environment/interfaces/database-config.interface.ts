/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

/**
 * interface to describe database configuration object
 */

export interface DatabaseConfig {
  host: string | 'localhost';
  port: number;
  username: string;
  password: string;
  databaseName: string;
  synchronize: boolean;
}
