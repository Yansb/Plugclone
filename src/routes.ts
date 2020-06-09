import express from 'express';
import OrdersCotroller from './controllers/OrdersController';

const routes = express.Router();
const ordersController = new OrdersCotroller();

routes.post('/orders', ordersController.create);
routes.get('/orders/:id', ordersController.show);
routes.get('/orders', ordersController.index);
routes.put('/orders', ordersController.update);

export default routes;
