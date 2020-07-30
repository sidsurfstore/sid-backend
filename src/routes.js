import { Router } from 'express';
import multer from 'multer';
import authMiddleware from './app/middlewares/auth';

import multerConfig from './config/multer';

import UsersController from './app/controllers/users/UsersController';
import SessionController from './app/controllers/users/SessionController';
import AvatarController from './app/controllers/users/AvatarController';
import RecoveryController from './app/controllers/users/RecoveryController';
import RecoveredController from './app/controllers/users/RecoveredController';
import StoresController from './app/controllers/stores/StoresController'

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/recovery', RecoveryController.showRecovery);
routes.post('/recovery', RecoveryController.createRecovery);
routes.get('/recovered', RecoveredController.showCompleteRecovery);
routes.post('/recovered', RecoveredController.completeRecovery);

routes.post('/users', UsersController.store);
routes.get('/users', UsersController.getAll);
routes.get('/users/:id', authMiddleware, UsersController.getOne);
routes.put('/users/:id', authMiddleware, UsersController.update);
routes.delete('/users/:id', authMiddleware, UsersController.delete);

routes.post('/session', SessionController.create);

routes.post(
    '/avatar',
    upload.single('file'),
    authMiddleware,
    AvatarController.store
);
routes.get('/avatar', AvatarController.getAll);
routes.get('/avatar/:id', authMiddleware, AvatarController.getOne);
routes.delete('/avatar/:id', authMiddleware, AvatarController.delete);

routes.post('/stores', StoresController.store);
routes.get('/stores', StoresController.getAll);
routes.get('/stores/:id', StoresController.getOne);
routes.put('/stores/:id', StoresController.update);
routes.delete('/stores/:id', StoresController.delete);

export default routes;
