exports.up = knex => {
    return knex.schema.createTable('users', table => {
        table
            .increments('id')
            .unsigned()
            .primary()
            .unique();

        table.string('name', 50).notNullable();

        table
            .string('email', 30)
            .notNullable()
            .unique();

        table.string('password').notNullable();
        
        table.specificType('permission', 'text[]').defaultTo('{client}');

        table.string('recoveryToken');

        table.specificType('recoveryExpireToken', 'date');

        table.integer('store_id')
        table
            .foreign('store_id')
            .references('id')
            .inTable('stores')
            .onUpdate('CASCADE')
            .onDelete('SET NULL');

        table.integer('avatar_id');
        table
            .foreign('avatar_id')
            .references('id')
            .inTable('avatars')
            .onUpdate('CASCADE')
            .onDelete('SET NULL');

        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = knex => {
    knex.schema.dropTable('users');
};