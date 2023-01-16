import { INestApplication } from '@nestjs/common';
import { Server } from 'http';
import { Test } from '@nestjs/testing';
import { AsyncExistingModule } from '../src/async-existing.module';
import * as request from 'supertest';

describe('Test async useExisting configuration', () => {
  let app: INestApplication;
  let server: Server;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AsyncExistingModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.enableShutdownHooks();
    server = app.getHttpServer();

    await app.init();
  });

  it('should create student', () => {
    return request(server)
      .post('/students')
      .expect(201)
      .expect({ name: 'Michał' });
  });

  it('should get student', () => {
    return request(server)
      .get('/students')
      .expect(200)
      .expect({ name: 'Michał' });
  });

  it('should delete all students', () => {
    return request(server).delete('/students').expect({ success: true });
  });

  afterAll(async () => {
    await app.close();
  });
});
