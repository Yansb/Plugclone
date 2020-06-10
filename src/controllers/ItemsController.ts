import { Request, Response } from 'express';
import knex from '../database/connection';

export default class ItemsController {
  async index(request: Request, response: Response) {
    const items = await knex('items').select('*');

    const serializedItems = items.map(item => {
      return {
        id: item.id,
        title: item.title,
        price: item.price,
      };
    });

    return response.json(serializedItems);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const products = await knex('items').where('id', id).first();

    if (!products) {
      return response.status(400).json({ message: 'Product not found!' });
    }

    return response.json({ products });
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { price, title } = request.body;

    const product = { price, title };

    await knex('items').insert(product);

    return response.json(product);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { price, title } = request.body;

    await knex('items').where('id', id).update({ price, title });

    const updatedOrder = await knex('items')
      .where('id', id)
      .select('*')
      .first();

    return response.json({ updatedOrder });
  }
}
