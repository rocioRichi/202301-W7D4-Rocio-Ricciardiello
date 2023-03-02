import { Router } from 'express';
import { ThingsController } from '../controllers/things.controller.js';
import { ThingsMongoRepo } from '../repository/things.mongo.repo.js';
import { logged } from '../interceptors/logged.js';
import { authorized } from '../interceptors/authorized.js';
import { UsersMongoRepo } from '../repository/users.mongo.repo.js';

// eslint-disable-next-line new-cap
export const thingsRouter = Router();
// File Repo previous const repo = new ThingsFileRepo();
const repo = new ThingsMongoRepo();
const repoUsers = new UsersMongoRepo();
const controller = new ThingsController(repo, repoUsers);

thingsRouter.get('/', logged, controller.getAll.bind(controller));
thingsRouter.get('/:id', logged, controller.get.bind(controller));
thingsRouter.post('/', logged, controller.post.bind(controller));
thingsRouter.patch(
  '/:id',
  logged,
  authorized,
  controller.patch.bind(controller)
);
thingsRouter.delete(
  '/:id',
  logged,
  authorized,
  controller.delete.bind(controller)
);
