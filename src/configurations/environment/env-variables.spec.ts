/**
 Free and Open Source - GNU LGPLv3
 Copyright © 2024
 @Author anup.tiwari787@gmail.com
 */

import { Test, TestingModule } from '@nestjs/testing';
import { EnvConfigService } from './env-config.service';
import * as process from 'process';
import { EnvConfigModule } from './env.module';

describe('EnvConfigService', () => {
  let module: TestingModule;
  let envConfigService: EnvConfigService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [EnvConfigModule],
    }).compile();
    envConfigService = module.get<EnvConfigService>(EnvConfigService);
  });
  it('should be defined', async () => {
    expect(module).toBeDefined();
    expect(envConfigService).toBeDefined();
  });

  describe('DATABASE Configurations', () => {
    it('should be defined', () => {
      expect(envConfigService.DatabaseConfig).toBeDefined();
    });

    it('should return Database name', async () => {
      expect(envConfigService.DatabaseConfig.databaseName).toBeDefined();
      expect(envConfigService.DatabaseConfig.databaseName).toBe(process.env.DATABASE_NAME);
    });

    it('should return Database username', async () => {
      expect(envConfigService.DatabaseConfig.username).toBeDefined();
      expect(envConfigService.DatabaseConfig.username).toBe(process.env.DATABASE_USERNAME);
    });

    it('should return Database password', async () => {
      expect(envConfigService.DatabaseConfig.databaseName).toBeDefined();
      expect(envConfigService.DatabaseConfig.password).toBe(process.env.DATABASE_PASSWORD);
    });

    it('should return Database host', async () => {
      expect(envConfigService.DatabaseConfig.host).toBeDefined();
      expect(envConfigService.DatabaseConfig.host).toBe(process.env.DATABASE_HOST);
    });

    it('should return Database synchronize', async () => {
      expect(envConfigService.DatabaseConfig.synchronize).toBeDefined();
      expect(envConfigService.DatabaseConfig.synchronize).toEqual(Boolean(process.env.DATABASE_SYNCHRONIZE));
    });

    it('should return Database port', async () => {
      expect(envConfigService.DatabaseConfig.port).toBeDefined();
      expect(envConfigService.DatabaseConfig.port).toEqual(Number(process.env.DATABASE_PORT));
    });
  });

  describe('AUTH Configurations', () => {
    it('should be defined', () => {
      expect(envConfigService.AuthConfig).toBeDefined();
    });
    it('should return JWT key', () => {
      expect(envConfigService.AuthConfig.jwtAccessSecret).toBeDefined();
      expect(envConfigService.AuthConfig.jwtAccessSecret).toBe(process.env.JWT_KEY);
    });

    it('should return JWT secret', () => {
      expect(envConfigService.AuthConfig.jwtRefreshSecret).toBeDefined();
      expect(envConfigService.AuthConfig.jwtRefreshSecret).toBe(process.env.JWT_SECRET);
    });

    it('should return Google Client ID', () => {
      expect(envConfigService.AuthConfig.googleOAuth2.clientID).toBeDefined();
      expect(envConfigService.AuthConfig.googleOAuth2.clientID).toBe(process.env.GOOGLE_CLIENT_ID);
    });

    it('should return JWT key', () => {
      expect(envConfigService.AuthConfig.googleOAuth2.clientSecret).toBeDefined();
      expect(envConfigService.AuthConfig.googleOAuth2.clientSecret).toBe(process.env.GOOGLE_CLIENT_SECRET);
    });

    it('should return JWT key', () => {
      expect(envConfigService.AuthConfig.googleOAuth2.callbackURI).toBeDefined();
      expect(envConfigService.AuthConfig.googleOAuth2.callbackURI).toBe(process.env.GOOGLE_CALLBACK_URI);
    });
  });
});
