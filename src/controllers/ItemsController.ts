import { Request, Response } from 'express';
import Knex from 'knex';

export default class ItemsController {
  async index(request: Request, response: Response) {
    const items = await Knex('items').select('*');

    const serializedItems = items.map(item => {
      return {
        id: item.id,
        title: item.title,
        price: item.price,
      };
    });

    return response.json(serializedItems);
  }
}
