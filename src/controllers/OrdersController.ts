import { Request, Response } from 'express';
import knex from '../database/connection';

export default class OrdersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, zipCode, street, city, uf, items } = request.body;

    const trx = await knex.transaction();

    const order = {
      name,
      email,
      zipCode,
      street,
      city,
      uf,
    };

    const inserted_ids = await trx('orders').insert(order);

    const order_id = inserted_ids[0];

    const pointItems = items
      .split(',')
      .map((item: string) => Number(item.trim()))
      .map((item_id: number) => {
        return {
          item_id,
          order_id,
        };
      });

    await trx('orders_items').insert(pointItems);

    await trx.commit();

    return response.json({ id: order_id, ...order });
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const order = await knex('orders').where('id', id).first();

    if (!order) {
      return response.status(400).json({ message: 'Point not found!' });
    }

    const items = await knex('items')
      .join('orders_items', 'items.id', '=', 'orders_items.item_id')
      .where('orders_items.order_id', id)
      .select('*');

    return response.json({ order, items });
  }

  async index(request: Request, response: Response): Promise<Response> {
    const orders = await knex('orders')
      .join('orders_items', 'orders.id', '=', 'orders_items.item_id')
      .distinct()
      .select('orders.*');

    return response.json(orders);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id, name, email, zipCode, street, city, uf } = request.body;
    await knex('orders')
      .where('id', id)
      .update({ name, email, zipCode, street, city, uf });

    const updatedOrder = await knex('orders')
      .where('id', id)
      .select('*')
      .first();

    return response.json(updatedOrder);
  }
}
