const connectDB = (knex) => {
  return (
    (process.env.NODE_ENV === 'production') ?
      knex({
        client: 'pg',
        connection: {
          connectionString: process.env.DATABASE_URL,
          ssl: true
        }
      }) :
      knex({
        client: 'pg',
        connection: {
          host: process.env.DEV_DB_URL,
          user: process.env.DEV_DB_USER,
          password: process.env.DEV_DB_PASSWORD,
          database: process.env.DEV_DB_NAME
        }
      })
  );
};

module.exports = { connectDB };