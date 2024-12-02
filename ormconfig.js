module.exports = {
    type: 'sqlite',
    database: 'favorites.sqlite',
    entities: ['src/entities/*.js'],
    synchronize: true,
    logging: true,
  };
  