exports.up = knex => {
    return knex.schema.createTable('images', table => {
        table
            .increments('id')
            .unsigned()
            .primary()
            .unique();

        table.string('name').notNullable();
        table.string('path').notNullable();
        table.string('refId');

        table.integer('product_id');
        table
            .foreign('product_id')
            .references('productId')
            .inTable('products')
            .onUpdate('CASCADE')
            .onDelete('SET NULL');

        table.integer('variation_id');
        table
            .foreign('variation_id')
            .references('variationId')
            .inTable('variations')
            .onUpdate('CASCADE')
            .onDelete('SET NULL');

        table.integer('brand_id');
        table
            .foreign('brand_id')
            .references('brandId')
            .inTable('brands')
            .onUpdate('CASCADE')
            .onDelete('SET NULL');

        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = knex => {
    knex.schema.dropTable('images');
};
