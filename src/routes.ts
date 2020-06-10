import express from 'express';
import OrdersCotroller from './controllers/OrdersController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();
const ordersController = new OrdersCotroller();
const itemsController = new ItemsController();

routes.post('/orders', ordersController.create);
routes.get('/orders/:id', ordersController.show);
routes.get('/orders', ordersController.index);
routes.put('/orders', ordersController.update);

routes.get('/products/:id', itemsController.show);
routes.get('/products', itemsController.index);
routes.post('/products', itemsController.create);
routes.put('/products/:id', itemsController.update);

export default routes;
