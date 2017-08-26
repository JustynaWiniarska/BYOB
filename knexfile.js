module.exports = {

	development: {
		client: 'pg',
		connection: 'postgres://localhost/byob',
		useNullAsDefault: true,
		migrations: {
			directory: './db/migrations',
		},
		seeds: {
			directory: './db/seeds/dev'
		}
	},

	production: {
		client: 'pg',
		connection: process.env.DATABASE_URL + '?ssl=true',
		useNullAsDefault: true,
		migrations: {
			directory: './db/migrations'
		},
    seeds: {
			directory: './db/seeds/prod'
		}
	},

  test: {
    client: 'pg',
    connection: process.env.DATABASE_URL || 'postgres://localhost/byobtest',
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/test'
    }
  }
};
