import { NextFunction, Response, Request } from 'express';
import { ThingsController } from './things.controller.js';
import { ThingsMongoRepo } from '../repository/things.mongo.repo.js';
import { UsersMongoRepo } from '../repository/users.mongo.repo.js';

describe('Given ThingsController', () => {
  const repo: ThingsMongoRepo = {
    create: jest.fn(),
    query: jest.fn(),
    queryId: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
    search: jest.fn(),
  };

  const userRepo = {} as UsersMongoRepo;

  const req = {
    body: {},
    params: { id: '' },
  } as unknown as Request;
  const resp = {
    json: jest.fn(),
  } as unknown as Response;
  const next = jest.fn() as NextFunction;

  const controller = new ThingsController(repo, userRepo);

  describe('Given getAll func', () => {
    test('Then, if no error , objectss array will be returned', async () => {
      await controller.getAll(req, resp, next);
      expect(resp.json).toHaveBeenCalled();
    });
    test('Then, next should be called ', async () => {
      (repo.query as jest.Mock).mockRejectedValue(new Error());
      await controller.getAll(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });
  describe('Given get func', () => {
    test('Then wiht no error, we should get an object', async () => {
      await controller.get(req, resp, next);
      expect(resp.json).toHaveBeenCalled();
    });
    test('Then with no errors, next should be called', async () => {
      (repo.query as jest.Mock).mockRejectedValue(new Error());
      await controller.get(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });
  describe('patch', () => {
    test('Then with no errors, one object should be updated', async () => {
      await controller.patch(req, resp, next);
      expect(resp.json).toHaveBeenCalled();
    });
    test('Then with no error, next should be called', async () => {
      (repo.query as jest.Mock).mockRejectedValue(new Error());
      await controller.patch(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });
  describe('post', () => {
    test('Then, with no error a new object should be created', async () => {
      await controller.post(req, resp, next);
      expect(resp.json).toHaveBeenCalled();
    });
    test('Then with no error next funct should be called', async () => {
      (repo.query as jest.Mock).mockRejectedValue(new Error());
      await controller.post(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });
  describe('delete', () => {
    test('Then, an object should be erased if its a valid ID', async () => {
      await controller.delete(req, resp, next);
      expect(resp.json).toHaveBeenCalled();
    });
    test('Then next should be called', async () => {
      (repo.query as jest.Mock).mockRejectedValue(new Error());
      await controller.delete(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });
});
