import Knex from 'knex';

export async function seed(knex: Knex) {
  await knex('items').insert([
    { title: 'Lâmpadas', price: 7.5 },
    { title: 'Pilhas e Baterias', price: 20.0 },
    { title: 'Papeis e Papelão', price: 2.5 },
    { title: 'Eletronicos', price: 10000.0 },
    { title: 'Resíduos Orgânicos', price: 5.0 },
    { title: 'Óleo de Cozinha', price: 12.0 },
  ]);
}
