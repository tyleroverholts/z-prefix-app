// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const HOST = process.env.DATABASE_HOST || '127.0.0.1';
const USER = process.env.POSTGRES_USER || 'postgres';
const PASSWORD = process.env.POSTGRES_PASSWORD || 'docker';
const DATABASE = process.env.POSTGRES_DB || 'postgres';
const PORT = process.env.PORT || 5432;

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: HOST,
      user: USER,
      password: PASSWORD,
      port: PORT,
      database: DATABASE
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: process.env.DATABASE_URL +'?ssl=no-verify',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
